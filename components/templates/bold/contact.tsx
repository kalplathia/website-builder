import { SiteData } from "@/lib/types";

export function BoldContact({ site }: { site: SiteData }) {
  const contact = site.pages.contact;
  if (!contact) return null;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-600 to-pink-500 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-white">
            {contact.headline}
          </h1>
          <p className="mt-4 text-white/80 max-w-lg mx-auto">
            {contact.description}
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold hover:from-violet-600 hover:to-pink-600 transition-all shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-8 py-4">
              {site.email && (
                <div>
                  <h3 className="text-sm font-bold text-violet-500 uppercase tracking-wider mb-2">
                    Email
                  </h3>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-gray-700 hover:text-violet-600 text-lg"
                  >
                    {site.email}
                  </a>
                </div>
              )}
              {site.phone && (
                <div>
                  <h3 className="text-sm font-bold text-violet-500 uppercase tracking-wider mb-2">
                    Phone
                  </h3>
                  <a
                    href={`tel:${site.phone}`}
                    className="text-gray-700 hover:text-violet-600 text-lg"
                  >
                    {site.phone}
                  </a>
                </div>
              )}
              {site.address && (
                <div>
                  <h3 className="text-sm font-bold text-violet-500 uppercase tracking-wider mb-2">
                    Address
                  </h3>
                  <p className="text-gray-700 text-lg">{site.address}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
