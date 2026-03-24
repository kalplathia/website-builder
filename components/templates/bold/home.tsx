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

export function BoldHome({ site }: { site: SiteData }) {
  const home = site.pages.home;
  if (!home) return null;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 py-28 md:py-36 px-6 overflow-hidden">
        {/* Geometric accents */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-pink-400/10 rounded-full blur-2xl" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            {home.hero.headline}
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto">
            {home.hero.subheadline}
          </p>
          <div className="mt-8">
            <Link
              href={`/sites/${site.slug}/contact`}
              className="inline-flex h-12 px-8 items-center rounded-full bg-white text-violet-700 text-sm font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              {home.hero.ctaText}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {home.features.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl p-8 bg-gradient-to-br from-violet-50 to-pink-50 border border-violet-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-xl mb-4">
                  {iconMap[f.icon] || "\u2726"}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white">
            {home.cta.headline}
          </h2>
          <p className="mt-4 text-gray-400">{home.cta.description}</p>
          <div className="mt-8">
            <Link
              href={`/sites/${site.slug}/contact`}
              className="inline-flex h-12 px-8 items-center rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white text-sm font-bold hover:from-violet-600 hover:to-pink-600 transition-all shadow-lg"
            >
              {home.cta.buttonText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
