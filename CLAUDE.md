<!-- Next.js 16 has breaking changes — APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices. -->

## Project: AI Website Builder

### Quick Reference
- **Next.js 16** — use `proxy.ts` (NOT `middleware.ts`), `cookies()` is async
- **ShadCN v4** — base-ui, NOT radix. Use `render` prop, not `asChild`
- **Icons** — hugeicons (`@hugeicons/react` + `@hugeicons/core-free-icons`) for admin UI
- **Auth** — simple password via `ADMIN_PASSWORD` env var, HMAC-signed cookies in `lib/auth.ts`
- **Fonts** — Plus Jakarta Sans (headings), Inter (body), JetBrains Mono (code)
- **Colors** — Violet Creative theme, white sidebar, OKLCH tokens in `app/globals.css`
- **Storage** — Firebase Firestore (`sites` + `invites` collections) + Firebase Storage (logo uploads)
- **Deployment** — Firebase App Hosting (project: `website-builder-system`)
- **Templates** — Handlebars (`.hbs`) in `templates/starter/`, rendered via `lib/html-renderer.ts`
- **Site rendering** — Route handlers (`route.ts`) return raw HTML, NOT React page components
- **Export** — `app/api/export/route.ts` — ZIP download (5 HTML + logo + robots.txt + sitemap.xml + 404.html) via JSZip
- **SEO** — Per-page meta descriptions (AI-generated), OG tags, Twitter Cards, canonical URLs, JSON-LD in `base.hbs`
- **404** — `lib/not-found.ts` — styled 404 page used by all route handlers

### Key Conventions
- Admin pages use nested layout at `app/admin/layout.tsx` with white collapsible sidebar
- Client-facing pages (`/sites/*`, `/submit/*`) are NOT behind auth
- Template system: 1 template (starter) — Handlebars-based in `templates/starter/`
- Site/preview routes are `route.ts` files returning `new Response(html)`, not `page.tsx`
- All admin components in `components/admin/`, UI primitives in `components/ui/`

### Hugeicons Pattern
```tsx
import { HugeiconsIcon } from '@hugeicons/react'
import { DashboardSquareEditIcon } from '@hugeicons/core-free-icons'
<HugeiconsIcon icon={DashboardSquareEditIcon} size={18} color="currentColor" />
```

### ShadCN Patterns
```tsx
// Dialog — use render prop
<DialogTrigger render={<Button />}>Text</DialogTrigger>

// Select — guard null values
<Select onValueChange={(v) => setState(v ?? "")}>
```

### Template System
```
templates/starter/
  base.hbs              # HTML shell (Tailwind CDN, Google Fonts, scroll-reveal JS)
  partials/header.hbs   # Glassmorphic sticky header + mobile menu
  partials/footer.hbs   # Dark gradient 4-column footer
  partials/hero-decorations.hbs  # SVG blobs, dot grid, section divider
  pages/home.hbs        # Hero + Who We Are + Features + Stats + Testimonials + CTA
  pages/about.hbs       # Hero + Story + Quote + Mission/Values
  pages/contact.hbs     # Hero + Contact Info + Form
  pages/privacy.hbs     # Back link + Title + prose content
  pages/terms.hbs       # Back link + Title + prose content
```

Key rendering functions in `lib/html-renderer.ts`:
- `renderPage(site, page, basePath)` — renders one page as full HTML
- `renderForExport(site)` — renders all pages with relative links for ZIP export

### SEO System
- `SeoMeta` type in `lib/types.ts` — optional `seo?: { metaDescription }` on each page content type
- AI generates per-page `seo.metaDescription` alongside page content
- `PAGE_META_DESCRIPTIONS` in `html-renderer.ts` — fallbacks for sites without SEO fields
- `base.hbs` head: meta description, canonical URL, OG tags, Twitter Cards, JSON-LD (Organization)
- Canonical/og:url omitted in export via Handlebars `{{#if canonicalUrl}}`
- `lib/not-found.ts` exports `notFoundHtml` (string) + `notFoundResponse()` (Response)
