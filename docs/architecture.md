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
    ├── schemas.ts          # Zod schemas for all API inputs + AnalysisResult (V1+V2)
    ├── supabase.ts         # Supabase client (anon + admin)
    ├── stripe.ts           # Stripe client singleton
    ├── openai.ts           # OpenAI client
    ├── sendgrid.ts         # SendGrid email helpers
    ├── admin-auth.ts       # JWT auth for admin CRM
    ├── pdf/                # PDF template components (AbundanceReport.tsx)
    ├── knowledge/          # Modular analysis knowledge base (11 files)
    │   ├── index.ts            # Re-exports everything
    │   ├── calculations.ts     # Life Path, Sun Sign, Chinese Zodiac, Personal Year, Universal Timing
    │   ├── prompt-builder.ts   # buildSystemPrompt() + buildUserPrompt() with selective injection
    │   ├── life-paths.ts       # Life Path 1-9, 11, 22, 33 data
    │   ├── human-design.ts     # HD types, profiles, authorities, centers
    │   ├── zodiac.ts           # 12 Western zodiac signs
    │   ├── chinese-zodiac.ts   # Chinese zodiac animals, 2026 Fire Horse, Wu Xing elements
    │   ├── personal-year.ts    # Personal Year cycles 1-9
    │   ├── temporal.ts         # Day-of-week energy/planetary rulers
    │   ├── plan-templates.ts   # 90-day plan templates per HD type (week-by-week)
    │   └── daily-practices.ts  # Morning ritual, authority checkpoints, evening review
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

## Knowledge Base Architecture
The analysis system uses a modular knowledge base at `src/lib/knowledge/`:
- **Selective injection**: `prompt-builder.ts` injects ONLY the user's specific data (their Life Path, zodiac sign, Chinese zodiac, Personal Year) to stay within token budget
- **Full HD reference**: All HD types/profiles/authorities/centers are always included since the AI estimates the user's type from behavioral data
- **Pre-calculations**: All deterministic values (Life Path, Sun Sign, Chinese Zodiac, Personal Year, Universal Timing) computed server-side before AI call
- **Plan templates**: Week-by-week 90-day plans per HD type guide the AI's action plan generation
- **V1+V2 schema**: `AnalysisResult` has required V1 fields (teaser_insights, full_analysis) + optional V2 fields (executive_summary, synthesis, timing, daily_practices, integration_statement, metadata). V2 fields render conditionally in results page, PDF, and email.

## Important Files
- `src/lib/schemas.ts` — Central schema definitions, including `AnalysisResult` (V1+V2)
- `src/lib/knowledge/prompt-builder.ts` — AI prompt construction with selective knowledge injection
- `src/lib/knowledge/calculations.ts` — All pre-calculation functions
- `src/app/globals.css` — Design tokens (@theme block)
- `src/i18n/messages/bg.json` / `en.json` — All UI text
- `src/components/quiz/screens/ConfirmationScreen.tsx` — Quiz submission + redirect
- `src/app/api/webhook/stripe/route.ts` — Payment processing hub
- `src/app/api/generate-analysis/route.ts` — OpenAI analysis generation (24K tokens)
