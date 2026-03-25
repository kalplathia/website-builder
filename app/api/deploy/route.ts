import { NextRequest, NextResponse } from "next/server";
import { getSite, saveSite } from "@/lib/sites";
import { renderForExport } from "@/lib/html-renderer";
import { notFoundHtml } from "@/lib/not-found";
import { repoExists, createRepo, pushFiles, FileEntry } from "@/lib/github";
import { createVercelProject, getVercelProject, triggerVercelDeployment } from "@/lib/vercel";

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const site = await getSite(slug);
    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }
    if (site.status !== "live") {
      return NextResponse.json(
        { error: "Site must be live before deploying" },
        { status: 400 }
      );
    }

    const owner = process.env.GITHUB_OWNER;
    if (!owner) {
      return NextResponse.json(
        { error: "GITHUB_OWNER not configured" },
        { status: 500 }
      );
    }

    // Update deploy status
    site.deployStatus = "deploying";
    site.deployError = undefined;
    await saveSite(site);

    const repoName = site.slug;

    // --- Step 1: Ensure GitHub repo exists ---
    const ghRepoExists = await repoExists(owner, repoName);
    if (!ghRepoExists) {
      await createRepo(repoName, `Website for ${site.businessName}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    site.githubRepo = `${owner}/${repoName}`;

    // --- Step 2: Ensure Vercel project exists (BEFORE push so webhook catches it) ---
    const existingProject = await getVercelProject(repoName);
    if (!existingProject) {
      const vercelResult = await createVercelProject(
        repoName,
        site.githubRepo
      );
      site.vercelProjectId = vercelResult.id;
      site.vercelUrl = vercelResult.url;
    } else if (!site.vercelProjectId) {
      site.vercelProjectId = existingProject.id;
      site.vercelUrl = `https://${repoName}.vercel.app`;
    }

    // --- Step 3: Build all files ---
    const htmlPages = renderForExport(site);
    const files: FileEntry[] = [];

    // HTML pages
    for (const [filename, html] of Object.entries(htmlPages)) {
      files.push({ path: filename, content: html });
    }

    // robots.txt
    files.push({
      path: "robots.txt",
      content: `User-agent: *\nAllow: /\n\nSitemap: sitemap.xml\n`,
    });

    // sitemap.xml — use absolute Vercel URLs
    const sitemapBaseUrl =
      site.vercelUrl || `https://${repoName}.vercel.app`;
    const pageFiles = [
      "index.html",
      "about.html",
      "contact.html",
      "privacy.html",
      "terms.html",
    ];
    const sitemapEntries = pageFiles
      .map((f) => `  <url><loc>${sitemapBaseUrl}/${f}</loc></url>`)
      .join("\n");
    files.push({
      path: "sitemap.xml",
      content: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`,
    });

    // 404.html
    files.push({ path: "404.html", content: notFoundHtml });

    // Logo: skipped for GitHub deploy — HTML already references it via Firebase Storage URL

    // --- Step 4: Push files to GitHub (triggers Vercel deploy via webhook) ---
    const commitMessage = !ghRepoExists
      ? `Initial website deployment for ${site.businessName}`
      : `Update website content — ${new Date().toISOString()}`;

    await pushFiles(owner, repoName, files, commitMessage);

    // --- Step 5: Trigger Vercel deployment explicitly ---
    await triggerVercelDeployment(repoName, site.githubRepo!, "main");

    // --- Step 6: Save deployment info ---
    site.lastDeployedAt = new Date().toISOString();
    site.deployStatus = "deployed";
    await saveSite(site);

    return NextResponse.json({
      success: true,
      githubUrl: `https://github.com/${site.githubRepo}`,
      vercelUrl: site.vercelUrl,
    });
  } catch (error) {
    console.error("Deploy error:", error);

    // Try to save error state
    try {
      const { slug } = await req.clone().json();
      if (slug) {
        const site = await getSite(slug);
        if (site) {
          site.deployStatus = "failed";
          site.deployError =
            error instanceof Error ? error.message : "Unknown deployment error";
          await saveSite(site);
        }
      }
    } catch {
      // Ignore save error
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Deployment failed",
      },
      { status: 500 }
    );
  }
}
