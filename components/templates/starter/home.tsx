"use client";

import Link from "next/link";
import { SiteData } from "@/lib/types";
import { useSiteBasePath } from "@/lib/site-context";
import {
  Star, Shield, Zap, Heart, CheckCircle2, Globe, Users, Award, Clock, Target, Rocket, Leaf,
  ArrowRight, Quote,
} from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { HeroBlob, HeroGrid, SectionDivider } from "./svg-decorations";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  star: Star, shield: Shield, zap: Zap, heart: Heart, check: CheckCircle2, globe: Globe,
  users: Users, award: Award, clock: Clock, target: Target, rocket: Rocket, leaf: Leaf,
};

export function StarterHome({ site }: { site: SiteData }) {
  const home = site.pages.home;
  const base = useSiteBasePath();
  if (!home) return null;

  return (
    <div>
      {/* ── Hero (centered, full viewport) ── */}
      <section className="relative overflow-hidden min-h-[100vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(124,58,237,0.08),transparent)]" />
        <HeroBlob />
        <HeroGrid />
        <div className="relative max-w-3xl mx-auto px-6 text-center w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-gray-950 tracking-[-0.02em] leading-[1.08]">
            {home.hero.headline}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {home.hero.subheadline}
          </p>
          <div className="mt-8">
            <Link
              href={`${base}/contact`}
              className="inline-flex h-12 px-8 items-center rounded-full bg-gray-900 text-white text-sm font-semibold transition-all hover:ring-2 hover:ring-gray-900/10 hover:ring-offset-2"
            >
              {home.hero.ctaText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Who We Are ── */}
      {home.miniAbout && (
        <>
          <SectionDivider />
          <ScrollReveal>
            <section className="py-20 md:py-28 px-6 bg-gray-50/50">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                  <div>
                    <span className="text-xs font-semibold text-violet-600 uppercase tracking-widest">
                      {home.miniAbout.tagline}
                    </span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-heading font-extrabold text-gray-950 tracking-tight">
                      Who We Are
                    </h2>
                    <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                      {home.miniAbout.shortDescription}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {home.miniAbout.highlights.map((h, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium text-gray-700 ${
                          i === 0
                            ? "bg-violet-50 border border-violet-200"
                            : "bg-white border border-gray-200"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
        </>
      )}

      {/* ── Features — Uniform Grid ── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="mb-14">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                What We Offer
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-heading font-extrabold text-gray-950 tracking-tight">
                Services & Expertise
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {home.features.map((f, i) => {
              const Icon = ICON_MAP[f.icon] || Star;
              return (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 h-full">
                    <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center mb-5 group-hover:bg-violet-100 transition-colors">
                      <Icon className="w-5 h-5 text-violet-600" />
                    </div>
                    <h3 className="font-heading font-bold text-gray-900 mb-2">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      {home.stats && home.stats.length > 0 && (
        <section className="py-20 md:py-28 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {home.stats.map((s, i) => (
                <ScrollReveal key={i} delay={i * 120}>
                  <div className="bg-white rounded-2xl p-6 md:p-8 text-center border border-gray-100">
                    <div className="text-4xl sm:text-5xl font-heading font-extrabold text-gray-900 tracking-tight">
                      {s.value}
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-medium">{s.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <SectionDivider />

      {/* ── Testimonials ── */}
      {home.testimonials && home.testimonials.length > 0 && (
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="mb-14">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Testimonials
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl font-heading font-extrabold text-gray-950 tracking-tight">
                  What Our Clients Say
                </h2>
              </div>
            </ScrollReveal>

            {/* Featured testimonial */}
            <ScrollReveal>
              <div className="border-l-4 border-violet-200 pl-6 md:pl-8 mb-10">
                <Quote className="w-8 h-8 text-violet-200 mb-4" />
                <p className="text-xl md:text-2xl font-heading font-medium text-gray-800 leading-relaxed italic">
                  &ldquo;{home.testimonials[0].quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {home.testimonials[0].author.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{home.testimonials[0].author}</div>
                    <div className="text-xs text-gray-500">{home.testimonials[0].role}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Remaining testimonials */}
            {home.testimonials.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {home.testimonials.slice(1).map((t, i) => {
                  const avatarColors = [
                    "from-emerald-500 to-emerald-600",
                    "from-amber-500 to-amber-600",
                    "from-sky-500 to-sky-600",
                  ];
                  return (
                    <ScrollReveal key={i} delay={(i + 1) * 100}>
                      <div className="bg-white rounded-2xl p-7 border border-gray-100 flex flex-col h-full">
                        <p className="text-gray-600 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
                          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                            {t.author.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{t.author}</div>
                            <div className="text-xs text-gray-500">{t.role}</div>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── CTA — Bold Dark Section ── */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <ScrollReveal direction="scale">
          <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-violet-950 rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight max-w-2xl mx-auto">
              {home.cta.headline}
            </h2>
            <p className="mt-5 text-gray-400 leading-relaxed max-w-xl mx-auto text-lg">
              {home.cta.description}
            </p>
            <div className="mt-10">
              <Link
                href={`${base}/contact`}
                className="inline-flex h-13 px-10 items-center rounded-full bg-white text-gray-900 text-sm font-semibold transition-all hover:ring-2 hover:ring-white/20 hover:ring-offset-2 hover:ring-offset-gray-900"
              >
                {home.cta.buttonText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
