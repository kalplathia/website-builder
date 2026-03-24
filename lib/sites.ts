import { db } from "./firebase";
import { SiteData } from "./types";

const sitesCol = db.collection("sites");

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getAllSites(): Promise<SiteData[]> {
  const snapshot = await sitesCol.orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc) => doc.data() as SiteData);
}

export async function getSite(slug: string): Promise<SiteData | null> {
  const doc = await sitesCol.doc(slug).get();
  if (!doc.exists) return null;
  return doc.data() as SiteData;
}

export async function saveSite(site: SiteData): Promise<void> {
  // JSON round-trip strips undefined values (Firestore rejects undefined)
  await sitesCol.doc(site.slug).set(JSON.parse(JSON.stringify(site)));
}

export async function createSiteFromForm(formData: {
  businessName: string;
  description: string;
  industry: string;
  email: string;
  phone: string;
  address: string;
  logo?: string;
  template?: string;
}): Promise<SiteData> {
  const slug = slugify(formData.businessName);

  const site: SiteData = {
    slug,
    businessName: formData.businessName,
    logo: formData.logo || "",
    email: formData.email || "",
    phone: formData.phone || "",
    address: formData.address || "",
    description: formData.description || "",
    industry: formData.industry || "General",
    template: (formData.template as SiteData["template"]) || "starter",
    status: "pending",
    createdAt: new Date().toISOString(),
    pages: {},
  };

  await saveSite(site);
  return site;
}

export async function deleteSite(slug: string): Promise<boolean> {
  const doc = await sitesCol.doc(slug).get();
  if (!doc.exists) return false;
  await sitesCol.doc(slug).delete();
  return true;
}

export { slugify };
