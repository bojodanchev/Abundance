import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import type { AnalysisResult, LifeArea } from "@/lib/schemas";

// ============================================================
// Design Tokens — Bold Luxury
// ============================================================

const C = {
  bg: "#0A0A0A",
  card: "#1A1A1A",
  border: "#1F1F1F",
  gold: "#C9A84C",
  goldMuted: "#A08535",
  white: "#FFFFFF",
  body: "#9CA3AF",
  dark: "#111111",
} as const;

// ============================================================
// Styles
// ============================================================

const s = StyleSheet.create({
  // Page
  page: {
    backgroundColor: C.bg,
    paddingHorizontal: 48,
    paddingVertical: 56,
    fontFamily: "Helvetica",
    color: C.body,
  },

  // Cover
  coverPage: {
    backgroundColor: C.bg,
    paddingHorizontal: 48,
    paddingVertical: 0,
    fontFamily: "Helvetica",
    color: C.body,
    justifyContent: "center",
    alignItems: "center",
  },
  coverDiamond: {
    fontSize: 48,
    color: C.gold,
    marginBottom: 12,
  },
  coverTitle: {
    fontSize: 36,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
    letterSpacing: 8,
    marginBottom: 6,
  },
  coverSubtitle: {
    fontSize: 14,
    color: C.body,
    letterSpacing: 4,
    marginBottom: 48,
  },
  coverDivider: {
    width: 80,
    height: 1,
    backgroundColor: C.gold,
    marginBottom: 40,
  },
  coverName: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    marginBottom: 24,
  },
  coverBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: C.gold,
    borderRadius: 8,
    marginBottom: 16,
  },
  coverBadgeText: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
  },
  coverMeta: {
    fontSize: 12,
    color: C.body,
    marginTop: 6,
  },
  coverMetaValue: {
    color: C.gold,
    fontFamily: "Helvetica-Bold",
  },

  // Section headers
  sectionLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
    letterSpacing: 4,
    textTransform: "uppercase" as const,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    marginBottom: 24,
  },

  // Score bars
  scoreRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    marginBottom: 14,
  },
  scoreLabel: {
    width: 90,
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.white,
  },
  scoreBarBg: {
    flex: 1,
    height: 14,
    backgroundColor: C.card,
    borderRadius: 7,
    overflow: "hidden" as const,
  },
  scoreBar: {
    height: 14,
    backgroundColor: C.gold,
    borderRadius: 7,
  },
  scoreValue: {
    width: 36,
    textAlign: "right" as const,
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
  },

  // Insight cards
  insightCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  insightArea: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
    marginBottom: 6,
    letterSpacing: 1,
    textTransform: "uppercase" as const,
  },
  insightText: {
    fontSize: 11,
    color: C.body,
    lineHeight: 1.6,
  },

  // CTA
  ctaBox: {
    backgroundColor: C.card,
    borderWidth: 2,
    borderColor: C.gold,
    borderRadius: 12,
    padding: 32,
    alignItems: "center" as const,
    marginTop: 40,
  },
  ctaTitle: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    marginBottom: 12,
  },
  ctaDesc: {
    fontSize: 12,
    color: C.body,
    textAlign: "center" as const,
    marginBottom: 20,
    lineHeight: 1.6,
  },
  ctaButton: {
    backgroundColor: C.gold,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: C.bg,
  },
  ctaUrl: {
    fontSize: 10,
    color: C.goldMuted,
    marginTop: 16,
  },

  // Full analysis text
  analysisText: {
    fontSize: 11,
    color: C.body,
    lineHeight: 1.7,
    marginBottom: 12,
  },

  // Plan phases
  phaseCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
  },
  phaseHeader: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    marginBottom: 12,
  },
  phaseBadge: {
    backgroundColor: C.gold,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 10,
  },
  phaseBadgeText: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.bg,
  },
  phaseTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: C.white,
  },
  phaseText: {
    fontSize: 11,
    color: C.body,
    lineHeight: 1.7,
  },

  // Footer
  footer: {
    position: "absolute" as const,
    bottom: 24,
    left: 48,
    right: 48,
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
  },
  footerText: {
    fontSize: 8,
    color: "#4A4A4A",
  },
  footerGold: {
    fontSize: 8,
    color: C.goldMuted,
  },
});

