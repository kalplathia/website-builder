import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { InviteData } from "./types";

const INVITES_DIR = path.join(process.cwd(), "data", "invites");

async function ensureDir() {
  await fs.mkdir(INVITES_DIR, { recursive: true });
}

function generatePasscode(): string {
  return crypto.randomBytes(4).toString("hex"); // 8-char hex string
}

export async function createInvite(
  clientName: string,
  clientEmail: string
): Promise<InviteData> {
  await ensureDir();

  const invite: InviteData = {
    passcode: generatePasscode(),
    clientName,
    clientEmail,
    used: false,
    usedAt: null,
    siteSlug: null,
    createdAt: new Date().toISOString(),
  };

  await fs.writeFile(
    path.join(INVITES_DIR, `${invite.passcode}.json`),
    JSON.stringify(invite, null, 2)
  );

  return invite;
}

export async function getInvite(
  passcode: string
): Promise<InviteData | null> {
  await ensureDir();
  try {
    const content = await fs.readFile(
      path.join(INVITES_DIR, `${passcode}.json`),
      "utf-8"
    );
    return JSON.parse(content) as InviteData;
  } catch {
    return null;
  }
}

export async function markInviteUsed(
  passcode: string,
  siteSlug: string
): Promise<void> {
  const invite = await getInvite(passcode);
  if (!invite) return;

  invite.used = true;
  invite.usedAt = new Date().toISOString();
  invite.siteSlug = siteSlug;

  await fs.writeFile(
    path.join(INVITES_DIR, `${passcode}.json`),
    JSON.stringify(invite, null, 2)
  );
}

export async function getAllInvites(): Promise<InviteData[]> {
  await ensureDir();
  const files = await fs.readdir(INVITES_DIR);
  const jsonFiles = files.filter((f) => f.endsWith(".json"));

  const invites = await Promise.all(
    jsonFiles.map(async (file) => {
      const content = await fs.readFile(
        path.join(INVITES_DIR, file),
        "utf-8"
      );
      return JSON.parse(content) as InviteData;
    })
  );

  return invites.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function deleteInvite(passcode: string): Promise<boolean> {
  await ensureDir();
  try {
    await fs.unlink(path.join(INVITES_DIR, `${passcode}.json`));
    return true;
  } catch {
    return false;
  }
}
