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

## Knowledge Base / Analysis
- **Import from `@/lib/knowledge`, NOT `@/lib/diagnostic-knowledge`**: The old monolithic file was deleted. All calculation functions and prompt builders are in `src/lib/knowledge/`.
- **Selective prompt injection**: `buildSystemPrompt()` requires an `AnalysisContext` with pre-calculated values. It injects only the user's specific Life Path, zodiac, Chinese zodiac, and Personal Year data — not all entries.
- **V2 fields are optional**: `AnalysisResult` V2 fields (`executive_summary`, `synthesis`, `timing`, `daily_practices`, `integration_statement`, `metadata`) may be absent on older submissions. Always check with conditional rendering.
- **Personal Year uses 1-9 only**: Unlike Life Path, Personal Year numbers don't preserve master numbers (11, 22, 33). Always reduce to single digit.

## Build
- **Archive folder excluded from TS compilation**: The `Archive/` directory contains the old Vite SPA. It's excluded in `tsconfig.json` to prevent build errors.

## Vercel
- **Env vars must be set per environment**: Vercel requires adding env vars separately to production, preview, and development. Use `vercel env add <name> <environment>`.
- **Never use fire-and-forget `fetch` in API routes**: Vercel terminates serverless functions after the response is sent. Unawaited `fetch` calls will silently fail. Use `after()` from `next/server` (Next.js 15+) instead — it runs code after the response but before Vercel freezes the function. All inter-route calls (`generate-analysis` → `send-email`, `quiz` → `generate-analysis`, `stripe` → `generate-pdf`) must use this pattern.
