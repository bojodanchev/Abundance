# Gotchas & Lessons Learned

## Routing
- **Always use `@/i18n/navigation` router**: Never import `useRouter` from `next/navigation` directly — it won't handle locale prefixes correctly.
- **Suspense required for useSearchParams**: Any component using `useSearchParams()` must be wrapped in `<Suspense>`. Follow the pattern in `processing/page.tsx`.

## Supabase
- **Supabase project is linked**: Run `supabase link --project-ref dyyoknmfcbulvliqsjls` if re-linking needed. Migrations are in `supabase/migrations/`.
- **Push migrations with CLI**: `supabase db push --workdir /Users/bojodanchev/Abundance` — the CLI will auto-confirm.

## Stripe
- **Bump tier in webhook**: The Stripe webhook at `api/webhook/stripe` handles `tier: "bump"` separately — it only sets `bump_accepted: true` and skips PDF generation. All other tiers trigger PDF generation.
- **Metadata is critical**: All Stripe checkout sessions must include `submission_id` and `tier` in metadata for the webhook to process correctly.

## i18n
- **Default locale is bg (Bulgarian)**: All primary copy is in Bulgarian. English is secondary.
- **Translation files**: `src/i18n/messages/bg.json` and `en.json` — must keep keys in sync.

## Build
- **Archive folder excluded from TS compilation**: The `Archive/` directory contains the old Vite SPA. It's excluded in `tsconfig.json` to prevent build errors.

## Vercel
- **Env vars must be set per environment**: Vercel requires adding env vars separately to production, preview, and development. Use `vercel env add <name> <environment>`.
