"use client";

import { SiteData } from "@/lib/types";
import { Quote } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { HeroGrid, SectionDivider } from "./svg-decorations";

export function StarterAbout({ site }: { site: SiteData }) {
  const about = site.pages.about;
  if (!about) return null;

  return (
    <div>
      {/* ── Page Hero (centered) ── */}
      <section className="relative overflow-hidden py-20 md:py-28 px-6">
        <HeroGrid />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            About Us
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-950 tracking-[-0.02em] leading-[1.08]">
            About {site.businessName}
          </h1>
          {about.mission && (
            <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {about.mission}
            </p>
          )}
        </div>
      </section>

      <SectionDivider />

      {/* ── Our Story (full-width) ── */}
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-4">
              Our Story
            </h2>
            <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
              {about.story}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Pull Quote ── */}
      {about.quote && (
        <>
          <SectionDivider />
          <ScrollReveal direction="left">
            <section className="py-16 md:py-20 px-6">
              <div className="max-w-3xl mx-auto">
                <div className="border-l-4 border-violet-200 pl-6 md:pl-8">
                  <Quote className="w-10 h-10 text-violet-200 mb-4" />
                  <blockquote className="text-2xl md:text-3xl font-heading font-bold text-gray-900 leading-snug tracking-tight">
                    &ldquo;{about.quote.text}&rdquo;
                  </blockquote>
                  <div className="mt-6 text-sm text-gray-500 font-medium">
                    &mdash; {about.quote.author}
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
        </>
      )}

      {/* ── Mission + Core Values (combined) ── */}
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Mission intro */}
          {about.mission && (
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="text-xs font-semibold text-violet-600 uppercase tracking-widest">
                  Our Mission
                </span>
                <p className="mt-4 text-xl md:text-2xl font-heading font-medium text-gray-800 leading-relaxed italic max-w-2xl mx-auto">
                  &ldquo;{about.mission}&rdquo;
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* Values */}
          <ScrollReveal>
            <div className="mb-12">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                What We Stand For
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-heading font-extrabold text-gray-950 tracking-tight">
                Our Core Values
              </h2>
            </div>
          </ScrollReveal>
          <div className="space-y-8">
            {about.values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="flex items-start gap-6">
                  <span className="text-5xl md:text-6xl font-heading font-extrabold text-gray-100 leading-none select-none shrink-0 w-16 md:w-20 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-2 flex-1">
                    <h3 className="font-heading font-bold text-gray-900 text-lg mb-1.5">
                      {v.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
