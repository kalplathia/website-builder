import crypto from "crypto";
import { db } from "./firebase";
import { InviteData } from "./types";

const invitesCol = db.collection("invites");

function generatePasscode(): string {
  return crypto.randomBytes(4).toString("hex"); // 8-char hex string
}

export async function createInvite(
  clientName: string,
  clientEmail: string
): Promise<InviteData> {
  const invite: InviteData = {
    passcode: generatePasscode(),
    clientName,
    clientEmail,
    used: false,
    usedAt: null,
    siteSlug: null,
    createdAt: new Date().toISOString(),
  };

  await invitesCol.doc(invite.passcode).set(JSON.parse(JSON.stringify(invite)));
  return invite;
}

export async function getInvite(
  passcode: string
): Promise<InviteData | null> {
  const doc = await invitesCol.doc(passcode).get();
  if (!doc.exists) return null;
  return doc.data() as InviteData;
}

export async function markInviteUsed(
  passcode: string,
  siteSlug: string
): Promise<void> {
  const invite = await getInvite(passcode);
  if (!invite) return;

  await invitesCol.doc(passcode).update({
    used: true,
    usedAt: new Date().toISOString(),
    siteSlug,
  });
}

export async function getAllInvites(): Promise<InviteData[]> {
  const snapshot = await invitesCol.orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc) => doc.data() as InviteData);
}

export async function deleteInvite(passcode: string): Promise<boolean> {
  const doc = await invitesCol.doc(passcode).get();
  if (!doc.exists) return false;
  await invitesCol.doc(passcode).delete();
  return true;
}
