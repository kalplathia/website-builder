import { SiteData } from "@/lib/types";

export function BoldAbout({ site }: { site: SiteData }) {
  const about = site.pages.about;
  if (!about) return null;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-600 to-pink-500 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            About {site.businessName}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
            {about.story}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6 bg-gradient-to-br from-violet-50 to-pink-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-sm font-bold text-violet-500 uppercase tracking-wider mb-4">
            Our Mission
          </h2>
          <p className="text-2xl text-gray-800 leading-relaxed font-medium">
            &ldquo;{about.mission}&rdquo;
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {about.values.map((v, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 bg-gradient-to-br from-violet-50 to-pink-50 border border-violet-100 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
