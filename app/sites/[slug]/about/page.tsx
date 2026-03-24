import { notFound } from "next/navigation";
import { getSite } from "@/lib/sites";
import { SiteRenderer } from "@/components/templates/renderer";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSite(slug);
  if (!site) return { title: "Not Found" };

  return {
    title: `About | ${site.businessName}`,
    description: `Learn more about ${site.businessName} — our story, mission, and values.`,
    openGraph: {
      title: `About | ${site.businessName}`,
      description: `Learn more about ${site.businessName} — our story, mission, and values.`,
      type: "website",
      url: `${BASE_URL}/sites/${site.slug}/about`,
      siteName: site.businessName,
    },
    alternates: {
      canonical: `${BASE_URL}/sites/${site.slug}/about`,
    },
  };
}

export default async function SiteAboutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await getSite(slug);

  if (!site || site.status !== "live") {
    notFound();
  }

  return <SiteRenderer site={site} page="about" />;
}
