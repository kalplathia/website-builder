import Handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { SiteData } from "./types";

const isDev = process.env.NODE_ENV === "development";

function getTemplateDir(template: string): string {
  return path.join(process.cwd(), "templates", template);
}

// Cache compiled templates keyed by "template/name"
let templateCache: Map<string, HandlebarsTemplateDelegate> | null = null;
let partialsRegisteredFor: string | null = null;

// ── Inline SVG Icons (Lucide-style, 24x24) ──
const SVG_ICONS: Record<string, string> = {
  star: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  zap: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  heart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  globe: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  award: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  target: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  rocket: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  leaf: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  "arrow-right": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  "arrow-left": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  quote: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  "map-pin": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  send: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  "check-circle": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
};

// ── Register Helpers ──
function registerHelpers(forExport: boolean, basePath: string) {
  Handlebars.registerHelper("currentYear", () => new Date().getFullYear());

  Handlebars.registerHelper("featureIcon", (iconName: string) => {
    const svg = SVG_ICONS[iconName] || SVG_ICONS["star"];
    return new Handlebars.SafeString(svg.replace(/width="24"/g, 'width="20"').replace(/height="24"/g, 'height="20"'));
  });

  Handlebars.registerHelper("inlineSvg", (iconName: string, options?: Handlebars.HelperOptions) => {
    const size = options?.hash?.size || "24";
    const className = options?.hash?.class || "";
    const svg = SVG_ICONS[iconName] || "";
    const sized = svg
      .replace(/width="24"/g, `width="${size}"`)
      .replace(/height="24"/g, `height="${size}"`);
    if (className) {
      return new Handlebars.SafeString(sized.replace("<svg ", `<svg class="${className}" `));
    }
    return new Handlebars.SafeString(sized);
  });

  Handlebars.registerHelper("initials", (name: string) => {
    if (!name) return "";
    return name.split(" ").map((w: string) => w[0]).join("").slice(0, 2);
  });

  Handlebars.registerHelper("padIndex", (i: number) => {
    return String(i + 1).padStart(2, "0");
  });

  Handlebars.registerHelper("avatarColor", (i: number) => {
    const colors = [
      "from-violet-500 to-violet-600",
      "from-emerald-500 to-emerald-600",
      "from-amber-500 to-amber-600",
      "from-sky-500 to-sky-600",
    ];
    return colors[i % colors.length];
  });

  Handlebars.registerHelper("testimonialAvatarColor", (i: number) => {
    const colors = [
      "from-emerald-500 to-emerald-600",
      "from-amber-500 to-amber-600",
      "from-sky-500 to-sky-600",
    ];
    return colors[i % colors.length];
  });

  Handlebars.registerHelper("firstChar", (str: string) => {
    return str ? str[0] : "";
  });

  Handlebars.registerHelper("ifEq", function (this: unknown, a: unknown, b: unknown, options: Handlebars.HelperOptions) {
    return a === b ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper("pageLink", (page: string) => {
    if (forExport) {
      if (page === "home") return "./index.html";
      return `./${page}.html`;
    }
    if (page === "home") return basePath;
    return `${basePath}/${page}`;
  });

  Handlebars.registerHelper("gt", (a: number, b: number) => a > b);

  Handlebars.registerHelper("subtract", (a: number, b: number) => a - b);

  Handlebars.registerHelper("math", (a: number, op: string, b: number) => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return a / b;
      case "%": return a % b;
      default: return a;
    }
  });

  Handlebars.registerHelper("json", (context: unknown) => {
    return JSON.stringify(context);
  });

  // Map feature icon names to Material Symbols names (for premium template)
  const materialIconMap: Record<string, string> = {
    star: "star", shield: "shield", zap: "bolt", heart: "favorite",
    check: "check_circle", globe: "public", users: "group", award: "emoji_events",
    clock: "schedule", target: "target", rocket: "rocket_launch", leaf: "eco",
  };
  Handlebars.registerHelper("materialIcon", (iconName: string) => {
    return materialIconMap[iconName] || iconName || "star";
  });
}

// ── Load and compile templates ──
function loadTemplate(filePath: string): HandlebarsTemplateDelegate {
  const source = fs.readFileSync(filePath, "utf-8");
  return Handlebars.compile(source);
}

function registerPartials(template: string) {
  if (partialsRegisteredFor === template && !isDev) return;

  const partialsDir = path.join(getTemplateDir(template), "partials");
  const partialFiles = fs.readdirSync(partialsDir).filter(f => f.endsWith(".hbs"));

  for (const file of partialFiles) {
    const name = path.basename(file, ".hbs");
    const source = fs.readFileSync(path.join(partialsDir, file), "utf-8");
    Handlebars.registerPartial(name, source);
  }

  partialsRegisteredFor = template;
}

