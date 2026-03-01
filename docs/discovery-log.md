# Discovery Log

Reverse-chronological. Most recent first.

## [2026-03-01] Modular knowledge base implementation
**Context**: Expanding analysis from 3 frameworks (HD, numerology, astrology) to 4+ (adding Chinese astrology, temporal awareness, daily practices, plan templates)
**Learnings**:
- Selective knowledge injection is critical — including all 12 zodiac signs + all 12 life paths in every prompt wastes tokens. Inject only the user's specific data.
- `max_completion_tokens` needed increase from 16K to 24K for the expanded V2 output schema
- V2 optional fields in `AnalysisResult` interface provide backward compatibility — old submissions render fine, new ones get richer content
- Chinese Zodiac calculation: `year % 12` for animal, `year % 10` for element (using fixed arrays)
- Personal Year calculation: `reduceToDigit(birthMonth + birthDay + currentYear)` — no master numbers (always reduce to 1-9)
- Multi-agent parallel implementation worked well: 3 agents creating data files + 1 updating schema concurrently, then 3 consumer-update agents in parallel
- PDF V2 pages need dynamic page numbering (pre-calculate based on which V2 sections have data)
- ResultsClient shows V2 executive summary as free teaser; synthesis/timing/practices are locked behind paywall
**Files touched**: src/lib/knowledge/ (11 new files), schemas.ts, generate-analysis/route.ts, ResultsClient.tsx, page.tsx, AbundanceReport.tsx, send-email/route.ts. Deleted: diagnostic-knowledge.ts

## [2026-02-24] Bump offer implementation and Supabase env setup
**Context**: Implementing post-quiz bump offer page and connecting Supabase to Vercel
**Learnings**:
- Supabase CLI `supabase projects api-keys --project-ref <ref>` retrieves anon and service_role keys
- Vercel CLI requires adding env vars one environment at a time (`vercel env add <name> production`)
- The `supabase db push` command auto-applies all pending migrations in order
- Stripe webhook needs early return for bump tier to skip PDF generation
- sessionStorage is ideal for countdown timers that should persist across page refreshes but not across sessions
**Files touched**: schemas.ts, ConfirmationScreen.tsx, stripe webhook, bump-offer page, create-bump-checkout route, bg.json, en.json
