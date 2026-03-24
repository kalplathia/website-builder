import { SiteData } from "@/lib/types";

export function StarterContact({ site }: { site: SiteData }) {
  const contact = site.pages.contact;
  if (!contact) return null;

  return (
    <div>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              {contact.headline}
            </h1>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto">
              {contact.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-11 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {site.email && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Email
                  </h3>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    {site.email}
                  </a>
                </div>
              )}
              {site.phone && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Phone
                  </h3>
                  <a
                    href={`tel:${site.phone}`}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    {site.phone}
                  </a>
                </div>
              )}
              {site.address && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Address
                  </h3>
                  <p className="text-gray-700">{site.address}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
