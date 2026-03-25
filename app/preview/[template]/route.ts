import { NextRequest } from "next/server";
import { PREVIEW_SITE } from "@/lib/preview-data";
import { TemplateType } from "@/lib/types";
import { renderPage } from "@/lib/html-renderer";
import { notFoundResponse } from "@/lib/not-found";

const validTemplates: TemplateType[] = ["starter"];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ template: string }> }
) {
  const { template } = await params;

  if (!validTemplates.includes(template as TemplateType)) {
    return notFoundResponse();
  }

  const site = { ...PREVIEW_SITE, template: template as TemplateType };
  const html = renderPage(site, "home", `/preview/${template}`);

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
