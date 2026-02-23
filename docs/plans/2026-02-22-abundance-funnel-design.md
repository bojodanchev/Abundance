# CODE: ABUNDANCE — Diagnostic Funnel Design Document

**Date**: 2026-02-22
**Status**: Approved
**Brand**: Bold Luxury (Black/Gold/Minimal)
**Languages**: Bulgarian + English (next-intl)
**Stack**: Next.js 16 App Router, Tailwind CSS v4, Supabase, OpenAI, SendGrid, Framer Motion, Vercel

---

## Implementation Progress

**Last updated**: 2026-02-22
**Overall**: 93% complete (54/58 items)

| Category | Done | Total | % |
|----------|------|-------|---|
| Landing Page Components | 9 | 9 | 100% |
| Quiz Flow (8 screens) | 8 | 8 | 100% |
| Results Components | 2 | 5 | 40% |
| Pages | 7 | 7 | 100% |
| API Routes | 7 | 7 | 100% |
| Backend / Infrastructure | 9 | 9 | 100% |
| Shared Components | 5 | 6 | 83% |
| Admin CRM (bonus) | 7 | 7 | 100% |

### Remaining Items
- [ ] `ProfileBadge` component — HD type display for results page
- [ ] `RadarChart` — currently placeholder, needs Recharts spider chart
- [ ] `UpgradeSection` — standalone pricing CTA for results page (logic exists inline in thank-you)
- [ ] `Custom Slider` — dedicated gold-thumb range input component

---

## 1. Funnel Architecture

```
ACQUISITION LAYER
─────────────────────────────────────────────
[Ad / Social / SEO]
       ↓
[Landing Page] ─── Bold Luxury aesthetic                          [DONE]
       ↓          Hero + Problem + How It Works + Social Proof + CTA
       ↓
[Custom Quiz] ─── 8-screen diagnostic experience                 [DONE]
       ↓          Full-screen, one-question-at-a-time
       ↓          Collects: name, email, life audit (7 areas),
       ↓          priorities, goals, birth data, commitment, income
       ↓
[Processing Screen] ─── "Generating your analysis..."            [DONE]
       ↓                 Animated, builds anticipation (15-20s)

CONVERSION LAYER
─────────────────────────────────────────────
[Results Preview Page] ─── Shows teaser insights                  [DONE]
       ↓                   Profile type, top scores, 1 key insight
       ↓                   UPGRADE CTA → full report (€37)
       ↓
[VSL / Thank You Page] ─── Video sales letter                    [DONE]
       ↓                    Plays while PDF is being emailed
       ↓                    Soft-sells the mid-tier (€147)

NURTURE LAYER
─────────────────────────────────────────────
[Email 1] Immediate ─── Teaser PDF + results recap               [DONE]
[Email 2] +24h ─────── Value story + upgrade to full report      [DONE]
[Email 3] +48h ─────── "The cost of staying stuck" + mid-tier    [DONE]
[Email 4] +72h ─────── Case study + scarcity (limited spots)     [DONE]
[Email 5] +5 days ──── Final CTA: high-ticket coaching offer     [DONE]

UPSELL LAYER (Post-Purchase)
─────────────────────────────────────────────
[Low-tier buyers]  → Upsell to mid-tier (community)
[Mid-tier buyers]  → Upsell to high-ticket (coaching call)
```

### Value Ladder

| Tier | Price | Deliverable | Trigger | Status |
|------|-------|-------------|---------|--------|
| Free | €0 | Teaser PDF (profile type + 1 insight per area) | Quiz completion | [DONE] |
| Low | €27-47 | Full detailed PDF + 90-day action plan | Results preview page upsell | [DONE] |
| Mid | €97-197 | Full report + video walkthrough + 90-day community | Thank-you page / Email #3-4 | [DONE] |
| High | €497-997+ | Full report + 1-on-1 coaching + personalized roadmap | Email #4-5 / Booking call | [DONE] |

