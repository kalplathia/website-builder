import { notFound } from "next/navigation";
import { SiteRenderer } from "@/components/templates/renderer";
import { PREVIEW_SITE } from "@/lib/preview-data";
import { TemplateType } from "@/lib/types";
import { Metadata } from "next";

const validTemplates: TemplateType[] = ["starter", "bold", "classic"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ template: string }>;
}): Promise<Metadata> {
  const { template } = await params;
  const name = template.charAt(0).toUpperCase() + template.slice(1);

  return {
    title: `${name} Template Preview | Website Builder`,
    robots: { index: false, follow: false },
  };
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ template: string }>;
}) {
  const { template } = await params;

  if (!validTemplates.includes(template as TemplateType)) {
    notFound();
  }

  const site = { ...PREVIEW_SITE, template: template as TemplateType };

  return <SiteRenderer site={site} page="home" basePath={`/preview/${template}`} />;
}
