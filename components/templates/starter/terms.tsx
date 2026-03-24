import { SiteData } from "@/lib/types";

export function StarterTerms({ site }: { site: SiteData }) {
  const terms = site.pages.terms;
  if (!terms) return null;

  return (
    <div>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight text-center mb-2">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-gray-400 text-center mb-12">
            Last updated: {terms.lastUpdated}
          </p>
          <div
            className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-gray-900"
            dangerouslySetInnerHTML={{ __html: terms.content }}
          />
        </div>
      </section>
    </div>
  );
}
