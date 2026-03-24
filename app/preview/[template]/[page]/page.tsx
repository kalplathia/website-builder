import { notFound } from "next/navigation";
import { SiteRenderer } from "@/components/templates/renderer";
import { PREVIEW_SITE } from "@/lib/preview-data";
import { TemplateType } from "@/lib/types";
import { Metadata } from "next";

const validTemplates: TemplateType[] = ["starter", "bold", "classic"];
const validPages = ["about", "contact", "privacy", "terms"] as const;
type PageType = (typeof validPages)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ template: string; page: string }>;
}): Promise<Metadata> {
  const { template, page } = await params;
  const templateName = template.charAt(0).toUpperCase() + template.slice(1);
  const pageName = page.charAt(0).toUpperCase() + page.slice(1);

  return {
    title: `${pageName} — ${templateName} Template Preview | Website Builder`,
    robots: { index: false, follow: false },
  };
}

export default async function PreviewSubPage({
  params,
}: {
  params: Promise<{ template: string; page: string }>;
}) {
  const { template, page } = await params;

  if (!validTemplates.includes(template as TemplateType)) {
    notFound();
  }
  if (!validPages.includes(page as PageType)) {
    notFound();
  }

  const site = { ...PREVIEW_SITE, template: template as TemplateType };

  return <SiteRenderer site={site} page={page as PageType} basePath={`/preview/${template}`} />;
}
