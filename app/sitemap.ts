import { MetadataRoute } from "next";
import { getAllSites } from "@/lib/sites";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sites = await getAllSites();
  const liveSites = sites.filter((s) => s.status === "live");

  const urls: MetadataRoute.Sitemap = [];

  for (const site of liveSites) {
    const lastMod = site.generatedAt || site.createdAt;
    const base = `${BASE_URL}/sites/${site.slug}`;

    urls.push(
      { url: base, lastModified: lastMod, changeFrequency: "weekly", priority: 1.0 },
      { url: `${base}/about`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
      { url: `${base}/contact`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.7 }
    );
  }

  return urls;
}
