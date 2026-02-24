import type { DiagnosticFormData } from "@/pages/Diagnostic";

// ============================================================
// Maps archive DiagnosticFormData → main app QuizSubmission
// for POST /api/webhook/quiz
// ============================================================

type LifeArea =
  | "finances"
  | "business"
  | "health"
  | "mental"
  | "romantic"
  | "social"
  | "mission";

interface QuizPayload {
  user_name: string;
  user_email: string;
  user_phone?: string;
  locale: "bg" | "en";
  scores: Record<LifeArea, number>;
  priority_top3: LifeArea[];
  goals?: Partial<Record<LifeArea, number>>;
  birth_date: string;
  birth_time?: string;
  birth_time_unknown: boolean;
  birth_city?: string;
  birth_country?: string;
  commitment_level: "high" | "medium" | "low";
  income_level:
    | "under_1000"
    | "1000_3000"
    | "3000_6000"
    | "6000_10000"
    | "over_10000";
  gdpr_consent: true;
}

// Bulgarian sphere labels → English life-area keys
const SPHERE_MAP: Record<string, LifeArea> = {
  "Финанси": "finances",
  "Бизнес": "business",
  "Здраве": "health",
  "Ментално": "mental",
  "Романтика": "romantic",
  "Социални": "social",
  "Мисия": "mission",
};

const INCOME_MAP: Record<string, QuizPayload["income_level"]> = {
  "under_1k": "under_1000",
  "1k-3k": "1000_3000",
  "3k-6k": "3000_6000",
  "6k-10k": "6000_10000",
  "over_10k": "over_10000",
};

export function mapDiagnosticToQuiz(form: DiagnosticFormData): QuizPayload {
  // 1. Scores — flat rating_* fields → grouped object
  const scores: Record<LifeArea, number> = {
    finances: form.rating_finances,
    business: form.rating_business,
    health: form.rating_health,
    mental: form.rating_mental,
    romantic: form.rating_romantic,
    social: form.rating_social,
    mission: form.rating_mission,
  };

  // 2. Priorities — Bulgarian labels → English keys
  const priority_top3 = form.priority_top3
    .map((bg) => SPHERE_MAP[bg])
    .filter((v): v is LifeArea => !!v);

  // 3. Goals — array of {sphere, goal} → Record<LifeArea, number>
  const goals: Partial<Record<LifeArea, number>> = {};
  for (const { sphere, goal } of form.goal_sphere_values) {
    const key = SPHERE_MAP[sphere];
    if (key) goals[key] = goal;
  }

  // 4. Commitment — "High" → "high"
  const commitment_level = form.commitment_level.toLowerCase() as QuizPayload["commitment_level"];

  // 5. Income — archive codes → API codes
  const income_level = INCOME_MAP[form.income_level] ?? "under_1000";

  return {
    user_name: form.user_name,
    user_email: form.user_email,
    user_phone: form.user_phone || undefined,
    locale: "bg",
    scores,
    priority_top3,
    goals: Object.keys(goals).length > 0 ? goals : undefined,
    birth_date: form.birth_date,
    birth_time: form.birth_time || undefined,
    birth_time_unknown: !form.birth_time,
    birth_city: form.birth_city || undefined,
    birth_country: form.birth_country || undefined,
    commitment_level,
    income_level,
    gdpr_consent: true,
  };
}
