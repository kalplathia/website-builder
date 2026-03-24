import { SiteData } from "@/lib/types";

export function BoldPrivacy({ site }: { site: SiteData }) {
  const privacy = site.pages.privacy;
  if (!privacy) return null;

  return (
    <div>
      <section className="bg-gradient-to-br from-violet-600 to-pink-500 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-white/70 mt-2">
            Last updated: {privacy.lastUpdated}
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-extrabold prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-violet-600"
            dangerouslySetInnerHTML={{ __html: privacy.content }}
          />
        </div>
      </section>
    </div>
  );
}
