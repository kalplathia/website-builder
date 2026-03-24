<!-- Next.js 16 has breaking changes — APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices. -->

## Project: AI Website Builder

### Quick Reference
- **Next.js 16** — use `proxy.ts` (NOT `middleware.ts`), `cookies()` is async
- **ShadCN v4** — base-ui, NOT radix. Use `render` prop, not `asChild`
- **Icons** — hugeicons (`@hugeicons/react` + `@hugeicons/core-free-icons`), NOT lucide-react for admin
- **Auth** — simple password via `ADMIN_PASSWORD` env var, HMAC-signed cookies in `lib/auth.ts`
- **Fonts** — Plus Jakarta Sans (headings `--font-heading`), Inter (body `--font-sans`), JetBrains Mono (`--font-mono`)
- **Colors** — Violet Creative theme, white sidebar, OKLCH tokens in `app/globals.css`
- **Storage** — Firebase Firestore (`sites` + `invites` collections) + Firebase Storage (logo uploads)
- **Deployment** — Firebase App Hosting (project: `website-builder-system`)

### Key Conventions
- Admin pages use nested layout at `app/admin/layout.tsx` with white collapsible sidebar
- Client-facing pages (`/sites/*`, `/submit/*`) are NOT behind auth
- Template system: 1 template (starter) × 7 components in `components/templates/starter/`
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
