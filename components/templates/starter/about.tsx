import { SiteData } from "@/lib/types";

export function StarterAbout({ site }: { site: SiteData }) {
  const about = site.pages.about;
  if (!about) return null;

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            About {site.businessName}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="prose prose-gray text-gray-600 leading-relaxed whitespace-pre-line">
            {about.story}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6 bg-gray-50/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Our Mission
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed italic">
            &ldquo;{about.mission}&rdquo;
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.values.map((v, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-lg mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
