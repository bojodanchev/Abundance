# CODE: ABUNDANCE — Diagnostic Funnel Design Document

**Date**: 2026-02-22
**Status**: Approved
**Brand**: Bold Luxury (Black/Gold/Minimal)
**Languages**: Bulgarian + English (next-intl)
**Stack**: Next.js 14 App Router, Tailwind CSS, Supabase, OpenAI, SendGrid, ConvertKit, Framer Motion, Vercel

---

## 1. Funnel Architecture

```
ACQUISITION LAYER
─────────────────────────────────────────────
[Ad / Social / SEO]
       ↓
[Landing Page] ─── Bold Luxury aesthetic
       ↓          Hero + Problem + How It Works + Social Proof + CTA
       ↓
[Custom Quiz] ─── 8-screen diagnostic experience
       ↓          Full-screen, one-question-at-a-time
       ↓          Collects: name, email, life audit (7 areas),
       ↓          priorities, goals, birth data, commitment, income
       ↓
[Processing Screen] ─── "Generating your analysis..."
       ↓                 Animated, builds anticipation (15-20s)

CONVERSION LAYER
─────────────────────────────────────────────
[Results Preview Page] ─── Shows teaser insights
       ↓                   Profile type, top scores, 1 key insight
       ↓                   UPGRADE CTA → full report (€37)
       ↓
[VSL / Thank You Page] ─── Video sales letter
       ↓                    Plays while PDF is being emailed
       ↓                    Soft-sells the mid-tier (€147)

NURTURE LAYER
─────────────────────────────────────────────
[Email 1] Immediate ─── Teaser PDF + results recap
[Email 2] +24h ─────── Value story + upgrade to full report
[Email 3] +48h ─────── "The cost of staying stuck" + mid-tier
[Email 4] +72h ─────── Case study + scarcity (limited spots)
[Email 5] +5 days ──── Final CTA: high-ticket coaching offer

UPSELL LAYER (Post-Purchase)
─────────────────────────────────────────────
[Low-tier buyers]  → Upsell to mid-tier (community)
[Mid-tier buyers]  → Upsell to high-ticket (coaching call)
```

### Value Ladder

| Tier | Price | Deliverable | Trigger |
|------|-------|-------------|---------|
| Free | €0 | Teaser PDF (profile type + 1 insight per area) | Quiz completion |
| Low | €27-47 | Full detailed PDF + 90-day action plan | Results preview page upsell |
| Mid | €97-197 | Full report + video walkthrough + 90-day community | Thank-you page / Email #3-4 |
| High | €497-997+ | Full report + 1-on-1 coaching + personalized roadmap | Email #4-5 / Booking call |

---

## 2. Visual Design System — "Bold Luxury"

### 2.1 Color Palette

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

### 2.2 Typography

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

### 2.3 Section Rhythm

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

### 2.4 Button Hierarchy

