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
    title: `Terms & Conditions | ${site.businessName}`,
    description: `Terms and conditions for ${site.businessName}. Please read before using our services.`,
    openGraph: {
      title: `Terms & Conditions | ${site.businessName}`,
      type: "website",
      url: `${BASE_URL}/sites/${site.slug}/terms`,
      siteName: site.businessName,
    },
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${BASE_URL}/sites/${site.slug}/terms`,
    },
  };
}

export default async function SiteTermsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await getSite(slug);

  if (!site || site.status !== "live") {
    notFound();
  }

  return <SiteRenderer site={site} page="terms" />;
}
