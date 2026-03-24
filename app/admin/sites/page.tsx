import { getAllSites } from "@/lib/sites";
import { SiteCard } from "@/components/admin/site-card";
import { HugeiconsIcon } from "@hugeicons/react";
import { GridViewIcon } from "@hugeicons/core-free-icons";

export const dynamic = "force-dynamic";

export default async function SitesPage() {
  const sites = await getAllSites();

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[22px] font-bold font-heading tracking-tight text-foreground">
            Sites
          </h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">
            Manage your generated websites
          </p>
        </div>
        <span className="text-[11px] text-muted-foreground font-medium px-2.5 py-1 bg-muted rounded-full">
          {sites.length} site{sites.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Sites grid */}
      {sites.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-2xl border border-dashed">
          <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center mx-auto mb-4">
            <HugeiconsIcon icon={GridViewIcon} size={24} className="text-violet-400" />
          </div>
          <h3 className="text-[15px] font-semibold font-heading mb-1.5">No sites yet</h3>
          <p className="text-[13px] text-muted-foreground max-w-xs mx-auto leading-relaxed">
            Create an invite and share the link with your client. Once they submit, their site appears here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sites.map((site) => (
            <SiteCard key={site.slug} site={site} />
          ))}
        </div>
      )}
    </div>
  );
}
