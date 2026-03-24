"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SiteData } from "@/lib/types";
import { useSiteBasePath } from "@/lib/site-context";

export function BoldHeader({ site }: { site: SiteData }) {
  const [open, setOpen] = useState(false);
  const base = useSiteBasePath();

  const links = [
    { href: base, label: "Home" },
    { href: `${base}/about`, label: "About" },
    { href: `${base}/contact`, label: "Contact" },
  ];

  return (
    <header className="bg-gradient-to-r from-violet-600 to-pink-500 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={base} className="flex items-center gap-3">
          {site.logo ? (
            <Image
              src={site.logo}
              alt={site.businessName}
              width={32}
              height={32}
              className="rounded"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-white/20 text-white flex items-center justify-center text-sm font-bold backdrop-blur-sm">
              {site.businessName[0]}
            </div>
          )}
          <span className="font-bold text-white">{site.businessName}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/80 hover:text-white transition-colors font-medium"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-white"
          aria-label="Menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-violet-700 px-6 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-white/80 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
