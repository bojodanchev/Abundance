# Discovery Log

Reverse-chronological. Most recent first.

## [2026-02-24] Bump offer implementation and Supabase env setup
**Context**: Implementing post-quiz bump offer page and connecting Supabase to Vercel
**Learnings**:
- Supabase CLI `supabase projects api-keys --project-ref <ref>` retrieves anon and service_role keys
- Vercel CLI requires adding env vars one environment at a time (`vercel env add <name> production`)
- The `supabase db push` command auto-applies all pending migrations in order
- Stripe webhook needs early return for bump tier to skip PDF generation
- sessionStorage is ideal for countdown timers that should persist across page refreshes but not across sessions
**Files touched**: schemas.ts, ConfirmationScreen.tsx, stripe webhook, bump-offer page, create-bump-checkout route, bg.json, en.json
