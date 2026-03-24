import { NextRequest } from "next/server";
import { PREVIEW_SITE } from "@/lib/preview-data";
import { TemplateType } from "@/lib/types";
import { renderPage } from "@/lib/html-renderer";

const validTemplates: TemplateType[] = ["starter"];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ template: string }> }
) {
  const { template } = await params;

  if (!validTemplates.includes(template as TemplateType)) {
    return new Response("Not Found", { status: 404 });
  }

  const site = { ...PREVIEW_SITE, template: template as TemplateType };
  const html = renderPage(site, "home", `/preview/${template}`);

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