// ============================================================
// Area label mapping
// ============================================================

const AREA_LABELS: Record<LifeArea, string> = {
  finances: "Finances",
  business: "Business",
  health: "Health",
  mental: "Mental",
  romantic: "Romantic",
  social: "Social",
  mission: "Mission",
};

// ============================================================
// Submission shape (subset we need)
// ============================================================

export interface PdfSubmission {
  id: string;
  user_name: string;
  user_email: string;
  scores: Record<LifeArea, number>;
  priority_top3: LifeArea[];
  analysis_result: AnalysisResult;
}

interface Props {
  submission: PdfSubmission;
  tier: "free" | "paid";
}

// ============================================================
// Reusable: Page Footer
// ============================================================

function PageFooter({ pageNum }: { pageNum?: number }) {
  return (
    <View style={s.footer}>
      <Text style={s.footerText}>CODE: ABUNDANCE</Text>
      {pageNum && <Text style={s.footerText}>{pageNum}</Text>}
      <Text style={s.footerGold}>codeabundance.com</Text>
    </View>
  );
}

// ============================================================
// Cover Page
// ============================================================

function CoverPage({ submission }: { submission: PdfSubmission }) {
  const analysis = submission.analysis_result;

  return (
    <Page size="A4" style={s.coverPage}>
      <Text style={s.coverDiamond}>&#9670;</Text>
      <Text style={s.coverTitle}>CODE: ABUNDANCE</Text>
      <Text style={s.coverSubtitle}>PERSONAL REPORT</Text>
      <View style={s.coverDivider} />
      <Text style={s.coverName}>{submission.user_name}</Text>
      <View style={s.coverBadge}>
        <Text style={s.coverBadgeText}>{analysis.hd_type_profile}</Text>
      </View>
      <Text style={s.coverMeta}>
        Life Path:{" "}
        <Text style={s.coverMetaValue}>{analysis.life_path_number}</Text>
      </Text>
      <Text style={s.coverMeta}>
        Astro Triad:{" "}
        <Text style={s.coverMetaValue}>{analysis.astro_triad}</Text>
      </Text>
      <PageFooter />
    </Page>
  );
}

// ============================================================
// Scores Page — horizontal bar chart
// ============================================================

function ScoresPage({ submission }: { submission: PdfSubmission }) {
  const scores = submission.scores;

  return (
    <Page size="A4" style={s.page}>
      <Text style={s.sectionLabel}>LIFE AUDIT</Text>
      <Text style={s.sectionTitle}>Your Scores</Text>

      {(Object.keys(AREA_LABELS) as LifeArea[]).map((area) => {
        const score = scores[area] ?? 0;
        const widthPct = `${Math.round((score / 10) * 100)}%`;

        return (
          <View key={area} style={s.scoreRow}>
            <Text style={s.scoreLabel}>{AREA_LABELS[area]}</Text>
            <View style={s.scoreBarBg}>
              <View style={[s.scoreBar, { width: widthPct }]} />
            </View>
            <Text style={s.scoreValue}>{score}/10</Text>
          </View>
        );
      })}

      <PageFooter pageNum={2} />
    </Page>
  );
}

// ============================================================
// Insights Page (teaser — free tier)
// ============================================================

function InsightsPage({ submission }: { submission: PdfSubmission }) {
  const insights = submission.analysis_result.teaser_insights;

  return (
    <Page size="A4" style={s.page}>
      <Text style={s.sectionLabel}>KEY INSIGHTS</Text>
      <Text style={s.sectionTitle}>Your Personal Blueprint</Text>

      {(Object.keys(AREA_LABELS) as LifeArea[]).map((area) => (
        <View key={area} style={s.insightCard}>
          <Text style={s.insightArea}>{AREA_LABELS[area]}</Text>
          <Text style={s.insightText}>{insights[area] ?? "—"}</Text>
        </View>
      ))}

      <PageFooter pageNum={3} />
    </Page>
  );
}