---

## 2. Visual Design System — "Bold Luxury" [DONE]

### 2.1 Color Palette [DONE] — implemented in `src/app/globals.css`

```css
:root {
  /* Primary */
  --color-black: #000000;
  --color-white: #FFFFFF;

  /* Accent — Royal Gold */
  --accent: #C9A84C;
  --accent-light: #E8D5A3;
  --accent-dark: #8B7235;
  --accent-glow: rgba(201, 168, 76, 0.25);

  /* Surfaces */
  --surface-white: #FFFFFF;
  --surface-dark: #0A0A0A;
  --surface-muted: #141414;
  --surface-card: #1A1A1A;

  /* Text */
  --text-on-dark: #FFFFFF;
  --text-on-light: #0A0A0A;
  --text-secondary: #9CA3AF;
  --text-tertiary: #6B7280;

  /* Borders */
  --border-dark: #1F1F1F;
  --border-light: #E5E7EB;

  /* Status */
  --success: #16A34A;
  --warning: #F59E0B;
  --danger: #DC2626;
  --info: #2563EB;
}
```

Gold usage discipline:
- CTAs (buttons, links)
- Section labels (small text above headings)
- Progress indicators and step numbers
- Key highlights, badges, icons
- **Nothing else.** Everything else is black, white, and grays.

### 2.2 Typography [DONE] — loaded in `src/app/layout.tsx`

```css
--font-display: 'Plus Jakarta Sans', sans-serif;  /* Headings */
--font-body: 'Inter', sans-serif;                  /* Body */
--font-mono: 'JetBrains Mono', monospace;          /* Data, scores */
```

| Role | Font | Weight | Size | Color |
|------|------|--------|------|-------|
| Hero headline | Plus Jakarta Sans | 800 | 56-72px | White |
| Section heading | Plus Jakarta Sans | 700 | 40-48px | White/Black |
| Card heading | Plus Jakarta Sans | 600 | 24-28px | White/Black |
| Section label | Plus Jakarta Sans | 600 | 14px uppercase tracking-wide | Gold |
| Body | Inter | 400 | 16-18px | Secondary gray |
| Small/meta | Inter | 400 | 14px | Tertiary gray |
| Scores/data | JetBrains Mono | 700 | varies | Gold or White |

### 2.3 Section Rhythm [DONE]

Every content section follows the enterprise-ui "label + heading" pattern:

```html
<p class="gold-label">SECTION_LABEL</p>
<h2 class="section-heading">Bold Heading Here</h2>
<p class="section-description">Supporting gray text.</p>
```

Landing page alternates dark/light backgrounds:

```
[DARK]   Nav Bar (sticky, black, blur)
[DARK]   Hero + CTA (full viewport)
[LIGHT]  Social Proof logos strip
[DARK]   Problem Section (3 pain cards)
[DARK]   How It Works (gold numbered steps)
[LIGHT]  For Who (tabbed white cards)
[DARK]   FAQ (accordion)
[GOLD]   Final CTA (gold gradient bg)
[DARK]   Footer (multi-column)
```

### 2.4 Button Hierarchy [DONE] — `src/components/shared/Button.tsx`

