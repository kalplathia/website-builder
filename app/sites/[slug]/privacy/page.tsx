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
    title: `Privacy Policy | ${site.businessName}`,
    description: `Privacy policy for ${site.businessName}. Learn how we collect, use, and protect your data.`,
    openGraph: {
      title: `Privacy Policy | ${site.businessName}`,
      type: "website",
      url: `${BASE_URL}/sites/${site.slug}/privacy`,
      siteName: site.businessName,
    },
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${BASE_URL}/sites/${site.slug}/privacy`,
    },
  };
}

export default async function SitePrivacyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await getSite(slug);

  if (!site || site.status !== "live") {
    notFound();
  }

  return <SiteRenderer site={site} page="privacy" />;
}