// ============================================================
// CTA Page (free tier)
// ============================================================

function CtaPage() {
  return (
    <Page size="A4" style={[s.page, { justifyContent: "center" }]}>
      <View style={s.ctaBox}>
        <Text style={s.ctaTitle}>Unlock Your Full Report</Text>
        <Text style={s.ctaDesc}>
          Get your complete Human Design analysis, personalized numerology
          reading, full astrological breakdown, and a 90-day action plan
          tailored to your unique blueprint.
        </Text>
        <View style={s.ctaButton}>
          <Text style={s.ctaButtonText}>GET FULL REPORT</Text>
        </View>
        <Text style={s.ctaUrl}>codeabundance.com</Text>
      </View>
      <PageFooter />
    </Page>
  );
}

// ============================================================
// Full Analysis Pages (paid tier)
// ============================================================

function FullAnalysisPage({
  label,
  title,
  text,
  pageNum,
}: {
  label: string;
  title: string;
  text: string;
  pageNum: number;
}) {
  // Split into paragraphs for better readability
  const paragraphs = text.split("\n").filter((p) => p.trim().length > 0);

  return (
    <Page size="A4" style={s.page}>
      <Text style={s.sectionLabel}>{label}</Text>
      <Text style={s.sectionTitle}>{title}</Text>

      {paragraphs.map((paragraph, i) => (
        <Text key={i} style={s.analysisText}>
          {paragraph}
        </Text>
      ))}

      <PageFooter pageNum={pageNum} />
    </Page>
  );
}

// ============================================================
// 90-Day Action Plan Page (paid tier)
// ============================================================

function ActionPlanPage({
  fullAnalysis,
  pageNum,
}: {
  fullAnalysis: AnalysisResult["full_analysis"];
  pageNum: number;
}) {
  const phases = [
    { badge: "PHASE 1", title: "Days 1 - 30", text: fullAnalysis.phase1_plan },
    { badge: "PHASE 2", title: "Days 31 - 60", text: fullAnalysis.phase2_plan },
    { badge: "PHASE 3", title: "Days 61 - 90", text: fullAnalysis.phase3_plan },
  ];

  return (
    <Page size="A4" style={s.page}>
      <Text style={s.sectionLabel}>YOUR ROADMAP</Text>
      <Text style={s.sectionTitle}>90-Day Action Plan</Text>

      {phases.map((phase, i) => (
        <View key={i} style={s.phaseCard}>
          <View style={s.phaseHeader}>
            <View style={s.phaseBadge}>
              <Text style={s.phaseBadgeText}>{phase.badge}</Text>
            </View>
            <Text style={s.phaseTitle}>{phase.title}</Text>
          </View>
          <Text style={s.phaseText}>{phase.text}</Text>
        </View>
      ))}

      <PageFooter pageNum={pageNum} />
    </Page>
  );
}

// ============================================================
// Executive Summary Page (V2 — paid tier)
// ============================================================

function ExecutiveSummaryPage({ analysis, pageNum }: { analysis: AnalysisResult; pageNum: number }) {
  if (!analysis.executive_summary) return null;
  const { soul_contract, key_values, current_timing } = analysis.executive_summary;

  return (
    <Page size="A4" style={s.page}>
      <Text style={s.sectionLabel}>EXECUTIVE SUMMARY</Text>
      <Text style={s.sectionTitle}>Your Soul Contract</Text>
      <Text style={s.analysisText}>{soul_contract}</Text>

      {key_values.length > 0 && (
        <View style={s.insightCard}>
          <Text style={s.insightArea}>KEY VALUES</Text>
          <Text style={s.insightText}>{key_values.join(" • ")}</Text>
        </View>
      )}

      <View style={s.insightCard}>
        <Text style={s.insightArea}>CURRENT TIMING</Text>
        <Text style={s.insightText}>{current_timing}</Text>
      </View>

      <PageFooter pageNum={pageNum} />
    </Page>
  );
}

