"use client";

import Link from "next/link";
import { SiteData } from "@/lib/types";
import { Mail, Phone, MapPin } from "lucide-react";
import { useSiteBasePath } from "@/lib/site-context";
import { ScrollReveal } from "./scroll-reveal";

export function StarterFooter({ site }: { site: SiteData }) {
  const base = useSiteBasePath();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <ScrollReveal className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-white flex items-center justify-center text-sm font-bold">
                {site.businessName[0]}
              </div>
              <span className="font-heading font-bold text-white text-[15px]">{site.businessName}</span>
            </div>
          </ScrollReveal>

          {/* Pages */}
          <ScrollReveal delay={100}>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Pages</h4>
            <ul className="space-y-2.5">
              {[
                { href: base, label: "Home" },
                { href: `${base}/about`, label: "About Us" },
                { href: `${base}/contact`, label: "Contact Us" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal delay={200}>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-start gap-2.5 text-sm hover:text-white transition-colors">
                    <Mail className="w-4 h-4 mt-0.5 shrink-0" />{site.email}
                  </a>
                </li>
              )}
              {site.phone && (
                <li>
                  <a href={`tel:${site.phone}`} className="flex items-start gap-2.5 text-sm hover:text-white transition-colors">
                    <Phone className="w-4 h-4 mt-0.5 shrink-0" />{site.phone}
                  </a>
                </li>
              )}
              {site.address && (
                <li className="flex items-start gap-2.5 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />{site.address}
                </li>
              )}
            </ul>
          </ScrollReveal>

          {/* Legal */}
          <ScrollReveal delay={300}>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {[
                { href: `${base}/privacy`, label: "Privacy Policy" },
                { href: `${base}/terms`, label: "Terms & Conditions" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>&copy; {new Date().getFullYear()} {site.businessName}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
