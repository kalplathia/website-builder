import { SiteData } from "@/lib/types";

// Starter
import { StarterHeader } from "./starter/header";
import { StarterFooter } from "./starter/footer";
import { StarterHome } from "./starter/home";
import { StarterAbout } from "./starter/about";
import { StarterContact } from "./starter/contact";
import { StarterPrivacy } from "./starter/privacy";
import { StarterTerms } from "./starter/terms";

// Bold
import { BoldHeader } from "./bold/header";
import { BoldFooter } from "./bold/footer";
import { BoldHome } from "./bold/home";
import { BoldAbout } from "./bold/about";
import { BoldContact } from "./bold/contact";
import { BoldPrivacy } from "./bold/privacy";
import { BoldTerms } from "./bold/terms";

// Classic
import { ClassicHeader } from "./classic/header";
import { ClassicFooter } from "./classic/footer";
import { ClassicHome } from "./classic/home";
import { ClassicAbout } from "./classic/about";
import { ClassicContact } from "./classic/contact";
import { ClassicPrivacy } from "./classic/privacy";
import { ClassicTerms } from "./classic/terms";

type PageType = "home" | "about" | "contact" | "privacy" | "terms";

const templates = {
  starter: {
    Header: StarterHeader,
    Footer: StarterFooter,
    pages: {
      home: StarterHome,
      about: StarterAbout,
      contact: StarterContact,
      privacy: StarterPrivacy,
      terms: StarterTerms,
    },
  },
  bold: {
    Header: BoldHeader,
    Footer: BoldFooter,
    pages: {
      home: BoldHome,
      about: BoldAbout,
      contact: BoldContact,
      privacy: BoldPrivacy,
      terms: BoldTerms,
    },
  },
  classic: {
    Header: ClassicHeader,
    Footer: ClassicFooter,
    pages: {
      home: ClassicHome,
      about: ClassicAbout,
      contact: ClassicContact,
      privacy: ClassicPrivacy,
      terms: ClassicTerms,
    },
  },
};

export function SiteRenderer({
  site,
  page,
}: {
  site: SiteData;
  page: PageType;
}) {
  const template = templates[site.template] || templates.starter;
  const { Header, Footer } = template;
  const PageComponent = template.pages[page];

  if (!PageComponent) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header site={site} />
      <main className="flex-1">
        <PageComponent site={site} />
      </main>
      <Footer site={site} />
    </div>
  );
}
