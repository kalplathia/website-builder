import { SiteData } from "@/lib/types";
import { SiteBasePathProvider } from "@/lib/site-context";
import { ScrollToTop } from "./scroll-to-top";

// Starter
import { StarterHeader } from "./starter/header";
import { StarterFooter } from "./starter/footer";
import { StarterHome } from "./starter/home";
import { StarterAbout } from "./starter/about";
import { StarterContact } from "./starter/contact";
import { StarterPrivacy } from "./starter/privacy";
import { StarterTerms } from "./starter/terms";

type PageType = "home" | "about" | "contact" | "privacy" | "terms";

const template = {
  Header: StarterHeader,
  Footer: StarterFooter,
  pages: {
    home: StarterHome,
    about: StarterAbout,
    contact: StarterContact,
    privacy: StarterPrivacy,
    terms: StarterTerms,
  },
};

export function SiteRenderer({
  site,
  page,
  basePath,
}: {
  site: SiteData;
  page: PageType;
  basePath?: string;
}) {
  const { Header, Footer } = template;
  const PageComponent = template.pages[page];

  if (!PageComponent) return null;

  const resolvedBasePath = basePath || `/sites/${site.slug}`;

  return (
    <SiteBasePathProvider basePath={resolvedBasePath}>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header site={site} />
        <main className="flex-1">
          <PageComponent site={site} />
        </main>
        <Footer site={site} />
      </div>
    </SiteBasePathProvider>
  );
}
