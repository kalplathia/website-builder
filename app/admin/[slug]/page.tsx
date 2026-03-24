import { notFound } from "next/navigation";
import Link from "next/link";
import { getSite } from "@/lib/sites";
import { SiteDetail } from "@/components/admin/site-detail";

export const dynamic = "force-dynamic";

export default async function SiteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await getSite(slug);

  if (!site) {
    notFound();
  }

  return (
    <div className="p-6 lg:p-8 max-w-[960px] mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px]">
        <Link
          href="/admin/sites"
          className="text-muted-foreground hover:text-violet-600 transition-colors font-medium"
        >
          Sites
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-foreground font-semibold truncate max-w-[240px]">
          {site.businessName}
        </span>
      </nav>

      <SiteDetail site={site} />
    </div>
  );
}
