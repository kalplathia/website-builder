import { getAllSites } from "@/lib/sites";
import { getAllInvites } from "@/lib/invites";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GridViewIcon,
  ZapIcon,
  Clock01Icon,
  MailIcon,
} from "@hugeicons/core-free-icons";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [sites, invites] = await Promise.all([
    getAllSites(),
    getAllInvites(),
  ]);

  const stats = [
    {
      label: "Total Sites",
      value: sites.length,
      icon: GridViewIcon,
      accent: "bg-violet-50 text-violet-600",
      iconBg: "bg-violet-100",
    },
    {
      label: "Live Sites",
      value: sites.filter((s) => s.status === "live").length,
      icon: ZapIcon,
      accent: "bg-emerald-50 text-emerald-600",
      iconBg: "bg-emerald-100",
    },
    {
      label: "Pending",
      value: sites.filter((s) => s.status === "pending").length,
      icon: Clock01Icon,
      accent: "bg-amber-50 text-amber-600",
      iconBg: "bg-amber-100",
    },
    {
      label: "Active Invites",
      value: invites.filter((i) => !i.used).length,
      icon: MailIcon,
      accent: "bg-pink-50 text-pink-600",
      iconBg: "bg-pink-100",
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[22px] font-bold font-heading tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">
            Overview of your websites and client invites
          </p>
        </div>
        <div className="text-[11px] text-muted-foreground/60 font-medium">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border bg-card p-5 hover:shadow-sm transition-shadow"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mb-4`}>
              <HugeiconsIcon icon={stat.icon} size={20} className={stat.accent.split(" ")[1]} />
            </div>
            <div className="text-[28px] font-bold font-heading leading-none tracking-tight">
              {stat.value}
            </div>
            <div className="text-[12px] text-muted-foreground mt-1.5 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
