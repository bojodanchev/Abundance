# Decision: Bump Offer Page Between Quiz and Processing

**Date**: 2026-02-24
**Status**: accepted

## Context
After completing the diagnostic quiz, users went straight to the processing/analysis page. We wanted to capture impulse purchases with a low-friction upsell before they see their free results.

## Decision
Insert a bump offer page at `/bump-offer?id=...` between quiz submission and the processing page. The offer is "Express Review + 7-Day Personal AI Assistant" for €7 (down from €29, 76% discount). Both "Accept" (after Stripe payment) and "Skip" lead to `/processing?id=...` — the user always gets their free analysis.

Key design choices:
- 10-minute countdown timer persisted in sessionStorage (urgency)
- Minimal text, 3 benefit bullets, dominant gold CTA
- Skip link subtle but visible (no dark patterns)
- Timer auto-redirects to processing when expired

## Alternatives Considered
- **Modal overlay on processing page**: Rejected — felt interruptive and harder to track
- **Email follow-up upsell**: Rejected — lower conversion than in-flow impulse
- **Higher price point**: Rejected — €7 is impulse-buy territory for BG market

## Consequences
- New flow: Confirmation → `/bump-offer` → `/processing`
- New DB column: `submissions.bump_accepted` (boolean)
- Stripe webhook handles `tier: "bump"` separately (no PDF generation)
- Revenue opportunity on every quiz completion
