"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SiteData } from "@/lib/types";
import { HugeiconsIcon } from "@hugeicons/react";
import { SparklesIcon, LinkSquareIcon, DeleteIcon, Building03Icon, MailIcon, Call02Icon, Location01Icon, Briefcase01Icon } from "@hugeicons/core-free-icons";

const statusConfig: Record<string, { label: string; dot: string; badge: string }> = {
  pending: { label: "Pending", dot: "bg-amber-400", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  generating: { label: "Generating", dot: "bg-blue-400 animate-pulse", badge: "bg-blue-50 text-blue-700 border-blue-200" },
  live: { label: "Live", dot: "bg-emerald-400", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  error: { label: "Error", dot: "bg-red-400", badge: "bg-red-50 text-red-700 border-red-200" },
};

export function SiteDetail({ site: initialSite }: { site: SiteData }) {
  const [site, setSite] = useState(initialSite);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const status = statusConfig[site.status] || statusConfig.pending;

  async function handleGenerate() {
    setGenerating(true); setMessage("");
    try {
      await fetch("/api/sites", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug: site.slug, template: "starter" }) });
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug: site.slug, template: "starter" }) });
      const data = await res.json();
      if (res.ok) { setMessage(data.message); setSite({ ...site, status: "live", template: "starter" }); router.refresh(); }
      else { setMessage(data.error || "Generation failed"); setSite({ ...site, status: "error" }); }
    } catch { setMessage("Network error. Please try again."); } finally { setGenerating(false); }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${site.businessName}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/sites?slug=${site.slug}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/sites");
  }

  const infoItems = [
    { icon: Briefcase01Icon, label: "Industry", value: site.industry },
    { icon: MailIcon, label: "Email", value: site.email },
    { icon: Call02Icon, label: "Phone", value: site.phone },
    { icon: Location01Icon, label: "Address", value: site.address },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-[22px] font-bold font-heading truncate">{site.businessName}</h1>
            <Badge variant="outline" className={`text-[10px] font-semibold border shrink-0 rounded-full px-2 ${status.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${status.dot}`} />
              {status.label}
            </Badge>
          </div>
          {site.description && <p className="text-[13px] text-muted-foreground line-clamp-2">{site.description}</p>}
        </div>
      </div>

      {/* Business Info */}
      <Card className="rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-[14px] font-bold font-heading flex items-center gap-2">
            <HugeiconsIcon icon={Building03Icon} size={16} className="text-muted-foreground" />
            Business Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {infoItems.map((item) => (
              <div key={item.label} className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/50">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shrink-0 border">
                  <HugeiconsIcon icon={item.icon} size={14} className="text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{item.label}</div>
                  <div className="text-[13px] mt-0.5 truncate font-medium">{item.value || "Not provided"}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="rounded-2xl">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Button onClick={handleGenerate} disabled={generating} size="lg" className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 shadow-lg shadow-violet-500/20 transition-all">
              {generating ? (
                <><svg className="animate-spin w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Generating with AI...</>
              ) : (
                <><HugeiconsIcon icon={SparklesIcon} size={16} color="currentColor" className="mr-2" />{site.status === "live" ? "Regenerate Website" : "Generate Website"}</>
              )}
            </Button>
            {site.status === "live" && (
              <a href={`/sites/${site.slug}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  <HugeiconsIcon icon={LinkSquareIcon} size={16} color="currentColor" className="mr-2" />View Live Site
                </Button>
              </a>
            )}
            <div className="sm:ml-auto">
              <Button variant="ghost" size="sm" onClick={handleDelete} className="text-muted-foreground hover:text-red-600 hover:bg-red-50">
                <HugeiconsIcon icon={DeleteIcon} size={15} color="currentColor" className="mr-1.5" />Delete
              </Button>
            </div>
          </div>
          {message && (
            <>
              <Separator className="my-4" />
              <div className={`flex items-center gap-2 p-3.5 rounded-xl text-[13px] font-medium ${site.status === "live" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                {message}
              </div>
              {site.status === "live" && (
                <a href={`/sites/${site.slug}`} target="_blank" rel="noopener noreferrer" className="text-violet-600 text-[13px] mt-2 inline-flex items-center gap-1.5 hover:underline font-medium">
                  Open website <HugeiconsIcon icon={LinkSquareIcon} size={12} color="currentColor" />
                </a>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
