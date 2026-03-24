import { SiteData } from "@/lib/types";

export function ClassicContact({ site }: { site: SiteData }) {
  const contact = site.pages.contact;
  if (!contact) return null;

  return (
    <div>
      <section className="bg-slate-900 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-0.5 bg-amber-500 mx-auto mb-6" />
          <h1 className="text-4xl font-serif font-bold text-white">
            {contact.headline}
          </h1>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto">
            {contact.description}
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-stone-200">
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full rounded border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-11 rounded bg-amber-500 text-slate-900 text-sm font-bold hover:bg-amber-400 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-8 py-4">
              {site.email && (
                <div>
                  <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">
                    Email
                  </h3>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-slate-700 hover:text-amber-600 text-lg"
                  >
                    {site.email}
                  </a>
                </div>
              )}
              {site.phone && (
                <div>
                  <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">
                    Phone
                  </h3>
                  <a
                    href={`tel:${site.phone}`}
                    className="text-slate-700 hover:text-amber-600 text-lg"
                  >
                    {site.phone}
                  </a>
                </div>
              )}
              {site.address && (
                <div>
                  <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">
                    Address
                  </h3>
                  <p className="text-slate-700 text-lg">{site.address}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
