import { NextRequest } from "next/server";
import { getSite } from "@/lib/sites";
import { renderPage } from "@/lib/html-renderer";
import { notFoundResponse } from "@/lib/not-found";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const site = await getSite(slug);

  if (!site || site.status !== "live") {
    return notFoundResponse();
  }

  const html = renderPage(site, "contact", `/sites/${slug}`);
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
