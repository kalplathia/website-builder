const GITHUB_API = "https://api.github.com";

function headers(): HeadersInit {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

async function githubFetch(url: string, options?: RequestInit): Promise<Response> {
  const res = await fetch(url, {
    ...options,
    headers: { ...headers(), ...options?.headers },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `GitHub API ${res.status} [${url.replace(GITHUB_API, "")}]: ${text.slice(0, 500)}`
    );
  }
  return res;
}

export async function repoExists(owner: string, repo: string): Promise<boolean> {
  try {
    await githubFetch(`${GITHUB_API}/repos/${owner}/${repo}`);
    return true;
  } catch {
    return false;
  }
}

export async function createRepo(
  name: string,
  description: string
): Promise<{ full_name: string; html_url: string }> {
  const res = await githubFetch(`${GITHUB_API}/user/repos`, {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      auto_init: true,
      private: false,
    }),
  });
  const data = await res.json();
  return { full_name: data.full_name, html_url: data.html_url };
}

export interface FileEntry {
  path: string;
  content: string | Buffer;
}

/**
 * Push multiple files to a repo in a single commit.
 * Uses inline content in tree API for text, blob API only for binary.
 */
export async function pushFiles(
  owner: string,
  repo: string,
  files: FileEntry[],
  commitMessage: string
): Promise<string> {
  const base = `${GITHUB_API}/repos/${owner}/${repo}`;

  // 1. Get current ref
  const refRes = await githubFetch(`${base}/git/ref/heads/main`);
  const refData = await refRes.json();
  const latestCommitSha: string = refData.object.sha;

  // 2. Get the tree from that commit
  const commitRes = await githubFetch(`${base}/git/commits/${latestCommitSha}`);
  const commitData = await commitRes.json();
  const baseTreeSha: string = commitData.tree.sha;

  // 3. Build tree entries — inline content for text, blob for binary
  type TreeEntry =
    | { path: string; mode: string; type: string; content: string }
    | { path: string; mode: string; type: string; sha: string };
  const treeEntries: TreeEntry[] = [];

  for (const file of files) {
    if (Buffer.isBuffer(file.content)) {
      // Binary file — must create blob first
      const blobRes = await githubFetch(`${base}/git/blobs`, {
        method: "POST",
        body: JSON.stringify({
          content: file.content.toString("base64"),
          encoding: "base64",
        }),
      });
      const blobData = await blobRes.json();
      treeEntries.push({
        path: file.path,
        mode: "100644",
        type: "blob",
        sha: blobData.sha,
      });
    } else {
      // Text file — use inline content (no blob needed)
      treeEntries.push({
        path: file.path,
        mode: "100644",
        type: "blob",
        content: file.content,
      });
    }
  }

  // 4. Create new tree
  const treeRes = await githubFetch(`${base}/git/trees`, {
    method: "POST",
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: treeEntries,
    }),
  });
  const treeData = await treeRes.json();

  // 5. Create commit
  const newCommitRes = await githubFetch(`${base}/git/commits`, {
    method: "POST",
    body: JSON.stringify({
      message: commitMessage,
      tree: treeData.sha,
      parents: [latestCommitSha],
    }),
  });
  const newCommitData = await newCommitRes.json();

  // 6. Update ref to point to new commit
  await githubFetch(`${base}/git/refs/heads/main`, {
    method: "PATCH",
    body: JSON.stringify({ sha: newCommitData.sha }),
  });

  return newCommitData.sha;
}
