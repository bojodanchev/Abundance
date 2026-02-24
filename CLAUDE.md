# Project: CODE: ABUNDANCE

AI-powered life diagnostic platform — quiz, analysis, PDF reports, upsells. (Next.js 16, Supabase, Stripe, OpenAI, SendGrid, Tailwind 4)

## Quick Start
```bash
npm install
cp .env.example .env.local  # fill in values
npm run dev                  # localhost:3000
```

## Key Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `supabase db push --workdir .` | Push DB migrations |
| `vercel env ls` | List Vercel env vars |

## Project Structure
```
src/app/[locale]/     # Pages: diagnose, bump-offer, processing, results, thank-you
src/app/api/          # API routes: webhook/quiz, webhook/stripe, create-checkout, generate-*
src/components/       # landing, quiz, results, layout, shared
src/i18n/messages/    # bg.json, en.json — all UI text
src/lib/              # schemas.ts, supabase.ts, stripe.ts, openai.ts, sendgrid.ts
```

## Architecture Pointers
> Deep dive: [docs/architecture.md](docs/architecture.md)

- **i18n**: Default locale is `bg`. Always use `useRouter` from `@/i18n/navigation`, NOT `next/navigation`
- **Schemas**: All API inputs validated via Zod in `src/lib/schemas.ts`
- **Design**: Dark theme (#0A0A0A), gold accent (#C9A84C), Plus Jakarta Sans / Inter / JetBrains Mono
- **Animations**: Framer Motion everywhere. Staggered entrance (150ms delays). Wrap `useSearchParams` in `<Suspense>`
- **API pattern**: `getSupabaseAdmin()` for DB, `getStripe()` for payments, `.safeParse()` for validation

## Environment
> Details: [docs/environment.md](docs/environment.md)

- Supabase ref: `dyyoknmfcbulvliqsjls` (Central EU)
- Vercel project: `code-abundance`
- Missing from Vercel: Stripe keys, SendGrid keys, NEXT_PUBLIC_SITE_URL

## Rules & Style
- Bulgarian is primary language — all hardcoded UI text should have i18n keys
- Gold CTA buttons: `bg-accent text-[#0A0A0A]` (black text on gold)
- Full-screen overlay pages (processing, bump-offer): `fixed inset-0 z-50 bg-[#0A0A0A]` + `bg-radial-gold`
- Never import router from `next/navigation` — use `@/i18n/navigation`

## Gotchas (Top 5)
> Full list: [docs/gotchas.md](docs/gotchas.md)

- `useSearchParams()` requires `<Suspense>` wrapper or build fails
- Stripe webhook handles `tier: "bump"` separately (no PDF, just `bump_accepted: true`)
- `Archive/` folder is excluded from TS compilation — old Vite SPA, don't touch
- Vercel env vars must be added per-environment (production, preview, development separately)
- Supabase migrations: `supabase db push --workdir .` applies all pending

## Recent Decisions
> History: [docs/decisions/](docs/decisions/)

- [2026-02-24] Bump offer page — €7 upsell between quiz and processing ([details](docs/decisions/2026-02-24-bump-offer.md))

## Active Context
Bump offer feature shipped. Supabase env vars added to Vercel. Still missing: Stripe keys, SendGrid keys, and NEXT_PUBLIC_SITE_URL in Vercel for full production deployment.

## Discovery Log (Recent)
> Full log: [docs/discovery-log.md](docs/discovery-log.md)

- [2026-02-24] Supabase CLI retrieves API keys via `supabase projects api-keys --project-ref <ref>`
