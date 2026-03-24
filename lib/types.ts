export interface InviteData {
  passcode: string;
  clientName: string;
  clientEmail: string;
  used: boolean;
  usedAt: string | null;
  siteSlug: string | null;
  createdAt: string;
}

export type TemplateType = "starter" | "bold" | "classic";

export type SiteStatus = "pending" | "generating" | "live" | "error";

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface CTAContent {
  headline: string;
  description: string;
  buttonText: string;
}

export interface HomePageContent {
  hero: HeroContent;
  features: Feature[];
  cta: CTAContent;
}

export interface AboutPageContent {
  story: string;
  mission: string;
  values: { title: string; description: string }[];
}

export interface ContactPageContent {
  headline: string;
  description: string;
  formEnabled: boolean;
}

export interface PrivacyPageContent {
  content: string;
  lastUpdated: string;
}

export interface TermsPageContent {
  content: string;
  lastUpdated: string;
}

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
