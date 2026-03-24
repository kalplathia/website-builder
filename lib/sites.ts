import fs from "fs/promises";
import path from "path";
import { SiteData } from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "sites");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getAllSites(): Promise<SiteData[]> {
  await ensureDir();
  const files = await fs.readdir(DATA_DIR);
  const jsonFiles = files.filter((f) => f.endsWith(".json"));

  const sites = await Promise.all(
    jsonFiles.map(async (file) => {
      const content = await fs.readFile(path.join(DATA_DIR, file), "utf-8");
      return JSON.parse(content) as SiteData;
    })
  );

  return sites.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getSite(slug: string): Promise<SiteData | null> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, `${slug}.json`);
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as SiteData;
  } catch {
    return null;
  }
}

export async function saveSite(site: SiteData): Promise<void> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, `${site.slug}.json`);
  await fs.writeFile(filePath, JSON.stringify(site, null, 2));
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
  await ensureDir();
  const filePath = path.join(DATA_DIR, `${slug}.json`);
  try {
    await fs.unlink(filePath);
    return true;
  } catch {
    return false;
  }
}

export { slugify };
