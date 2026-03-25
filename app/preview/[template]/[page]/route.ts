import { NextRequest } from "next/server";
import { PREVIEW_SITE } from "@/lib/preview-data";
import { TemplateType } from "@/lib/types";
import { renderPage, PageType } from "@/lib/html-renderer";
import { notFoundResponse } from "@/lib/not-found";

const validTemplates: TemplateType[] = ["starter", "premium"];
const validPages: PageType[] = ["about", "contact", "privacy", "terms"];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ template: string; page: string }> }
) {
  const { template, page } = await params;

  if (!validTemplates.includes(template as TemplateType)) {
    return notFoundResponse();
  }
  if (!validPages.includes(page as PageType)) {
    return notFoundResponse();
  }

  const site = { ...PREVIEW_SITE, template: template as TemplateType };
  const html = renderPage(site, page as PageType, `/preview/${template}`);

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
