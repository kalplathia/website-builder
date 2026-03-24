export interface InviteData {
  passcode: string;
  clientName: string;
  clientEmail: string;
  used: boolean;
  usedAt: string | null;
  siteSlug: string | null;
  createdAt: string;
}

export type TemplateType = "starter";

export type SiteStatus = "pending" | "generating" | "live" | "error";

// --- Home Page ---

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaSecondaryText?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface MiniAbout {
  tagline: string;
  shortDescription: string;
  highlights: string[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface CTAContent {
  headline: string;
  description: string;
  buttonText: string;
}

export interface HomePageContent {
  hero: HeroContent;
  miniAbout?: MiniAbout;
  features: Feature[];
  stats?: StatItem[];
  testimonials?: TestimonialItem[];
  cta: CTAContent;
}

// --- About Page ---

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface AboutPageContent {
  story: string;
  mission: string;
  values: { title: string; description: string }[];
  team?: TeamMember[];
  quote?: { text: string; author: string };
}

// --- Contact Page ---

export interface ContactPageContent {
  headline: string;
  description: string;
  formEnabled: boolean;
}

// --- Privacy / Terms ---

export interface PrivacyPageContent {
  content: string;
  lastUpdated: string;
}

export interface TermsPageContent {
  content: string;
  lastUpdated: string;
}

// --- Site ---

export interface SitePages {
  home?: HomePageContent;
  about?: AboutPageContent;
  contact?: ContactPageContent;
  privacy?: PrivacyPageContent;
  terms?: TermsPageContent;
}

export interface SiteData {
  slug: string;
  businessName: string;
  logo: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  industry: string;
  template: TemplateType;
  status: SiteStatus;
  createdAt: string;
  generatedAt?: string;
  pages: SitePages;
}
