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

export function StarterHome({ site }: { site: SiteData }) {
  const home = site.pages.home;
  if (!home) return null;

  return (
    <div>
      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            {home.hero.headline}
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            {home.hero.subheadline}
          </p>
          <div className="mt-8">
            <Link
              href={`/sites/${site.slug}/contact`}
              className="inline-flex h-11 px-8 items-center rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              {home.hero.ctaText}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg mb-4">
                  {iconMap[f.icon] || "\u2726"}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {home.cta.headline}
          </h2>
          <p className="mt-4 text-gray-500">{home.cta.description}</p>
          <div className="mt-6">
            <Link
              href={`/sites/${site.slug}/contact`}
              className="inline-flex h-11 px-8 items-center rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              {home.cta.buttonText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
