"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SiteData } from "@/lib/types";
import { useSiteBasePath } from "@/lib/site-context";

export function StarterHeader({ site }: { site: SiteData }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const base = useSiteBasePath();

  const links = [
    { href: base, label: "Home" },
    { href: `${base}/about`, label: "About" },
    { href: `${base}/contact`, label: "Contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === base) return pathname === base;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-xl backdrop-saturate-[1.8] ${
        scrolled
          ? "bg-white/70 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(124,58,237,0.03)] border-b border-gray-200/50"
          : "bg-white/40 border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={base} className="flex items-center gap-2.5 group">
          {site.logo ? (
            <Image src={site.logo} alt={site.businessName} width={32} height={32} className="rounded-lg" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
              {site.businessName[0]}
            </div>
          )}
          <span className="font-heading font-bold text-gray-900 text-[15px]">{site.businessName}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(l.href) ? "text-gray-900 bg-gray-100/70" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="w-px h-5 bg-gray-200 mx-2" />
          <Link
            href={`${base}/contact`}
            className="ml-1 inline-flex h-9 px-5 items-center rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Get in Touch
          </Link>
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors" aria-label="Toggle menu">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-gray-100/50 bg-white/80 backdrop-blur-xl px-6 py-4 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(l.href) ? "text-gray-900 bg-gray-100/70" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>
              {l.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link href={`${base}/contact`} className="block w-full text-center py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
              Get in Touch
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
