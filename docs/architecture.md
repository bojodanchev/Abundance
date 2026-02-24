# Architecture

## Tech Stack
- **Framework**: Next.js 16 (App Router, React 19)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 (inline `@theme` tokens in `globals.css`)
- **Database**: Supabase (PostgreSQL) — project ref `dyyoknmfcbulvliqsjls`
- **AI**: OpenAI (analysis generation)
- **Payments**: Stripe (checkout sessions + webhooks)
- **Email**: SendGrid (welcome + nurture sequences)
- **PDF**: @react-pdf/renderer (server-side PDF generation)
- **i18n**: next-intl (BG default, EN secondary)
- **Animation**: Framer Motion
- **Hosting**: Vercel

## Directory Structure
```
src/
├── app/
│   ├── [locale]/           # i18n pages (bg/en)
│   │   ├── bump-offer/     # €7 post-quiz upsell
│   │   ├── diagnose/       # Quiz flow
│   │   ├── processing/     # AI analysis loading screen
│   │   ├── results/[id]    # Results display
│   │   ├── thank-you/      # Post-purchase
│   │   ├── privacy/        # Legal
│   │   ├── terms/          # Legal
│   │   └── spot-reserved/  # Pre-launch placeholder
│   ├── api/
│   │   ├── webhook/quiz    # Quiz submission intake
│   │   ├── webhook/stripe  # Stripe payment webhook
│   │   ├── create-checkout/        # Full report Stripe session
│   │   ├── create-bump-checkout/   # €7 bump offer Stripe session
│   │   ├── generate-analysis/      # OpenAI analysis generation
│   │   ├── generate-pdf/           # PDF creation
│   │   ├── send-email/             # SendGrid email dispatch
│   │   ├── cron/nurture-emails     # Vercel Cron nurture sequence
│   │   └── admin/                  # CRM admin API
│   └── admin/              # Admin CRM dashboard
├── components/
│   ├── landing/            # Homepage sections
│   ├── layout/             # Shared layout (nav, footer)
│   ├── quiz/               # Quiz flow components
│   ├── results/            # Results page components
│   └── shared/             # Reusable UI primitives
├── i18n/
│   ├── messages/bg.json    # Bulgarian translations
│   ├── messages/en.json    # English translations
│   ├── navigation.ts       # i18n-aware Link, useRouter
│   └── routing.ts          # Locale config (bg default, en)
└── lib/
    ├── schemas.ts          # Zod schemas for all API inputs
    ├── supabase.ts         # Supabase client (anon + admin)
    ├── stripe.ts           # Stripe client singleton
    ├── openai.ts           # OpenAI client
    ├── sendgrid.ts         # SendGrid email helpers
    ├── admin-auth.ts       # JWT auth for admin CRM
    ├── pdf/                # PDF template components
    └── utils.ts            # Shared utilities
```

## Key Patterns & Conventions

### Routing
- All user-facing pages live under `src/app/[locale]/`
- Use `useRouter` from `@/i18n/navigation` (NOT from `next/navigation`)
- Default locale is `bg` (Bulgarian)

### API Routes
- Validate with Zod schemas from `src/lib/schemas.ts` using `.safeParse()`
- Return `{ success: true, ... }` or `{ success: false, error: "..." }`
- Use `getSupabaseAdmin()` for server-side DB access
- Use `getStripe()` for Stripe operations
- Base URL pattern: `process.env.NEXT_PUBLIC_SITE_URL ?? (VERCEL_URL ? https://... : http://localhost:3000)`

### Design Tokens
- Dark theme: `bg-[#0A0A0A]` (surface-dark), `bg-[#141414]` (surface-muted)
- Accent: `#C9A84C` (gold) — used as `text-accent`, `bg-accent`
- Fonts: Plus Jakarta Sans (display), Inter (body), JetBrains Mono (mono)
- Radial gold glow: `bg-radial-gold` utility class
- Border: `border-[#1F1F1F]` or `border-border`

### Component Patterns
- Client components use `"use client"` directive
- Wrap `useSearchParams()` in `<Suspense>` (Next.js requirement)
- Framer Motion for all animations (staggered fade-in, 150ms delays)
- Icons from `lucide-react`

## Important Files
- `src/lib/schemas.ts` — Central schema definitions for all API inputs
- `src/app/globals.css` — Design tokens (@theme block)
- `src/i18n/messages/bg.json` / `en.json` — All UI text
- `src/components/quiz/screens/ConfirmationScreen.tsx` — Quiz submission + redirect
- `src/app/api/webhook/stripe/route.ts` — Payment processing hub
