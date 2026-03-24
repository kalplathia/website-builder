import Link from "next/link";
import { SiteData } from "@/lib/types";

export function ClassicFooter({ site }: { site: SiteData }) {
  const base = `/sites/${site.slug}`;

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-serif text-xl font-bold text-white mb-3">
              {site.businessName}
            </h3>
            <p className="text-sm text-slate-400 max-w-xs">{site.description}</p>
          </div>

          <div>
            <h4 className="font-serif text-amber-400 font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: base, label: "Home" },
                { href: `${base}/about`, label: "About Us" },
                { href: `${base}/contact`, label: "Contact Us" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-amber-400 font-semibold mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {[
                { href: `${base}/privacy`, label: "Privacy Policy" },
                { href: `${base}/terms`, label: "Terms & Conditions" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {site.businessName}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
