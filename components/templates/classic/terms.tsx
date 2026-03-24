import { SiteData } from "@/lib/types";

export function ClassicTerms({ site }: { site: SiteData }) {
  const terms = site.pages.terms;
  if (!terms) return null;

  return (
    <div>
      <section className="bg-slate-900 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-0.5 bg-amber-500 mx-auto mb-6" />
          <h1 className="text-4xl font-serif font-bold text-white">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Last updated: {terms.lastUpdated}
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600 prose-a:text-amber-600"
            dangerouslySetInnerHTML={{ __html: terms.content }}
          />
        </div>
      </section>
    </div>
  );
}
