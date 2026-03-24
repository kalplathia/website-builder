# AI Website Builder

An AI-powered website builder platform. Admins create invite passcodes, clients submit business details via a passcode-protected form, and AI generates complete 5-page websites (Home, About, Contact, Privacy, Terms). Sites render as static HTML and can be exported as standalone ZIP files.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: ShadCN v4 + Tailwind CSS v4
- **AI**: OpenAI GPT-4o-mini
- **Templates**: Handlebars (.hbs) + Tailwind CDN
- **Database**: Firebase Firestore
- **File Storage**: Firebase Storage
- **Deployment**: Firebase App Hosting
- **Auth**: HMAC-signed cookie (single admin password)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env.local`:

```env
OPENAI_API_KEY=your-openai-api-key
ADMIN_PASSWORD=your-admin-password
NEXT_PUBLIC_BASE_URL=http://localhost:3000
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

For local dev, set `FIREBASE_SERVICE_ACCOUNT_KEY` to the full JSON string of your Firebase service account key (download from Firebase Console > Project Settings > Service Accounts).

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment (Firebase App Hosting)

Secrets are managed via Google Cloud Secret Manager:

```bash
firebase apphosting:secrets:set OPENAI_API_KEY
firebase apphosting:secrets:set ADMIN_PASSWORD
```

Initialize App Hosting and connect your GitHub repo:

```bash
firebase init apphosting --project website-builder-system
```

Deploy Firestore and Storage rules:

```bash
firebase deploy --only firestore:rules,storage --project website-builder-system
```

## Project Structure

```
app/                    # Next.js routes
  admin/                # Admin dashboard, sites, invites (auth-protected)
  api/                  # API routes (sites, invites, generate, export, upload, auth)
  sites/[slug]/         # Public generated websites (route handlers, raw HTML)
  submit/[passcode]/    # Client submission form
  preview/[template]/   # Template previews (route handlers, raw HTML)
templates/              # Handlebars HTML templates
  starter/
    base.hbs            # HTML document shell (Tailwind CDN, fonts, JS)
    partials/           # Header, footer, hero decorations
    pages/              # Home, about, contact, privacy, terms
components/             # Shared components
  admin/                # Admin UI components
  ui/                   # ShadCN primitives
lib/                    # Utilities
  html-renderer.ts      # Handlebars rendering engine
  firebase.ts           # Firebase Admin SDK init
  sites.ts              # Site CRUD (Firestore)
  invites.ts            # Invite management (Firestore)
  ai.ts                 # OpenAI content generation
  auth.ts               # HMAC cookie authentication
  types.ts              # TypeScript types
  preview-data.ts       # Preview site data (Acme Studio)
```

## Features

- **AI Generation**: GPT-4o-mini generates all page content from business details
- **HTML Templates**: Handlebars-based templates with Tailwind CDN styling
- **ZIP Export**: Download any live site as a standalone static website
- **Invite System**: Passcode-protected client submission forms
- **Admin Dashboard**: Manage sites, invites, generate/regenerate content
- **Preview**: Live preview of templates with sample data at `/preview/starter`