| Type | Background | Text | Border | Hover |
|------|-----------|------|--------|-------|
| Primary | Gold (#C9A84C) | Black | None | Darken to #8B7235 |
| Secondary | Transparent | Gold | 2px Gold | Gold bg, black text |
| Ghost | Transparent | Gold | None | Underline |
| Dark (on gold bg) | Black | White | None | Opacity 90% |

All buttons: `rounded-lg`, `px-6 py-3`, `text-sm font-semibold`, `transition-all duration-200`

### 2.5 Motion Design (Framer Motion) [DONE]

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Page transitions | fadeIn + slideUp 20px | 200ms | ease-out |
| Section reveal | stagger children on scroll | 400ms per item | ease-out |
| Quiz transitions | slideLeft/Right | 300ms | spring(0.5, 0.9) |
| Number counters | countUp on view | 1500ms | ease-out |
| Hover cards | scale(1.02) + gold shadow | 200ms | ease-out |
| Loading steps | fadeIn + typewriter text | 2s per step | linear |
| Progress bar | width transition | 300ms | ease-out |
| Gold particles | float upward | infinite, 3-5s | linear |

### 2.6 Spacing & Layout [DONE]

```css
/* Section padding */
section { padding: 80px 0; }       /* Desktop */
section { padding: 48px 0; }       /* Mobile */

/* Content container */
.container { max-width: 1140px; margin: 0 auto; padding: 0 24px; }

/* Breakpoints */
mobile:  < 768px   (single column, stacked)
tablet:  768px+    (2-column grids)
desktop: 1024px+   (full nav, wider content)
wide:    1280px+   (max-width containers)
```

---

## 3. Page Specifications

### 3.1 Landing Page (`/[locale]/page.tsx`) [DONE]

#### Nav Bar [DONE] — `src/components/landing/Navbar.tsx`
- Sticky, `bg-black/95 backdrop-blur-sm`, border-bottom `#1F1F1F`
- Logo: gold diamond icon + "ABUNDANCE" (Plus Jakarta Sans 700)
- Center links: Diagnostic, How It Works, FAQ
- Right: Language switcher (BG/EN) + gold CTA button "Започни →"
- Mobile: hamburger + persistent CTA

#### Hero Section (Full Viewport, Dark) [DONE] — `src/components/landing/Hero.tsx`
- `min-h-screen`, centered content
- Gold label: "DIAGNOSTIC"
- Headline: "Открий Кода Си Към Изобилието." (64px, ExtraBold, white)
- EN: "Discover Your Code to Abundance."
- Subtext: "7-минутна диагностика, която разкрива какво те спира и как да го преодолееш."
- Dual CTAs: [Започни Диагностиката →] gold filled + [Научи повече] gold outlined
- Social proof: "Вече 1,200+ анализа" counter
- Subtle gold floating particles animation in background

#### Social Proof Strip (Light) [DONE] — `src/components/landing/SocialProofStrip.tsx`
- White bg, py-12
- "Методологии, базирани на" label
- Logos: Human Design, Астрология, Нумерология, Психология
- Grayscale, 60% opacity, hover → full color

#### Problem Section (Dark) [DONE] — `src/components/landing/ProblemSection.tsx`
- Gold label: "ПРОБЛЕМЪТ"
- Heading: "Живееш в хаос и не знаеш откъде да започнеш."
- 3 pain-point cards (dark cards, `#1A1A1A` bg, gold icon accents):
  1. "Усещаш се заседнал" — know something's off but can't name it
  2. "Пробвал си всичко" — courses, books, mentors, still stuck
  3. "Нямаш ясна посока" — no personalized roadmap for YOUR situation

#### How It Works (Dark) [DONE] — `src/components/landing/HowItWorks.tsx`
- Gold label: "КАК РАБОТИ"
- Heading: "3 Стъпки Към Яснота"
- 3 numbered steps connected by gold line:
  - 01: Диагностика — "Попълни 7-минутната диагностика"
  - 02: AI Анализ — "AI създава твоя уникален профил"
  - 03: План — "Получаваш персонализиран 90-дневен план"
- Each step: gold number (JetBrains Mono), heading, gray description

#### For Who Section (Light) [DONE] — `src/components/landing/ForWho.tsx`
- White bg
- Gold label: "ЗА КОГО Е"
- 4 tabs with gold active indicator:
  - Начинаещи (Beginners)
  - Опитни (Experienced)
  - Криейтъри (Creators)
  - Готови за промяна (Ready for change)
- Tab content: description + 3 bullet points + CTA

#### FAQ Section (Dark) [DONE] — `src/components/landing/FAQ.tsx`
- 3 accordion items (MVP, expandable later)
- Gold chevron icons
- Q1: "Колко време отнема диагностиката?" → "7 минути"
- Q2: "Безплатна ли е?" → "Да, базовият анализ е безплатен"
- Q3: "Колко точна е AI диагностиката?" → Methodology explanation

#### Final CTA (Gold Gradient) [DONE] — `src/components/landing/FinalCTA.tsx`
- `background: linear-gradient(135deg, #C9A84C, #8B7235)`
- Heading: "Готов ли си да откриеш кода си?" (black text)
- Button: black bg, white text [Започни Безплатната Диагностика]
- Microcopy: "Безплатно . 7 минути . Без ангажимент"

#### Footer (Dark) [DONE] — `src/components/landing/Footer.tsx`
- Multi-column enterprise footer
- Columns: Продукт, Ресурси, Правна информация, Контакт
- Social icons (Instagram, Facebook, YouTube)
- Language switcher
- Copyright + "Powered by AI" badge

---

### 3.2 Custom Quiz (`/[locale]/diagnose/page.tsx`) [DONE]

Full-screen, immersive, one-question-at-a-time experience.

#### Shell [DONE] — `src/components/quiz/QuizShell.tsx`
- Black bg, no nav bar (distraction-free)
- Top: thin gold progress bar (animated width) — `QuizProgress.tsx`
- Top-right: "X" close button (confirms exit)
- Bottom: [Back] [Continue] navigation
- Keyboard: Enter = continue, Escape = back, Arrow keys for sliders

#### Screen 1: Welcome / Opt-In [DONE] — `src/components/quiz/WelcomeScreen.tsx`
- Name, email, phone (optional), GDPR checkbox

#### Screen 2: Life Audit (7 Areas) [DONE] — `src/components/quiz/LifeAuditScreen.tsx`
- 7 slider components for each life area
- Number display updates in real-time (JetBrains Mono)

#### Screen 3: Priorities (Multi-select, max 3) [DONE] — `src/components/quiz/PriorityScreen.tsx`
- 7 option cards, gold border on selected, max 3 enforced

#### Screen 4: Goals (Conditional) [DONE] — `src/components/quiz/GoalsScreen.tsx`
- Per-priority goal sliders with current vs target visualization

#### Screen 5: Core Code (Birth Data) [DONE] — `src/components/quiz/BirthDataScreen.tsx`
- Birth date, time, city/country inputs

#### Screen 6: Commitment Level [DONE] — `src/components/quiz/CommitmentScreen.tsx`
- 3 large choice cards: High / Medium / Low

#### Screen 7: Resources (Income) [DONE] — `src/components/quiz/IncomeScreen.tsx`
- 5 option pills for income ranges

#### Screen 8: Confirmation [DONE] — `src/components/quiz/ConfirmationScreen.tsx`
- Summary + submit CTA

#### Quiz State Management [DONE] — `src/components/quiz/QuizContext.tsx`
- React context for all quiz data
- Form validation per screen (Zod schemas)
- On completion: POST to `/api/webhook/quiz`

---

### 3.3 Processing Screen (`/[locale]/processing/page.tsx`) [DONE]

Cinematic loading experience. 15-20 seconds.

- Steps appear one by one with checkmark animation
- Progress bar fills smoothly
- Rotating "Did you know?" tips (builds value for the paid offer)
- After completion → auto-redirect to Results Preview

---

### 3.4 Results Preview (`/[locale]/results/[id]/page.tsx`) [DONE — page exists, some components partial]

The highest-converting page in the funnel.

- [DONE] Page structure and server-side data fetching
- [DONE] InsightCard component — `src/components/results/InsightCard.tsx`
- [PARTIAL] RadarChart — placeholder, needs Recharts spider chart implementation
- [MISSING] ProfileBadge — HD type display (e.g., "Генератор 5/1")
- [MISSING] UpgradeSection — standalone pricing CTA component
- Top 3 priority areas show 1 teaser insight each (visible)
- Remaining 4 areas are locked/blurred with upgrade prompt
- Prominent upgrade section with urgency
- "Continue with free" ghost link → goes to Thank You page

---

### 3.5 VSL / Thank You (`/[locale]/thank-you/page.tsx`) [DONE]

- Congratulations section with check inbox message
- VSL video section
- 3-tier pricing cards (Free/Full Report/Coaching) — embedded inline
- Guarantee section
- Footer

---

## 4. Database Schema [DONE] — `supabase/migrations/001_initial_schema.sql`

### submissions [DONE]
```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_phone VARCHAR(50),
  locale VARCHAR(5) DEFAULT 'bg',
  scores JSONB NOT NULL DEFAULT '{"finances": 0, "business": 0, "health": 0, "mental": 0, "romantic": 0, "social": 0, "mission": 0}',
  priority_top3 TEXT[],
  goals JSONB,
  birth_date DATE,
  birth_time TIME,
  birth_time_unknown BOOLEAN DEFAULT false,
  birth_city VARCHAR(255),
  birth_country VARCHAR(255),
  commitment_level VARCHAR(50),
  income_level VARCHAR(50),
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  referral_code VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  analysis_result JSONB,
  pdf_url TEXT,
  email_sent BOOLEAN DEFAULT false,
  tier VARCHAR(50) DEFAULT 'free',
  payment_status VARCHAR(50),
  stripe_session_id VARCHAR(255),
  gdpr_consent BOOLEAN DEFAULT false,
  gdpr_consent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_submissions_email ON submissions(user_email);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_created ON submissions(created_at);
```

### email_logs [DONE]
```sql
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id),
  email_type VARCHAR(100),
  locale VARCHAR(5) DEFAULT 'bg',
  sent_at TIMESTAMP DEFAULT NOW(),
  opened BOOLEAN DEFAULT false,
  clicked BOOLEAN DEFAULT false
);
```

### payments [DONE]
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id),
  tier VARCHAR(50) NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  stripe_session_id VARCHAR(255),
  stripe_payment_intent VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 5. API Specifications

