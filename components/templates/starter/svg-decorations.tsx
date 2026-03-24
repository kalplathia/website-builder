"use client";

export function HeroBlob() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block" aria-hidden="true">
      <svg
        className="absolute -top-32 -right-32 w-[700px] h-[700px] animate-blob-float opacity-60"
        viewBox="0 0 700 700"
        fill="none"
      >
        <ellipse
          cx="350"
          cy="300"
          rx="280"
          ry="240"
          fill="rgba(124,58,237,0.05)"
        />
        <ellipse
          cx="320"
          cy="360"
          rx="200"
          ry="180"
          fill="rgba(124,58,237,0.03)"
        />
      </svg>
      <svg
        className="absolute -bottom-40 -left-24 w-[500px] h-[500px] animate-blob-float-reverse opacity-50"
        viewBox="0 0 500 500"
        fill="none"
      >
        <ellipse
          cx="250"
          cy="250"
          rx="220"
          ry="180"
          fill="rgba(124,58,237,0.04)"
        />
      </svg>
    </div>
  );
}

export function HeroGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.3]" aria-hidden="true">
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="hero-dots"
            x="0"
            y="0"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.7" fill="rgba(124,58,237,0.25)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="relative h-px w-full max-w-5xl mx-auto px-6">
      <svg
        className="w-full h-[1px]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 1"
      >
        <line
          x1="0"
          y1="0.5"
          x2="1200"
          y2="0.5"
          stroke="rgba(124,58,237,0.12)"
          strokeWidth="1"
          strokeDasharray="8 6"
          className="animate-dash-flow"
        />
      </svg>
    </div>
  );
}
