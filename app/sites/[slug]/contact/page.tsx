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
    title: `Contact | ${site.businessName}`,
    description: `Get in touch with ${site.businessName}. We'd love to hear from you.`,
    openGraph: {
      title: `Contact | ${site.businessName}`,
      description: `Get in touch with ${site.businessName}. We'd love to hear from you.`,
      type: "website",
      url: `${BASE_URL}/sites/${site.slug}/contact`,
      siteName: site.businessName,
    },
    alternates: {
      canonical: `${BASE_URL}/sites/${site.slug}/contact`,
    },
  };
}

export default async function SiteContactPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await getSite(slug);

  if (!site || site.status !== "live") {
    notFound();
  }

  return <SiteRenderer site={site} page="contact" />;
}