### POST `/api/webhook/quiz` [DONE] — `src/app/api/webhook/quiz/route.ts`
- Receives quiz submission from frontend
- Validates with Zod schema
- Rate limits (50 per 5 min)
- Saves to Supabase `submissions` table
- Triggers async processing (analysis + PDF + email)
- Returns `{ success: true, submissionId: uuid }`

### POST `/api/generate-analysis` [DONE] — `src/app/api/generate-analysis/route.ts`
- Input: `{ submission_id: uuid }`
- Fetches submission data from Supabase
- Calls OpenAI GPT-4o with structured prompt
- Updates submission with `analysis_result` JSONB and status: "completed"
- Triggers `/api/send-email` (welcome email, fire-and-forget)

### POST `/api/generate-pdf` [DONE] — `src/app/api/generate-pdf/route.ts`
- Input: `{ submission_id: uuid, tier: 'free' | 'paid' }`
- Free tier: teaser PDF (profile type + radar chart + 1 insight per area) — 4 pages
- Paid tier: full PDF (all analysis + 90-day plan) — 7 pages
- Generates with @react-pdf/renderer (branded, Bold Luxury themed)
- Updates `pdf_url` in submissions

### POST `/api/send-email` [DONE] — `src/app/api/send-email/route.ts`
- Input: `{ submission_id: uuid, email_type: 'welcome' | 'nurture_N' }`
- SendGrid for transactional (welcome + nurture 1-5)
- Bold Luxury email templates (black bg, gold accents)
- Logs to `email_logs` table

