import { SiteData } from "@/lib/types";

export function ClassicAbout({ site }: { site: SiteData }) {
  const about = site.pages.about;
  if (!about) return null;

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-900 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-0.5 bg-amber-500 mx-auto mb-6" />
          <h1 className="text-4xl font-serif font-bold text-white">
            About {site.businessName}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
            {about.story}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6 bg-stone-50 border-y border-stone-200">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-0.5 bg-amber-500 mx-auto mb-4" />
          <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-4">
            Our Mission
          </h2>
          <p className="text-xl font-serif text-slate-800 leading-relaxed italic">
            &ldquo;{about.mission}&rdquo;
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.values.map((v, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center text-amber-400 font-serif font-bold text-xl mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-serif font-bold text-slate-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-slate-600">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
