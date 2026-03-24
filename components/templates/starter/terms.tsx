"use client";

import Link from "next/link";
import { SiteData } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import { useSiteBasePath } from "@/lib/site-context";
import { ScrollReveal } from "./scroll-reveal";
import { SectionDivider } from "./svg-decorations";

export function StarterTerms({ site }: { site: SiteData }) {
  const terms = site.pages.terms;
  const base = useSiteBasePath();
  if (!terms) return null;

  return (
    <div>
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href={base} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-gray-950 tracking-tight">Terms &amp; Conditions</h1>
          <p className="mt-3 text-sm text-gray-400">Last updated: {terms.lastUpdated}</p>
        </div>
      </section>
      <SectionDivider />
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="prose prose-lg prose-gray max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900" dangerouslySetInnerHTML={{ __html: terms.content }} />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