### POST `/api/create-checkout` [DONE] — `src/app/api/create-checkout/route.ts`
- Input: `{ submission_id, tier, locale }`
- Creates Stripe checkout session (low: €37, mid: €147, high: €697)
- Returns `{ success: true, url: checkoutSessionUrl }`

### POST `/api/webhook/stripe` [DONE] — `src/app/api/webhook/stripe/route.ts`
- Stripe webhook for payment confirmations
- Verifies webhook signature
- Updates submission and inserts payment record
- Triggers PDF generation

### GET `/api/cron/nurture-emails` [DONE] — `src/app/api/cron/nurture-emails/route.ts`
- Vercel cron job (daily 9 AM UTC)
- 5-email nurture sequence with strategic timing

---

## 6. i18n Strategy [DONE]

Using `next-intl` with App Router:

### Routing [DONE] — `src/i18n/routing.ts`
```
/bg/             → Bulgarian landing page (default)
/en/             → English landing page
/bg/diagnose     → Bulgarian quiz
/en/diagnose     → English quiz
```

### File Structure [DONE]
```
src/i18n/messages/
  bg.json       → All Bulgarian strings
  en.json       → All English strings
```

### Navigation [DONE] — `src/i18n/navigation.ts`
- `Link`, `redirect`, `usePathname`, `useRouter` from `createNavigation(routing)`

