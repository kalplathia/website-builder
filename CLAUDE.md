@AGENTS.md

## Project: AI Website Builder

### Quick Reference
- **Next.js 16** — use `proxy.ts` (NOT `middleware.ts`), `cookies()` is async
- **ShadCN v4** — base-ui, NOT radix. Use `render` prop, not `asChild`
- **Icons** — hugeicons (`@hugeicons/react` + `@hugeicons/core-free-icons`), NOT lucide-react for admin
- **Auth** — simple password via `ADMIN_PASSWORD` env var, HMAC-signed cookies in `lib/auth.ts`
- **Fonts** — Plus Jakarta Sans (headings `--font-heading`), Inter (body `--font-sans`), JetBrains Mono (`--font-mono`)
- **Colors** — Violet Creative theme, white sidebar, OKLCH tokens in `app/globals.css`
- **Storage** — JSON files in `data/sites/` and `data/invites/` (no database)

### Key Conventions
- Admin pages use nested layout at `app/admin/layout.tsx` with white collapsible sidebar
- Client-facing pages (`/sites/*`, `/submit/*`) are NOT behind auth
- `lib/gemini.ts` uses OpenAI (not Gemini) — historical filename
- Template system: 3 templates (starter, bold, classic) × 7 components each in `components/templates/`
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
