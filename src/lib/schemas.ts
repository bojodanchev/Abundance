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
  birth_date: z.string().min(1), // ISO date string "YYYY-MM-DD"
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
// Analysis Result Shape (from OpenAI)
// ============================================================

export interface AnalysisResult {
  hd_type_profile: string;
  hd_strategy: string;
  life_path_number: string;
  astro_triad: string;
  teaser_insights: Record<LifeArea, string>;
  full_analysis: {
    hd_analysis_text: string;
    life_path_analysis_text: string;
    astro_analysis_text: string;
    phase1_plan: string;
    phase2_plan: string;
    phase3_plan: string;
  };
}
