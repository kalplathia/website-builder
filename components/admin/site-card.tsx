"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiteData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { SquareArrowUpRightIcon } from "@hugeicons/core-free-icons";

const statusConfig: Record<string, { label: string; dot: string; badge: string }> = {
  pending: { label: "Pending", dot: "bg-amber-400", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  generating: { label: "Generating", dot: "bg-blue-400 animate-pulse", badge: "bg-blue-50 text-blue-700 border-blue-200" },
  live: { label: "Live", dot: "bg-emerald-400", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  error: { label: "Error", dot: "bg-red-400", badge: "bg-red-50 text-red-700 border-red-200" },
};

const templateGradient: Record<string, string> = {
  starter: "from-gray-200 to-gray-300",
};

export function SiteCard({ site }: { site: SiteData }) {
  const status = statusConfig[site.status] || statusConfig.pending;

  return (
    <Link href={`/admin/${site.slug}`} className="group">
      <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-violet-200 rounded-2xl overflow-hidden">
        <div className={cn("h-1.5 bg-gradient-to-r", templateGradient[site.template] || templateGradient.starter)} />
        <CardHeader className="pb-2 pt-5">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-[14px] font-bold font-heading leading-snug line-clamp-1">
              {site.businessName}
            </CardTitle>
            <Badge variant="outline" className={cn("text-[10px] font-semibold shrink-0 border rounded-full px-2", status.badge)}>
              <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5 inline-block", status.dot)} />
              {status.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-5">
          <p className="text-[12.5px] text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {site.description || "No description provided"}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground/70 font-medium capitalize">
              {site.template} template
            </span>
            <div className="flex items-center gap-1 text-violet-500 opacity-0 group-hover:opacity-100 transition-all duration-200 text-[11px] font-medium">
              Manage
              <HugeiconsIcon icon={SquareArrowUpRightIcon} size={12} color="currentColor" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