function getTemplate(template: string, name: string): HandlebarsTemplateDelegate {
  const cacheKey = `${template}/${name}`;
  if (isDev) {
    return loadTemplate(path.join(getTemplateDir(template), name));
  }

  if (!templateCache) {
    templateCache = new Map();
  }

  if (!templateCache.has(cacheKey)) {
    templateCache.set(cacheKey, loadTemplate(path.join(getTemplateDir(template), name)));
  }

  return templateCache.get(cacheKey)!;
}

// ── Page title helpers ──
const PAGE_TITLES: Record<string, (site: SiteData) => string> = {
  home: (site) => site.businessName,
  about: (site) => `About | ${site.businessName}`,
  contact: (site) => `Contact | ${site.businessName}`,
  privacy: (site) => `Privacy Policy | ${site.businessName}`,
  terms: (site) => `Terms & Conditions | ${site.businessName}`,
};

// ── Fallback meta descriptions (for sites generated before SEO fields existed) ──
const PAGE_META_DESCRIPTIONS: Record<string, (site: SiteData) => string> = {
  home: (site) => site.description,
  about: (site) => `Learn about ${site.businessName} — our story, mission, and values.`,
  contact: (site) => `Get in touch with ${site.businessName}. We'd love to hear from you.`,
  privacy: (site) => `Privacy Policy for ${site.businessName}.`,
  terms: (site) => `Terms and Conditions for ${site.businessName}.`,
};

// ── Public API ──
export type PageType = "home" | "about" | "contact" | "privacy" | "terms";

export function renderPage(site: SiteData, page: PageType, basePath: string): string {
  // Clear and re-register helpers for this render context
  Handlebars.unregisterHelper("currentYear");
  Handlebars.unregisterHelper("featureIcon");
  Handlebars.unregisterHelper("inlineSvg");
  Handlebars.unregisterHelper("initials");
  Handlebars.unregisterHelper("padIndex");
  Handlebars.unregisterHelper("avatarColor");
  Handlebars.unregisterHelper("testimonialAvatarColor");
  Handlebars.unregisterHelper("firstChar");
  Handlebars.unregisterHelper("ifEq");
  Handlebars.unregisterHelper("pageLink");
  Handlebars.unregisterHelper("gt");
  Handlebars.unregisterHelper("subtract");
  Handlebars.unregisterHelper("math");
  Handlebars.unregisterHelper("json");
  Handlebars.unregisterHelper("materialIcon");
  registerHelpers(false, basePath);
  const template = site.template || "starter";
  registerPartials(template);

  const pageTemplate = getTemplate(template, `pages/${page}.hbs`);
  const baseTemplate = getTemplate(template, "base.hbs");

  const pageContent = pageTemplate({ site, pages: site.pages, currentPage: page, basePath });

  const pageMetaDescription =
    site.pages[page]?.seo?.metaDescription ||
    PAGE_META_DESCRIPTIONS[page]?.(site) ||
    site.description;

  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ""}${basePath}${page === "home" ? "" : `/${page}`}`;

  return baseTemplate({
    site,
    pages: site.pages,
    currentPage: page,
    basePath,
    pageTitle: PAGE_TITLES[page]?.(site) || site.businessName,
    pageMetaDescription,
    canonicalUrl,
    content: pageContent,
  });
}

export function renderForExport(site: SiteData): Record<string, string> {
  // Clear and re-register helpers for export context
  Handlebars.unregisterHelper("currentYear");
  Handlebars.unregisterHelper("featureIcon");
  Handlebars.unregisterHelper("inlineSvg");
  Handlebars.unregisterHelper("initials");
  Handlebars.unregisterHelper("padIndex");
  Handlebars.unregisterHelper("avatarColor");
  Handlebars.unregisterHelper("testimonialAvatarColor");
  Handlebars.unregisterHelper("firstChar");
  Handlebars.unregisterHelper("ifEq");
  Handlebars.unregisterHelper("pageLink");
  Handlebars.unregisterHelper("gt");
  Handlebars.unregisterHelper("subtract");
  Handlebars.unregisterHelper("math");
  Handlebars.unregisterHelper("json");
  Handlebars.unregisterHelper("materialIcon");
  registerHelpers(true, ".");
  const template = site.template || "starter";
  registerPartials(template);

  const pages: PageType[] = ["home", "about", "contact", "privacy", "terms"];
  const result: Record<string, string> = {};

  for (const page of pages) {
    const pageTemplate = getTemplate(template, `pages/${page}.hbs`);
    const baseTemplate = getTemplate(template, "base.hbs");

    const pageContent = pageTemplate({ site, pages: site.pages, currentPage: page, basePath: "." });
    const filename = page === "home" ? "index.html" : `${page}.html`;

    const pageMetaDescription =
      site.pages[page]?.seo?.metaDescription ||
      PAGE_META_DESCRIPTIONS[page]?.(site) ||
      site.description;

    result[filename] = baseTemplate({
      site,
      pages: site.pages,
      currentPage: page,
      basePath: ".",
      pageTitle: PAGE_TITLES[page]?.(site) || site.businessName,
      pageMetaDescription,
      canonicalUrl: "",
      content: pageContent,
    });
  }

  return result;
}
