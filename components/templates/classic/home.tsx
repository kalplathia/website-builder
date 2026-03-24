import Link from "next/link";
import { SiteData } from "@/lib/types";

const iconMap: Record<string, string> = {
  star: "\u2605",
  shield: "\u26E8",
  zap: "\u26A1",
  heart: "\u2665",
  check: "\u2713",
  globe: "\u25CE",
};

export function ClassicHome({ site }: { site: SiteData }) {
  const home = site.pages.home;
  if (!home) return null;

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-900 py-28 md:py-36 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
            {home.hero.headline}
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto">
            {home.hero.subheadline}
          </p>
          <div className="mt-8">
            <Link
              href={`/sites/${site.slug}/contact`}
              className="inline-flex h-12 px-8 items-center rounded bg-amber-500 text-slate-900 text-sm font-bold hover:bg-amber-400 transition-colors"
            >
              {home.hero.ctaText}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              What We Offer
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-8 shadow-sm border border-stone-200 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-600 text-xl mx-auto mb-4">
                  {iconMap[f.icon] || "\u2726"}
                </div>
                <h3 className="font-serif font-bold text-slate-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-0.5 bg-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold text-white">
            {home.cta.headline}
          </h2>
          <p className="mt-4 text-slate-400">{home.cta.description}</p>
          <div className="mt-8">
            <Link
              href={`/sites/${site.slug}/contact`}
              className="inline-flex h-12 px-8 items-center rounded bg-amber-500 text-slate-900 text-sm font-bold hover:bg-amber-400 transition-colors"
            >
              {home.cta.buttonText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
