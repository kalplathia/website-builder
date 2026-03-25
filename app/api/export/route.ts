import { NextRequest, NextResponse } from "next/server";
import { getSite } from "@/lib/sites";
import { renderForExport } from "@/lib/html-renderer";
import { notFoundHtml } from "@/lib/not-found";
import JSZip from "jszip";

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
      return NextResponse.json({ error: "Site is not live" }, { status: 400 });
    }

    const pages = renderForExport(site);
    const zip = new JSZip();

    for (const [filename, html] of Object.entries(pages)) {
      zip.file(filename, html);
    }

    // robots.txt
    zip.file("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: sitemap.xml\n`);

    // sitemap.xml
    const pageFiles = ["index.html", "about.html", "contact.html", "privacy.html", "terms.html"];
    const sitemapEntries = pageFiles
      .map((f) => `  <url><loc>${f}</loc></url>`)
      .join("\n");
    zip.file(
      "sitemap.xml",
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`
    );

    // 404.html
    zip.file("404.html", notFoundHtml);

    // Include logo if available
    if (site.logo) {
      try {
        const logoRes = await fetch(site.logo);
        if (logoRes.ok) {
          const logoBuffer = await logoRes.arrayBuffer();
          const ext = site.logo.split(".").pop()?.split("?")[0] || "png";
          zip.file(`logo.${ext}`, logoBuffer);
        }
      } catch {
        // Skip logo if fetch fails
      }
    }

    const zipArrayBuffer = await zip.generateAsync({ type: "arraybuffer" });

    return new Response(zipArrayBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${slug}-website.zip"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