// ============================================================
// Synthesis Page (V2 — paid tier)
// ============================================================

function SynthesisPage({ analysis, pageNum }: { analysis: AnalysisResult; pageNum: number }) {
  if (!analysis.synthesis) return null;
  const { pattern, confirmations, tensions, behavioral_alignment } = analysis.synthesis;

  return (
    <Page size="A4" style={s.page}>
      <Text style={s.sectionLabel}>SYNTHESIS</Text>
      <Text style={s.sectionTitle}>Framework Integration</Text>
      <Text style={s.analysisText}>{pattern}</Text>

      {confirmations.length > 0 && (
        <View style={s.insightCard}>
          <Text style={s.insightArea}>CONFIRMATIONS</Text>
          {confirmations.map((c, i) => (
            <Text key={i} style={s.insightText}>• {c}</Text>
          ))}
        </View>
      )}

      {tensions.length > 0 && (
        <View style={s.insightCard}>
          <Text style={s.insightArea}>CREATIVE TENSIONS</Text>
          {tensions.map((t, i) => (
            <Text key={i} style={s.insightText}>• {t}</Text>
          ))}
        </View>
      )}

      <Text style={s.analysisText}>{behavioral_alignment}</Text>
      <PageFooter pageNum={pageNum} />
    </Page>
  );
}

// ============================================================
// Timing Page (V2 — paid tier)
// ============================================================

function TimingPage({ analysis, pageNum }: { analysis: AnalysisResult; pageNum: number }) {
  if (!analysis.timing) return null;
  const { personal_year, universal, chinese_year, next_30_days } = analysis.timing;

  return (
    <Page size="A4" style={s.page}>
      <Text style={s.sectionLabel}>TIMING ANALYSIS</Text>
      <Text style={s.sectionTitle}>Your Current Cycles</Text>

      <View style={s.insightCard}>
        <Text style={s.insightArea}>PERSONAL YEAR {personal_year.number}: {personal_year.theme}</Text>
        <Text style={s.insightText}>Best: {personal_year.best.join(", ")}</Text>
        <Text style={s.insightText}>Avoid: {personal_year.avoid.join(", ")}</Text>
      </View>

      <View style={s.insightCard}>
        <Text style={s.insightArea}>UNIVERSAL TIMING</Text>
        <Text style={s.insightText}>Year {universal.year}, Month {universal.month}: {universal.combined_theme}</Text>
      </View>

      <View style={s.insightCard}>
        <Text style={s.insightArea}>CHINESE YEAR: {chinese_year.element} {chinese_year.animal}</Text>
        <Text style={s.insightText}>{chinese_year.implications}</Text>
      </View>

      <View style={s.insightCard}>
        <Text style={s.insightArea}>NEXT 30 DAYS</Text>
        <Text style={s.insightText}>{next_30_days}</Text>
      </View>

      <PageFooter pageNum={pageNum} />
    </Page>
  );
}

// ============================================================
// Daily Practices Page (V2 — paid tier)
// ============================================================

function DailyPracticesPage({ analysis, pageNum }: { analysis: AnalysisResult; pageNum: number }) {
  if (!analysis.daily_practices) return null;
  const { morning, checkpoints, evening } = analysis.daily_practices;

  return (
    <Page size="A4" style={s.page}>
      <Text style={s.sectionLabel}>DAILY ALIGNMENT</Text>
      <Text style={s.sectionTitle}>Your Daily Practices</Text>

      <View style={s.insightCard}>
        <Text style={s.insightArea}>MORNING RITUAL</Text>
        {morning.map((step, i) => (
          <Text key={i} style={s.insightText}>• {step}</Text>
        ))}
      </View>

      <View style={s.insightCard}>
        <Text style={s.insightArea}>AUTHORITY CHECKPOINTS</Text>
        {checkpoints.map((cp, i) => (
          <Text key={i} style={s.insightText}>• {cp}</Text>
        ))}
      </View>

      <View style={s.insightCard}>
        <Text style={s.insightArea}>EVENING REVIEW</Text>
        {evening.map((step, i) => (
          <Text key={i} style={s.insightText}>• {step}</Text>
        ))}
      </View>

      <PageFooter pageNum={pageNum} />
    </Page>
  );
}

