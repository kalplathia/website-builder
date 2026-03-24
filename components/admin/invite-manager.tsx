"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InviteData } from "@/lib/types";
import { HugeiconsIcon } from "@hugeicons/react";
import { AddIcon, CopyIcon, TickIcon, DeleteIcon, LinkSquareIcon, MailIcon, CheckmarkBadgeIcon } from "@hugeicons/core-free-icons";

export function InviteManager() {
  const [invites, setInvites] = useState<InviteData[]>([]);
  const [open, setOpen] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [creating, setCreating] = useState(false);
  const [copiedPasscode, setCopiedPasscode] = useState<string | null>(null);
  const [newInvite, setNewInvite] = useState<InviteData | null>(null);

  useEffect(() => { fetchInvites(); }, []);

  async function fetchInvites() {
    const res = await fetch("/api/invites");
    if (res.ok) setInvites(await res.json());
  }

  async function handleCreate() {
    if (!clientName || !clientEmail) return;
    setCreating(true);
    try {
      const res = await fetch("/api/invites", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ clientName, clientEmail }) });
      if (res.ok) { const invite = await res.json(); setNewInvite(invite); setClientName(""); setClientEmail(""); fetchInvites(); }
    } finally { setCreating(false); }
  }

  function getLink(passcode: string) {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/submit/${passcode}`;
  }

  async function copyLink(passcode: string) {
    await navigator.clipboard.writeText(getLink(passcode));
    setCopiedPasscode(passcode);
    setTimeout(() => setCopiedPasscode(null), 2000);
  }

  async function handleDelete(passcode: string) {
    if (!confirm("Delete this invite?")) return;
    await fetch(`/api/invites?passcode=${passcode}`, { method: "DELETE" });
    fetchInvites();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-bold font-heading tracking-tight">Client Invites</h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">Create and manage invite links</p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setNewInvite(null); }}>
          <DialogTrigger render={<Button size="sm" />}>
            <HugeiconsIcon icon={AddIcon} size={15} color="currentColor" className="mr-1.5" />
            Create Invite
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{newInvite ? "Invite Created!" : "Create Client Invite"}</DialogTitle>
            </DialogHeader>
            {newInvite ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                    <HugeiconsIcon icon={CheckmarkBadgeIcon} size={20} className="text-emerald-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-emerald-900">Ready for {newInvite.clientName}</p>
                    <p className="text-[11px] text-emerald-700/70">Share the link below</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input readOnly value={getLink(newInvite.passcode)} className="text-[11px] font-mono" />
                  <Button size="sm" variant="outline" onClick={() => copyLink(newInvite.passcode)} className="shrink-0">
                    <HugeiconsIcon icon={copiedPasscode === newInvite.passcode ? TickIcon : CopyIcon} size={14} color="currentColor" />
                  </Button>
                </div>
                <Button className="w-full" onClick={() => { setNewInvite(null); setOpen(false); }}>Done</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div><Label htmlFor="clientName">Client Name</Label><Input id="clientName" placeholder="John Doe" value={clientName} onChange={(e) => setClientName(e.target.value)} className="mt-1.5" /></div>
                <div><Label htmlFor="clientEmail">Client Email</Label><Input id="clientEmail" type="email" placeholder="john@example.com" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="mt-1.5" /></div>
                <Button className="w-full" onClick={handleCreate} disabled={creating || !clientName || !clientEmail}>{creating ? "Creating..." : "Generate Invite Link"}</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {invites.length === 0 ? (
        <div className="text-center py-14 border border-dashed rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
            <HugeiconsIcon icon={MailIcon} size={20} className="text-muted-foreground/40" />
          </div>
          <p className="text-[13px] font-semibold mb-1">No invites yet</p>
          <p className="text-[11px] text-muted-foreground">Create one to get started</p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {invites.map((inv) => (
            <div key={inv.passcode} className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-card hover:bg-accent/30 transition-colors text-[13px] group">
              <div className="w-8 h-8 rounded-lg bg-muted/80 flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={LinkSquareIcon} size={14} className="text-muted-foreground/60" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{inv.clientName}</div>
                <div className="text-[11px] text-muted-foreground truncate">{inv.clientEmail}</div>
              </div>
              <Badge variant="outline" className={inv.used ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] rounded-full" : "bg-amber-50 text-amber-700 border-amber-200 text-[10px] rounded-full"}>
                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${inv.used ? "bg-emerald-400" : "bg-amber-400"}`} />
                {inv.used ? "Used" : "Pending"}
              </Badge>
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {!inv.used && (
                  <Button size="icon-xs" variant="ghost" onClick={() => copyLink(inv.passcode)} title="Copy link">
                    <HugeiconsIcon icon={copiedPasscode === inv.passcode ? TickIcon : CopyIcon} size={14} color="currentColor" />
                  </Button>
                )}
                {inv.used && inv.siteSlug && (
                  <a href={`/admin/${inv.siteSlug}`}>
                    <Button size="icon-xs" variant="ghost" title="View site">
                      <HugeiconsIcon icon={LinkSquareIcon} size={14} color="currentColor" />
                    </Button>
                  </a>
                )}
                <Button size="icon-xs" variant="ghost" onClick={() => handleDelete(inv.passcode)} title="Delete" className="text-muted-foreground hover:text-red-500">
                  <HugeiconsIcon icon={DeleteIcon} size={14} color="currentColor" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