---

## 7. Component Inventory

### Landing Page Components [9/9 DONE]
- [x] `Navbar` — sticky black nav with gold CTA — `src/components/landing/Navbar.tsx`
- [x] `Hero` — full viewport, particles, dual CTAs — `src/components/landing/Hero.tsx`
- [x] `SocialProofStrip` — methodology logos — `src/components/landing/SocialProofStrip.tsx`
- [x] `ProblemSection` — 3 pain-point cards — `src/components/landing/ProblemSection.tsx`
- [x] `HowItWorks` — 3 gold-numbered steps — `src/components/landing/HowItWorks.tsx`
- [x] `ForWho` — 4 tabbed audience cards — `src/components/landing/ForWho.tsx`
- [x] `FAQ` — accordion with gold chevrons — `src/components/landing/FAQ.tsx`
- [x] `FinalCTA` — gold gradient section — `src/components/landing/FinalCTA.tsx`
- [x] `Footer` — multi-column enterprise footer — `src/components/landing/Footer.tsx`

### Quiz Components [10/10 DONE]
- [x] `QuizShell` — full-screen wrapper, progress bar, navigation — `src/components/quiz/QuizShell.tsx`
- [x] `QuizProgress` — gold progress bar — `src/components/quiz/QuizProgress.tsx`
- [x] `QuizContext` — React context for quiz state — `src/components/quiz/QuizContext.tsx`
- [x] `WelcomeScreen` — opt-in form — `src/components/quiz/WelcomeScreen.tsx`
- [x] `LifeAuditScreen` — 7 sliders — `src/components/quiz/LifeAuditScreen.tsx`
- [x] `PriorityScreen` — multi-select cards — `src/components/quiz/PriorityScreen.tsx`
- [x] `GoalsScreen` — conditional sliders — `src/components/quiz/GoalsScreen.tsx`
- [x] `BirthDataScreen` — date/time/location inputs — `src/components/quiz/BirthDataScreen.tsx`
- [x] `CommitmentScreen` — 3 choice cards — `src/components/quiz/CommitmentScreen.tsx`
- [x] `IncomeScreen` — 5 option pills — `src/components/quiz/IncomeScreen.tsx`
- [x] `ConfirmationScreen` — summary + submit — `src/components/quiz/ConfirmationScreen.tsx`

### Results Components [2/5]
- [ ] `ProfileBadge` — type display (e.g., "Генератор 5/1") — MISSING
- [~] `RadarChart` — 7-area spider chart — `src/components/results/RadarChart.tsx` — PLACEHOLDER, needs Recharts implementation
- [x] `InsightCard` — single area insight (visible or locked) — `src/components/results/InsightCard.tsx`
- [ ] `UpgradeSection` — pricing + CTA — MISSING (logic inline in thank-you page)
- [~] `PricingCard` — enterprise-ui style tier card — EMBEDDED in thank-you page, not standalone

