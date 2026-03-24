"use client";

import Link from "next/link";
import { SiteData } from "@/lib/types";
import { useSiteBasePath } from "@/lib/site-context";

export function BoldFooter({ site }: { site: SiteData }) {
  const base = useSiteBasePath();

  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-3">{site.businessName}</h3>
            <p className="text-sm text-gray-400 max-w-xs">{site.description}</p>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-violet-400 mb-4">
              Navigate
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
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-violet-400 mb-4">
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
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} {site.businessName}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
