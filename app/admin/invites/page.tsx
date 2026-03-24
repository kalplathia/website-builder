import { InviteManager } from "@/components/admin/invite-manager";

export const dynamic = "force-dynamic";

export default function InvitesPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-bold font-heading tracking-tight text-foreground">
          Invites
        </h1>
        <p className="text-muted-foreground text-[13px] mt-0.5">
          Create and manage client invite links
        </p>
      </div>

      {/* Invite Manager */}
      <div className="bg-card rounded-2xl border p-6">
        <InviteManager />
      </div>
    </div>
  );
}