// ============================================================
// Integration Page (V2 — paid tier)
// ============================================================

function IntegrationPage({ analysis, pageNum }: { analysis: AnalysisResult; pageNum: number }) {
  if (!analysis.integration_statement) return null;

  return (
    <Page size="A4" style={[s.page, { justifyContent: "center" }]}>
      <View style={{ alignItems: "center" }}>
        <Text style={[s.coverDiamond, { marginBottom: 24 }]}>&#9670;</Text>
        <Text style={s.sectionLabel}>INTEGRATION</Text>
        <Text style={[s.sectionTitle, { textAlign: "center", marginBottom: 32 }]}>
          Your Integration Statement
        </Text>
        <Text style={[s.analysisText, { textAlign: "center", fontSize: 13, lineHeight: 1.8 }]}>
          {analysis.integration_statement}
        </Text>
      </View>
      <PageFooter pageNum={pageNum} />
    </Page>
  );
}

// ============================================================
// Main Document
// ============================================================

export function AbundanceReport({ submission, tier }: Props) {
  const isFree = tier === "free";
  const full = submission.analysis_result.full_analysis;
  const analysis = submission.analysis_result;

  // Calculate dynamic page numbers for V2 sections
  let pg = 8; // V1 pages end at 7 (action plan)
  const execSummaryPage = analysis.executive_summary ? pg++ : 0;
  const synthesisPage = analysis.synthesis ? pg++ : 0;
  const timingPage = analysis.timing ? pg++ : 0;
  const dailyPracticesPage = analysis.daily_practices ? pg++ : 0;
  const integrationPage = analysis.integration_statement ? pg++ : 0;

  return (
    <Document
      title={`Code: Abundance — ${submission.user_name}`}
      author="Code: Abundance"
      subject="Personal Life Audit Report"
    >
      {/* Always: Cover + Scores + Insights */}
      <CoverPage submission={submission} />
      <ScoresPage submission={submission} />
      <InsightsPage submission={submission} />

      {isFree ? (
        /* Free tier: CTA page */
        <CtaPage />
      ) : (
        /* Paid tier: full analysis pages */
        <>
          {/* V1 pages */}
          <FullAnalysisPage
            label="HUMAN DESIGN"
            title="Your Human Design Analysis"
            text={full.hd_analysis_text}
            pageNum={4}
          />
          <FullAnalysisPage
            label="NUMEROLOGY"
            title="Your Life Path Analysis"
            text={full.life_path_analysis_text}
            pageNum={5}
          />
          <FullAnalysisPage
            label="ASTROLOGY"
            title="Your Astrological Analysis"
            text={full.astro_analysis_text}
            pageNum={6}
          />
          <ActionPlanPage fullAnalysis={full} pageNum={7} />

          {/* V2 pages (conditionally rendered) */}
          {analysis.executive_summary && <ExecutiveSummaryPage analysis={analysis} pageNum={execSummaryPage} />}
          {analysis.synthesis && <SynthesisPage analysis={analysis} pageNum={synthesisPage} />}
          {analysis.timing && <TimingPage analysis={analysis} pageNum={timingPage} />}
          {analysis.daily_practices && <DailyPracticesPage analysis={analysis} pageNum={dailyPracticesPage} />}
          {analysis.integration_statement && <IntegrationPage analysis={analysis} pageNum={integrationPage} />}
        </>
      )}
    </Document>
  );
}
