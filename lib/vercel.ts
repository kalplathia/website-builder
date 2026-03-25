const VERCEL_API = "https://api.vercel.com";

function queryParams(): string {
  const teamId = process.env.VERCEL_TEAM_ID;
  return teamId ? `?teamId=${teamId}` : "";
}

function headers(): HeadersInit {
  return {
    Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    "Content-Type": "application/json",
  };
}

export async function createVercelProject(
  name: string,
  githubRepoFullName: string
): Promise<{ id: string; url: string }> {
  const res = await fetch(`${VERCEL_API}/v10/projects${queryParams()}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      name,
      framework: null,
      buildCommand: "",
      outputDirectory: ".",
      gitRepository: {
        type: "github",
        repo: githubRepoFullName,
      },
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      `Vercel API ${res.status}: ${body.error?.message || res.statusText}`
    );
  }

  const data = await res.json();
  return {
    id: data.id,
    url: `https://${name}.vercel.app`,
  };
}

export async function getVercelProject(
  name: string
): Promise<{ id: string; name: string } | null> {
  const res = await fetch(
    `${VERCEL_API}/v9/projects/${name}${queryParams()}`,
    { headers: headers() }
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      `Vercel API ${res.status}: ${body.error?.message || res.statusText}`
    );
  }

  const data = await res.json();
  return { id: data.id, name: data.name };
}