### Shared Components [5/6]
- [x] `Button` — primary/secondary/ghost variants — `src/components/shared/Button.tsx`
- [x] `Card` — dark card with optional gold accent — `src/components/shared/Card.tsx`
- [x] `Section` — label + heading + content wrapper — `src/components/shared/Section.tsx`
- [ ] `Slider` — custom range input with gold thumb — MISSING (quiz uses inline slider styles)
- [x] `LanguageSwitcher` — BG/EN toggle — `src/components/shared/LanguageSwitcher.tsx`
- [x] `CookieConsent` — GDPR banner — `src/components/shared/CookieConsent.tsx`

---

## 8. Deployment & Infrastructure [DONE]

### Environment Variables [DONE] — `.env.example`
```
# Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI
OPENAI_API_KEY=

# Email
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=

# Payments
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# App
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_DEFAULT_LOCALE=

# Admin CRM
ADMIN_PASSWORD=
JWT_SECRET=

# Internal
INTERNAL_API_KEY=
CRON_SECRET=
```

### Deployment [DONE]
- Hosting: Vercel
- Domain: codeabundance.com
- SSL: automatic (Vercel)
- Cron: `vercel.json` with daily nurture-emails schedule

### Monthly Cost Estimate
| Service | MVP | Scale (10k users) |
|---------|-----|-------------------|
| Vercel Pro | €20 | €20 |
| Supabase Pro | €25 | €75 |
| SendGrid | €0 | €20 |
| OpenAI API | €10 | €100 |
| **Total** | **~€55/mo** | **~€215/mo** |

Note: Architecture is intentionally in-app custom quiz + SendGrid nurture automation + Admin CRM.

---

## 9. Admin CRM Panel (`/admin`) [DONE — bonus, not in original plan]

Password-protected admin panel added post-launch for lead management.

### Auth [DONE]
- `src/lib/admin-auth.ts` — JWT sign/verify with `jose`, HttpOnly cookie
- `middleware.ts` — JWT protection for `/admin/*` and `/api/admin/*` routes
- `POST /api/admin/login` — password validated with `crypto.timingSafeEqual`
- `POST /api/admin/logout` — cookie clearing

### Pages [DONE]
- [x] Login — `src/app/admin/login/` (LoginForm.tsx client component)
- [x] Dashboard — `src/app/admin/page.tsx` + `DashboardContent.tsx`
  - 6 KPI cards: Total Leads, Leads Today, This Month, Conversion Rate, Revenue, Emails Sent
  - Status breakdown with colored badges (amber/blue/green/red)
  - Recent 10 leads mini table
- [x] Leads Table — `src/app/admin/leads/` (LeadsTable.tsx)
  - Search, status/tier/locale filters, date range, sortable columns
  - Pagination (25/page), CSV export button
  - Clickable rows → lead detail
- [x] Lead Detail — `src/app/admin/leads/[id]/` (LeadDetail.tsx)
  - Contact info, life audit scores bar chart, birth data, analysis result
  - Email timeline, payment history
  - Actions: re-analyze, resend email, change status
- [x] Analytics — `src/app/admin/analytics/` (AnalyticsCharts.tsx)
  - Conversion funnel (horizontal bars)
  - Revenue over time (area chart, period selector)
  - Income distribution (bar chart)
  - Email performance (bar chart per type)

### API Routes [DONE]
- [x] `GET /api/admin/stats` — dashboard KPIs
- [x] `GET /api/admin/leads` — paginated list with filters
- [x] `GET /api/admin/leads/[id]` — single lead + PATCH status
- [x] `POST /api/admin/leads/[id]/resend-email` — resend via existing send-email
- [x] `POST /api/admin/leads/[id]/re-analyze` — re-trigger AI analysis
- [x] `GET /api/admin/leads/export` — CSV download
- [x] `GET /api/admin/analytics` — chart data with period filtering
