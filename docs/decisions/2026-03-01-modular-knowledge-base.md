# Decision: Modular Knowledge Base with Selective Injection
**Date**: 2026-03-01
**Status**: accepted

## Context
The analysis system used a single `diagnostic-knowledge.ts` file (~360 lines) with basic Life Path, Sun Sign, and HD type knowledge inlined into a monolithic prompt. The master implementation document required massively expanded knowledge: Chinese Zodiac, Personal Year cycles, expanded HD (profiles, authorities, centers), 90-day plan templates, daily practices, and temporal awareness. Inlining everything into one file/prompt was unsustainable.

## Decision
Split the knowledge base into 11 modular files under `src/lib/knowledge/`:
- Pure data files (life-paths, zodiac, human-design, chinese-zodiac, personal-year, temporal, plan-templates, daily-practices)
- Calculation functions (calculations.ts)
- Selective prompt builder (prompt-builder.ts) that injects ONLY the user's relevant data
- Barrel re-export (index.ts)

Added V2 optional fields to `AnalysisResult` schema for backward compatibility with existing submissions.

## Alternatives Considered
1. **Single expanded file** — Would exceed 2000+ lines, hard to maintain
2. **Database-backed knowledge** — Over-engineering for static reference data
3. **Full knowledge injection** — Would blow token budget; selective injection keeps prompts focused

## Consequences
- Knowledge is modular and independently editable
- Prompt stays within token budget by injecting only user-relevant data
- V2 fields are backward compatible — old submissions still render fine
- `max_completion_tokens` increased from 16K to 24K for richer output
- Old `diagnostic-knowledge.ts` deleted; all imports point to `@/lib/knowledge`
