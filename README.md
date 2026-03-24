# AI Website Builder

An AI-powered website builder platform. Admins create invite passcodes, clients submit business details via a passcode-protected form, and AI generates complete 5-page websites (Home, About, Contact, Privacy, Terms).

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: ShadCN v4 + Tailwind CSS v4
- **AI**: OpenAI GPT-4o-mini
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
GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
```

### 3. Firebase service account (local dev)

Download from Firebase Console > Project Settings > Service Accounts > "Generate new private key". Save as `service-account.json` in the project root.

### 4. Run development server

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
app/                  # Next.js routes
  admin/              # Admin dashboard, sites, invites (auth-protected)
  api/                # API routes (sites, invites, generate, upload, auth)
  sites/[slug]/       # Public generated websites
  submit/[passcode]/  # Client submission form
  preview/[template]/ # Template previews
components/           # Shared components
  admin/              # Admin UI components
  templates/          # Starter template (7 page components)
  ui/                 # ShadCN primitives
lib/                  # Utilities
  firebase.ts         # Firebase Admin SDK init
  sites.ts            # Site CRUD (Firestore)
  invites.ts          # Invite management (Firestore)
  ai.ts               # OpenAI content generation
  auth.ts             # HMAC cookie authentication
  types.ts            # TypeScript types
```
