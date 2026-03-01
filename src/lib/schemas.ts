import { z } from "zod";

// ============================================================
// Life audit area keys
// ============================================================

export const LIFE_AREAS = [
  "finances",
  "business",
  "health",
  "mental",
  "romantic",
  "social",
  "mission",
] as const;

export type LifeArea = (typeof LIFE_AREAS)[number];

// ============================================================
// Quiz Submission Schema
// ============================================================

const scoreSchema = z.object({
  finances: z.number().min(1).max(10),
  business: z.number().min(1).max(10),
  health: z.number().min(1).max(10),
  mental: z.number().min(1).max(10),
  romantic: z.number().min(1).max(10),
  social: z.number().min(1).max(10),
  mission: z.number().min(1).max(10),
});

const goalSchema = z.record(
  z.string(),
  z.number().min(1).max(10)
);

export const quizSubmissionSchema = z.object({
  // Contact
  user_name: z.string().min(1).max(255),
  user_email: z.string().email().max(255),
  user_phone: z.string().max(50).optional(),
  locale: z.enum(["bg", "en"]).default("bg"),

  // Life Audit
  scores: scoreSchema,

  // Priorities & Goals
  priority_top3: z
    .array(z.enum(LIFE_AREAS))
    .min(1)
    .max(3),
  goals: goalSchema.optional(),

  // Core Code (Birth Data)
  birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD").refine((val) => {
    const d = new Date(val);
    return !isNaN(d.getTime()) && d.toISOString().startsWith(val);
  }, "Invalid date"),
  birth_time: z.string().optional(), // "HH:MM"
  birth_time_unknown: z.boolean().default(false),
  birth_city: z.string().max(255).optional(),
  birth_country: z.string().max(255).optional(),

  // Segmentation
  commitment_level: z.enum(["high", "medium", "low"]),
  income_level: z.enum([
    "under_1000",
    "1000_3000",
    "3000_6000",
    "6000_10000",
    "over_10000",
  ]),

  // UTM Tracking
  utm_source: z.string().max(255).optional(),
  utm_medium: z.string().max(255).optional(),
  utm_campaign: z.string().max(255).optional(),
  referral_code: z.string().max(255).optional(),

  // GDPR
  gdpr_consent: z.literal(true),
});

export type QuizSubmission = z.infer<typeof quizSubmissionSchema>;

// ============================================================
// Generate Analysis Input
// ============================================================

export const generateAnalysisSchema = z.object({
  submission_id: z.string().uuid(),
});

export type GenerateAnalysisInput = z.infer<typeof generateAnalysisSchema>;

// ============================================================
// Generate PDF Input
// ============================================================

export const generatePdfSchema = z.object({
  submission_id: z.string().uuid(),
  tier: z.enum(["free", "paid"]),
});

export type GeneratePdfInput = z.infer<typeof generatePdfSchema>;

// ============================================================
// Send Email Input
// ============================================================

export const sendEmailSchema = z.object({
  submission_id: z.string().uuid(),
  email_type: z.enum([
    "welcome",
    "prelaunch",
    "nurture_1",
    "nurture_2",
    "nurture_3",
    "nurture_4",
    "nurture_5",
  ]),
});

export type SendEmailInput = z.infer<typeof sendEmailSchema>;

// ============================================================
// Create Checkout Input
// ============================================================

export const createCheckoutSchema = z.object({
  submission_id: z.string().uuid(),
  tier: z.enum(["low", "mid", "high"]),
  locale: z.enum(["bg", "en"]).default("bg"),
});

export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>;

// ============================================================
// Create Bump Checkout Input
// ============================================================

export const createBumpCheckoutSchema = z.object({
  submission_id: z.string().uuid(),
  locale: z.enum(["bg", "en"]).default("bg"),
});

export type CreateBumpCheckoutInput = z.infer<typeof createBumpCheckoutSchema>;

// ============================================================
// Lead Capture Input
// ============================================================

export const leadCaptureSchema = z.object({
  user_name: z.string().min(1).max(255),
  user_email: z.string().email().max(255),
  user_phone: z.string().max(50).optional(),
  locale: z.enum(["bg", "en"]).default("bg"),
  source: z.string().max(100), // e.g. "archive-free-analysis", "archive-contact", "archive-strategy"
  message: z.string().max(5000).optional(), // free-text from contact/strategy forms
  extra: z.record(z.string(), z.unknown()).optional(), // any additional metadata
});

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;

// ============================================================
// Analysis Result Shape (from OpenAI) — Zod schema + TS type
// ============================================================

const lifeAreaTeaserSchema = z.object({
  finances: z.string(),
  business: z.string(),
  health: z.string(),
  mental: z.string(),
  romantic: z.string(),
  social: z.string(),
  mission: z.string(),
});

export const analysisResultSchema = z.object({
  // V1 fields (required)
  hd_type_profile: z.string(),
  hd_strategy: z.string(),
  life_path_number: z.string(),
  astro_triad: z.string(),
  teaser_insights: lifeAreaTeaserSchema,
  full_analysis: z.object({
    hd_analysis_text: z.string(),
    life_path_analysis_text: z.string(),
    astro_analysis_text: z.string(),
    phase1_plan: z.string(),
    phase2_plan: z.string(),
    phase3_plan: z.string(),
  }),

  // V2 fields (optional for backward compatibility)
  executive_summary: z.object({
    soul_contract: z.string(),
    key_values: z.array(z.string()),
    current_timing: z.string(),
  }).optional(),
  synthesis: z.object({
    pattern: z.string(),
    confirmations: z.array(z.string()),
    tensions: z.array(z.string()),
    behavioral_alignment: z.string(),
  }).optional(),
  timing: z.object({
    personal_year: z.object({ number: z.number(), theme: z.string(), best: z.array(z.string()), avoid: z.array(z.string()) }),
    universal: z.object({ year: z.number(), month: z.number(), combined_theme: z.string() }),
    chinese_year: z.object({ animal: z.string(), element: z.string(), implications: z.string() }),
    next_30_days: z.string(),
  }).optional(),
  daily_practices: z.object({
    morning: z.array(z.string()),
    checkpoints: z.array(z.string()),
    evening: z.array(z.string()),
  }).optional(),
  integration_statement: z.string().optional(),
  metadata: z.object({
    chinese_zodiac: z.string(),
    personal_year: z.number(),
    universal_year: z.number(),
    confidence_level: z.string(),
  }).optional(),
});

export type AnalysisResult = z.infer<typeof analysisResultSchema>;
