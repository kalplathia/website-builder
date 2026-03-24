import Link from "next/link";
import { SiteData } from "@/lib/types";

export function StarterFooter({ site }: { site: SiteData }) {
  const base = `/sites/${site.slug}`;

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {site.businessName}
            </h3>
            <p className="text-sm text-gray-500 max-w-xs">
              {site.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm">Pages</h4>
            <ul className="space-y-2">
              {[
                { href: base, label: "Home" },
                { href: `${base}/about`, label: "About Us" },
                { href: `${base}/contact`, label: "Contact Us" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm">Legal</h4>
            <ul className="space-y-2">
              {[
                { href: `${base}/privacy`, label: "Privacy Policy" },
                { href: `${base}/terms`, label: "Terms & Conditions" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} {site.businessName}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
