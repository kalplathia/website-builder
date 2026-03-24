import { NextRequest, NextResponse } from "next/server";
import { getSite, saveSite } from "@/lib/sites";
import { generateSiteContent } from "@/lib/ai";
import { TemplateType } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const { slug, template } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const site = await getSite(slug);
    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    // Update status and template
    site.status = "generating";
    if (template) {
      site.template = template as TemplateType;
    }
    await saveSite(site);

    // Generate content with AI
    const pages = await generateSiteContent(site);

    // Save generated content
    site.pages = pages;
    site.status = "live";
    site.generatedAt = new Date().toISOString();
    await saveSite(site);

    return NextResponse.json({
      success: true,
      message: `Website for "${site.businessName}" generated successfully!`,
      url: `/sites/${site.slug}`,
    });
  } catch (error) {
    console.error("Generation error:", error);

    // Try to update status to error
    try {
      const { slug } = await request.clone().json();
      if (slug) {
        const site = await getSite(slug);
        if (site) {
          site.status = "error";
          await saveSite(site);
        }
      }
    } catch {}

    return NextResponse.json(
      { error: "Failed to generate website content. Check your OPENAI_API_KEY." },
      { status: 500 }
    );
  }
}