| Type | Background | Text | Border | Hover |
|------|-----------|------|--------|-------|
| Primary | Gold (#C9A84C) | Black | None | Darken to #8B7235 |
| Secondary | Transparent | Gold | 2px Gold | Gold bg, black text |
| Ghost | Transparent | Gold | None | Underline |
| Dark (on gold bg) | Black | White | None | Opacity 90% |

All buttons: `rounded-lg`, `px-6 py-3`, `text-sm font-semibold`, `transition-all duration-200`

### 2.5 Motion Design (Framer Motion)

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

### 2.6 Spacing & Layout

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

### 3.1 Landing Page (`/[locale]/page.tsx`)

#### Nav Bar
- Sticky, `bg-black/95 backdrop-blur-sm`, border-bottom `#1F1F1F`
- Logo: gold diamond icon + "ABUNDANCE" (Plus Jakarta Sans 700)
- Center links: Diagnostic, How It Works, FAQ
- Right: Language switcher (BG/EN) + gold CTA button "Започни →"
- Mobile: hamburger + persistent CTA

#### Hero Section (Full Viewport, Dark)
- `min-h-screen`, centered content
- Gold label: "DIAGNOSTIC"
- Headline: "Открий Кода Си Към Изобилието." (64px, ExtraBold, white)
- EN: "Discover Your Code to Abundance."
- Subtext: "7-минутна диагностика, която разкрива какво те спира и как да го преодолееш."
- Dual CTAs: [Започни Диагностиката →] gold filled + [Научи повече] gold outlined
- Social proof: "✦ Вече 1,200+ анализа" counter
- Subtle gold floating particles animation in background

#### Social Proof Strip (Light)
- White bg, py-12
- "Методологии, базирани на" label
- Logos: Human Design, Астрология, Нумерология, Психология
- Grayscale, 60% opacity, hover → full color

#### Problem Section (Dark)
- Gold label: "ПРОБЛЕМЪТ"
- Heading: "Живееш в хаос и не знаеш откъде да започнеш."
- 3 pain-point cards (dark cards, `#1A1A1A` bg, gold icon accents):
  1. "Усещаш се заседнал" — know something's off but can't name it
  2. "Пробвал си всичко" — courses, books, mentors, still stuck
  3. "Нямаш ясна посока" — no personalized roadmap for YOUR situation

#### How It Works (Dark)
- Gold label: "КАК РАБОТИ"
- Heading: "3 Стъпки Към Яснота"
- 3 numbered steps connected by gold line:
  - 01: Диагностика — "Попълни 7-минутната диагностика"
  - 02: AI Анализ — "AI създава твоя уникален профил"
  - 03: План — "Получаваш персонализиран 90-дневен план"
- Each step: gold number (JetBrains Mono), heading, gray description

#### For Who Section (Light)
- White bg
- Gold label: "ЗА КОГО Е"
- 4 tabs with gold active indicator:
  - Начинаещи (Beginners)
  - Опитни (Experienced)
  - Криейтъри (Creators)
  - Готови за промяна (Ready for change)
- Tab content: description + 3 bullet points + CTA

#### FAQ Section (Dark)
- 3 accordion items (MVP, expandable later)
- Gold chevron icons
- Q1: "Колко време отнема диагностиката?" → "7 минути"
- Q2: "Безплатна ли е?" → "Да, базовият анализ е безплатен"
- Q3: "Колко точна е AI диагностиката?" → Methodology explanation

#### Final CTA (Gold Gradient)
- `background: linear-gradient(135deg, #C9A84C, #8B7235)`
- Heading: "Готов ли си да откриеш кода си?" (black text)
- Button: black bg, white text [Започни Безплатната Диагностика]
- Microcopy: "Безплатно • 7 минути • Без ангажимент"

#### Footer (Dark)
- Multi-column enterprise footer
- Columns: Продукт, Ресурси, Правна информация, Контакт
- Social icons (Instagram, Facebook, YouTube)
- Language switcher
- Copyright + "Powered by AI" badge

---

### 3.2 Custom Quiz (`/[locale]/diagnose/page.tsx`)

Full-screen, immersive, one-question-at-a-time experience.

#### Shell
- Black bg, no nav bar (distraction-free)
- Top: thin gold progress bar (animated width)
- Top-right: "X" close button (confirms exit)
- Bottom: [← Back] [Continue →] navigation
- Keyboard: Enter = continue, Escape = back, Arrow keys for sliders

#### Screen 1: Welcome / Opt-In
```
┌──────────────────────────────────────────┐
│                                          │
│  ◆ ABUNDANCE                             │
│                                          │
│  Добре дошъл в                           │
│  твоята диагностика.                     │
│                                          │
│  [Име]        ← text input, gold focus   │
│  [Имейл]     ← email input              │
│  [Телефон]   ← tel input (optional)     │
│                                          │
│  □ Съгласен съм с обработката           │
│    на лични данни (GDPR)                 │
│                                          │
│            [Започни →]                    │
└──────────────────────────────────────────┘
```

#### Screen 2: Life Audit (7 Areas)
```
┌──────────────────────────────────────────┐
│  ━━━━━━━━━━━━━━━━━━━━ 25%               │
│                                          │
│  Оцени живота си в тези 7 сфери.        │
│  (1 = критично, 10 = отлично)           │
│                                          │
│  Финанси         ●━━━━━━━━━━━━━ 7       │
│  Бизнес          ●━━━━━━━━━━━━━ 5       │
│  Здраве           ●━━━━━━━━━━━━━ 8       │
│  Ментално здраве  ●━━━━━━━━━━━━━ 4       │
│  Романтика       ●━━━━━━━━━━━━━ 6       │
│  Социален живот  ●━━━━━━━━━━━━━ 7       │
│  Мисия/Цел       ●━━━━━━━━━━━━━ 3       │
│                                          │
│       [← Назад]        [Продължи →]      │
└──────────────────────────────────────────┘
```
- Custom slider components with gold thumb
- Number display updates in real-time (JetBrains Mono)
- Subtle haptic-style feedback on mobile

#### Screen 3: Priorities (Multi-select, max 3)
- "Кои са ТОП 3 сфери за фокус?"
- 7 option cards (from areas rated in Screen 2)
- Gold border on selected, max 3 enforced with toast warning
- Cards show current score as context

#### Screen 4: Goals (Conditional)
- For each of the 3 selected priorities:
  - "Каква е целта ти за [Финанси] след 90 дни?" (1-10 slider)
  - Shows current score vs target (before → after visualization)
- Gold arrow between current and goal score

#### Screen 5: Core Code (Birth Data)
- "Разкрий Core Code-а си"
- Birth date: DD.MM.YYYY (date picker, gold accents)
- Birth time: HH:MM + toggle "Не знам" (dims the field)
- City/Country: autocomplete input
- Subtle cosmic/star background animation

#### Screen 6: Commitment Level
- "Колко си готов да изпълниш плана?"
- 3 large cards (vertical stack):
  - 🔥 High (100%) — "Готов съм да действам"
  - ⚡ Medium — "Нужда от насоки, но мотивиран"
  - 🔍 Low — "Проучвам, още не съм решил"
- Gold border on selected

#### Screen 7: Resources (Income)
- "Какъв е месечният ти доход?"
- 5 option pills (horizontal wrap):
  - Под €1,000 | €1,000-3,000 | €3,000-6,000 | €6,000-10,000 | Над €10,000
- Gold border on selected

#### Screen 8: Confirmation
- "Потвърди информацията си"
- Shows summary: name, email (editable)
- "Диагностиката ще бъде изпратена на: email@example.com"
- [Генерирай Моя Анализ →] — large gold CTA

#### Quiz State Management
- React context for all quiz data
- Form validation per screen (Zod schemas)
- Auto-save to localStorage (resume if tab closed)
- On completion: POST to `/api/webhook/quiz`

---

### 3.3 Processing Screen (`/[locale]/processing/page.tsx`)

Cinematic loading experience. 15-20 seconds.

```
┌──────────────────────────────────────────┐
│                                          │
│  Black bg, centered content              │
│                                          │
│  ◆                                       │
│                                          │
│  Генерираме твоя анализ...              │
│                                          │
│  Step 1: ✓ Анализиране на профила       │
│  Step 2: ✓ Изчисляване на Life Path     │
│  Step 3: ● Генериране на прозрения...   │  ← pulsing gold dot
│  Step 4: ○ Създаване на плана           │
│                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━ 65%             │
│                                          │
│  "Знаеше ли? Хората с твоя профил       │
│   постигат 3x по-бързо целите си        │
│   когато имат ясен план."               │  ← rotating tips
│                                          │
└──────────────────────────────────────────┘
```

- Steps appear one by one with checkmark animation
- Progress bar fills smoothly
- Rotating "Did you know?" tips (builds value for the paid offer)
- After completion → auto-redirect to Results Preview

---

### 3.4 Results Preview (`/[locale]/results/[id]/page.tsx`)

The highest-converting page in the funnel. User just invested 7 minutes and is emotionally primed.

```
┌──────────────────────────────────────────┐
│  Nav: ◆ ABUNDANCE              [BG/EN]   │
├──────────────────────────────────────────┤
│                                          │
│  ТВОЯТ ПРОФИЛ                ← Gold label│
│                                          │
│  Иван, ти си                             │
│  Генератор 5/1               ← big badge │
│  Life Path: 8                            │
│                                          │
│  ┌──────────────────────────┐            │
│  │    RADAR CHART            │            │
│  │    7 areas visualized     │            │
│  │    Gold lines, animated   │            │
│  │    countUp scores         │            │
│  └──────────────────────────┘            │
│                                          │
│  КЛЮЧОВИ ПРОЗРЕНИЯ           ← Gold label│
│                                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │Финанси  │ │Бизнес   │ │🔒Здраве │   │
│  │Score: 7 │ │Score: 5 │ │ Locked  │   │
│  │1 insight│ │1 insight│ │ Upgrade │   │
│  │ visible │ │ visible │ │ to see  │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━        │
│                                          │
│  🔓 ОТКЛЮЧИ ПЪЛНИЯ АНАЛИЗ              │
│                                          │
│  Пълен доклад + 90-дневен план          │
│  за само €37                             │
│                                          │
│  [Отключи Пълния Доклад →]  ← Gold CTA  │
│                                          │
│  "или продължи с безплатния"  ← ghost    │
│                                          │
└──────────────────────────────────────────┘
```

- Top 3 priority areas show 1 teaser insight each (visible)
- Remaining 4 areas are locked/blurred with upgrade prompt
- Radar chart animates on load with countUp numbers
- Prominent upgrade section with urgency ("37 души гледат тази страница")
- "Continue with free" ghost link → goes to Thank You page

---

### 3.5 VSL / Thank You (`/[locale]/thank-you/page.tsx`)

```
┌──────────────────────────────────────────┐
│                                          │
│  ПОЗДРАВЛЕНИЯ                ← Gold label│
│                                          │
│  Диагностиката ти е на       ← heading  │
│  път към теб.                            │
│                                          │
│  ┌──────────────────────────┐            │
│  │     VIDEO PLAYER          │            │
│  │     (VSL embed)           │            │
│  │     16:9 ratio            │            │
│  └──────────────────────────┘            │
│                                          │
│  Провери inbox-а си за [email]           │
│                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━        │
│                                          │
│  ИСКАШ ПОВЕЧЕ?               ← Gold     │
│                                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ FREE    │ │ ПЪЛЕН   │ │COACHING │   │
│  │ Teaser  │ │ ДОКЛАД  │ │ VIP     │   │
│  │ PDF     │ │ €37     │ │ €697+   │   │
│  │ ✓ Incl  │ │ Popular │ │ Limited │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                          │
│  Enterprise-ui pricing cards pattern     │
│  Gold "Most Popular" badge on mid-tier   │
│                                          │
└──────────────────────────────────────────┘
```

---

## 4. Database Schema

### submissions
```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Contact
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_phone VARCHAR(50),
  locale VARCHAR(5) DEFAULT 'bg',

  -- Life Audit Scores
  scores JSONB NOT NULL DEFAULT '{
    "finances": 0, "business": 0, "health": 0,
    "mental": 0, "romantic": 0, "social": 0, "mission": 0
  }',

  -- Priorities & Goals
  priority_top3 TEXT[],
  goals JSONB,

  -- Core Code (Birth Data)
  birth_date DATE,
  birth_time TIME,
  birth_time_unknown BOOLEAN DEFAULT false,
  birth_city VARCHAR(255),
  birth_country VARCHAR(255),

  -- Segmentation
  commitment_level VARCHAR(50),
  income_level VARCHAR(50),

  -- UTM Tracking
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  referral_code VARCHAR(255),

  -- Processing
  status VARCHAR(50) DEFAULT 'pending',
  analysis_result JSONB,
  pdf_url TEXT,
  email_sent BOOLEAN DEFAULT false,

  -- Value Ladder
  tier VARCHAR(50) DEFAULT 'free',
  payment_status VARCHAR(50),
  stripe_session_id VARCHAR(255),

  -- GDPR
  gdpr_consent BOOLEAN DEFAULT false,
  gdpr_consent_at TIMESTAMP,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_submissions_email ON submissions(user_email);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_created ON submissions(created_at);
```

### email_logs
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

### payments
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

### POST `/api/webhook/quiz`
- Receives quiz submission from frontend
- Validates with Zod schema
- Saves to Supabase `submissions` table
- Triggers async processing (analysis + PDF + email)
- Returns `{ success: true, submissionId: uuid }`

### POST `/api/generate-analysis`
- Input: `{ submission_id: uuid }`
- Fetches submission data from Supabase
- Calls OpenAI GPT-4 with structured prompt
- Expected response JSON:
  ```json
  {
    "hd_type_profile": "Генератор 5/1",
    "hd_strategy": "Да Откликваш",
    "life_path_number": "8",
    "astro_triad": "Слънце в Овен, Луна в Телец, Асцендент Везни",
    "teaser_insights": {
      "finances": "One-line teaser for free tier",
      "business": "One-line teaser",
      ...
    },
    "full_analysis": {
      "hd_analysis_text": "Full HD analysis (paid)",
      "life_path_analysis_text": "Full numerology (paid)",
      "astro_analysis_text": "Full astro (paid)",
      "area_deep_dives": { ... },
      "phase1_plan": "Days 1-30 action plan",
      "phase2_plan": "Days 31-60 action plan",
      "phase3_plan": "Days 61-90 action plan"
    }
  }
  ```
- Updates submission with `analysis_result` JSONB

### POST `/api/generate-pdf`
- Input: `{ submission_id: uuid, tier: 'free' | 'paid' }`
- Free tier: teaser PDF (profile type + radar chart + 1 insight per area)
- Paid tier: full PDF (all analysis + 90-day plan)
- Generates with @react-pdf/renderer (branded, Bold Luxury themed)
- Uploads to Cloudinary
- Updates `pdf_url` in submissions

### POST `/api/send-email`
- Input: `{ submission_id: uuid, email_type: 'welcome' | 'nurture_N' }`
- SendGrid for transactional (welcome + PDF attachment)
- Also adds to ConvertKit with tags for automation
- Bold Luxury email templates (black bg, gold accents)

---

## 6. i18n Strategy

Using `next-intl` with App Router:

### Routing
```
/bg/             → Bulgarian landing page (default)
/en/             → English landing page
/bg/diagnose     → Bulgarian quiz
/en/diagnose     → English quiz
```

### File Structure
```
src/i18n/messages/
  bg.json       → All Bulgarian strings
  en.json       → All English strings
```

### Key Namespaces
```json
{
  "nav": { ... },
  "hero": { ... },
  "problem": { ... },
  "howItWorks": { ... },
  "forWho": { ... },
  "faq": { ... },
  "cta": { ... },
  "footer": { ... },
  "quiz": { ... },
  "processing": { ... },
  "results": { ... },
  "thankYou": { ... },
  "emails": { ... },
  "common": { ... }
}
```

---

## 7. Component Inventory

### Landing Page Components
- `Navbar` — sticky black nav with gold CTA
- `Hero` — full viewport, particles, dual CTAs
- `SocialProofStrip` — methodology logos
- `ProblemSection` — 3 pain-point cards
- `HowItWorks` — 3 gold-numbered steps
- `ForWho` — 4 tabbed audience cards
- `FAQ` — accordion with gold chevrons
- `FinalCTA` — gold gradient section
- `Footer` — multi-column enterprise footer

### Quiz Components
- `QuizShell` — full-screen wrapper, progress bar, navigation
- `QuizProgress` — gold progress bar
- `WelcomeScreen` — opt-in form
- `LifeAuditScreen` — 7 sliders
- `PriorityScreen` — multi-select cards
- `GoalsScreen` — conditional sliders
- `BirthDataScreen` — date/time/location inputs
- `CommitmentScreen` — 3 choice cards
- `IncomeScreen` — 5 option pills
- `ConfirmationScreen` — summary + submit

### Results Components
- `ProfileBadge` — type display (e.g., "Генератор 5/1")
- `RadarChart` — 7-area spider chart (Recharts)
- `InsightCard` — single area insight (visible or locked)
- `UpgradeSection` — pricing + CTA
- `PricingCard` — enterprise-ui style tier card

### Shared Components
- `Button` — primary/secondary/ghost variants
- `Card` — dark card with optional gold accent
- `Section` — label + heading + content wrapper
- `GoldLabel` — the uppercase gold section label
- `Slider` — custom range input with gold thumb
- `LanguageSwitcher` — BG/EN toggle
- `CookieConsent` — GDPR banner
- `SEOHead` — meta tags per page

---

## 8. Deployment & Infrastructure

### Environment Variables
```
# Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI
OPENAI_API_KEY=

# Email
SENDGRID_API_KEY=
CONVERTKIT_API_KEY=

# Storage
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Tracking
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_FB_PIXEL_ID=

# Internal
INTERNAL_API_KEY=
```

### Deployment
- Hosting: Vercel
- Domain: codeabundance.com
- SSL: automatic (Vercel)
- Region: EU (fra1) for GDPR

### Monthly Cost Estimate
| Service | MVP | Scale (10k users) |
|---------|-----|-------------------|
| Vercel Pro | €20 | €20 |
| Supabase Pro | €25 | €75 |
| SendGrid | €0 | €20 |
| ConvertKit | €29 | €79 |
| OpenAI API | €10 | €100 |
| Cloudinary | €0 | €25 |
| **Total** | **~€84/mo** | **~€319/mo** |

Note: Removed Typeform cost (€25/mo) by building custom quiz.
