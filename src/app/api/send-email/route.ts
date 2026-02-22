import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/sendgrid";
import { sendEmailSchema, type AnalysisResult, type LifeArea } from "@/lib/schemas";

// ============================================================
// Bold Luxury email template builder
// ============================================================

function buildEmailHtml({
  title,
  preheader,
  bodyHtml,
  ctaText,
  ctaUrl,
  locale,
}: {
  title: string;
  preheader: string;
  bodyHtml: string;
  ctaText?: string;
  ctaUrl?: string;
  locale: string;
}) {
  const year = new Date().getFullYear();
  const footerText =
    locale === "bg"
      ? `&copy; ${year} CODE: ABUNDANCE. Всички права запазени.`
      : `&copy; ${year} CODE: ABUNDANCE. All rights reserved.`;

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #000000; font-family: 'Helvetica Neue', Arial, sans-serif; }
    .wrapper { max-width: 600px; margin: 0 auto; background-color: #0A0A0A; }
    .header { padding: 32px 24px; text-align: center; border-bottom: 1px solid #1F1F1F; }
    .logo { color: #C9A84C; font-size: 24px; font-weight: 700; letter-spacing: 2px; text-decoration: none; }
    .diamond { color: #C9A84C; margin-right: 8px; }
    .content { padding: 40px 24px; }
    .gold-label { color: #C9A84C; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
    h1 { color: #FFFFFF; font-size: 28px; font-weight: 700; margin: 0 0 16px 0; line-height: 1.3; }
    h2 { color: #FFFFFF; font-size: 22px; font-weight: 600; margin: 32px 0 12px 0; }
    p { color: #9CA3AF; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0; }
    .insight-card { background-color: #1A1A1A; border: 1px solid #1F1F1F; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
    .insight-area { color: #C9A84C; font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; }
    .insight-text { color: #FFFFFF; font-size: 15px; margin: 0; }
    .profile-badge { display: inline-block; background-color: #1A1A1A; border: 2px solid #C9A84C; border-radius: 12px; padding: 12px 24px; margin: 16px 0; }
    .profile-type { color: #C9A84C; font-size: 20px; font-weight: 700; margin: 0; }
    .profile-sub { color: #9CA3AF; font-size: 14px; margin: 4px 0 0 0; }
    .cta-section { text-align: center; padding: 32px 0; }
    .cta-button { display: inline-block; background-color: #C9A84C; color: #000000; font-size: 16px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; }
    .divider { border: 0; border-top: 1px solid #1F1F1F; margin: 32px 0; }
    .footer { padding: 24px; text-align: center; border-top: 1px solid #1F1F1F; }
    .footer p { color: #6B7280; font-size: 12px; }
    .preheader { display: none; max-height: 0; overflow: hidden; }
  </style>
</head>
<body>
  <span class="preheader">${preheader}</span>
  <div class="wrapper">
    <div class="header">
      <a href="#" class="logo"><span class="diamond">&#9670;</span>ABUNDANCE</a>
    </div>
    <div class="content">
      ${bodyHtml}
      ${
        ctaText && ctaUrl
          ? `<div class="cta-section">
              <a href="${ctaUrl}" class="cta-button">${ctaText}</a>
            </div>`
          : ""
      }
    </div>
    <div class="footer">
      <p>${footerText}</p>
    </div>
  </div>
</body>
</html>`;
}

// ============================================================
// Email content builders per type
// ============================================================

const AREA_LABELS_BG: Record<LifeArea, string> = {
  finances: "Финанси",
  business: "Бизнес",
  health: "Здраве",
  mental: "Ментално здраве",
  romantic: "Романтика",
  social: "Социален живот",
  mission: "Мисия",
};

const AREA_LABELS_EN: Record<LifeArea, string> = {
  finances: "Finances",
  business: "Business",
  health: "Health",
  mental: "Mental Health",
  romantic: "Romance",
  social: "Social Life",
  mission: "Mission",
};

function buildWelcomeEmail(
  submission: Record<string, unknown>,
  analysis: AnalysisResult,
  resultsUrl: string
) {
  const locale = (submission.locale as string) ?? "bg";
  const name = submission.user_name as string;
  const isBg = locale === "bg";
  const areaLabels = isBg ? AREA_LABELS_BG : AREA_LABELS_EN;

  const insightsHtml = Object.entries(analysis.teaser_insights)
    .map(
      ([area, text]) => `
      <div class="insight-card">
        <p class="insight-area">${areaLabels[area as LifeArea] ?? area}</p>
        <p class="insight-text">${text}</p>
      </div>`
    )
    .join("");

  const bodyHtml = `
    <p class="gold-label">${isBg ? "ТВОЯТ РЕЗУЛТАТ" : "YOUR RESULTS"}</p>
    <h1>${isBg ? `${name}, диагностиката ти е готова.` : `${name}, your diagnostic is ready.`}</h1>
    <p>${
      isBg
        ? "Благодарим ти, че попълни диагностиката CODE: ABUNDANCE. Ето обобщение на твоя профил:"
        : "Thank you for completing the CODE: ABUNDANCE diagnostic. Here is your profile summary:"
    }</p>

    <div class="profile-badge">
      <p class="profile-type">${analysis.hd_type_profile}</p>
      <p class="profile-sub">Life Path: ${analysis.life_path_number} &bull; ${analysis.astro_triad}</p>
    </div>

    <h2>${isBg ? "Ключови прозрения" : "Key Insights"}</h2>
    ${insightsHtml}

    <hr class="divider" />
    <p>${
      isBg
        ? "Това е само обобщение. Пълният доклад включва детайлен Human Design анализ, нумерология, астрологичен профил и персонализиран 90-дневен план за действие."
        : "This is just the summary. The full report includes detailed Human Design analysis, numerology, astrological profile, and a personalized 90-day action plan."
    }</p>`;

  return buildEmailHtml({
    title: isBg ? "Твоята CODE: ABUNDANCE диагностика" : "Your CODE: ABUNDANCE Diagnostic",
    preheader: isBg
      ? `${name}, ти си ${analysis.hd_type_profile}. Виж пълните резултати.`
      : `${name}, you are a ${analysis.hd_type_profile}. See your full results.`,
    bodyHtml,
    ctaText: isBg ? "Виж Пълните Резултати →" : "See Full Results →",
    ctaUrl: resultsUrl,
    locale,
  });
}

function buildNurtureEmail(
  submission: Record<string, unknown>,
  emailType: string
) {
  const locale = (submission.locale as string) ?? "bg";
  const name = submission.user_name as string;
  const isBg = locale === "bg";

  const nurtureContent: Record<string, { subject: string; heading: string; body: string; cta: string }> = {
    nurture_1: {
      subject: isBg ? "Прочете ли доклада си?" : "Have you read your report?",
      heading: isBg ? `${name}, видя ли какво открихме?` : `${name}, did you see what we found?`,
      body: isBg
        ? "Твоят безплатен анализ разкрива само повърхността. Пълният доклад съдържа детайлен Human Design профил, нумерологичен анализ и персонализиран 90-дневен план за действие — специално създаден за теб."
        : "Your free analysis only scratches the surface. The full report contains a detailed Human Design profile, numerology analysis, and a personalized 90-day action plan — created specifically for you.",
      cta: isBg ? "Отключи Пълния Доклад →" : "Unlock Full Report →",
    },
    nurture_2: {
      subject: isBg ? "Цената на бездействието" : "The cost of staying stuck",
      heading: isBg ? "Какво ти коства да останеш на място?" : "What is staying stuck costing you?",
      body: isBg
        ? "Всеки ден без ясна посока е ден, в който потенциалът ти остава неизползван. Хората с твоя профил, които следват персонализиран план, постигат 3 пъти по-бърз прогрес в рамките на 90 дни."
        : "Every day without clear direction is a day your potential remains untapped. People with your profile who follow a personalized plan achieve 3x faster progress within 90 days.",
      cta: isBg ? "Вземи Своя План →" : "Get Your Plan →",
    },
    nurture_3: {
      subject: isBg ? "Как Мария постигна целите си за 60 дни" : "How Maria achieved her goals in 60 days",
      heading: isBg ? "Реална история на трансформация" : "A real transformation story",
      body: isBg
        ? "Мария беше точно като теб — усещаше, че нещо не е наред, но не знаеше откъде да започне. След като получи пълния си CODE: ABUNDANCE доклад, тя следва плана стъпка по стъпка и постигна финансовите си цели за 60 дни. Ограничен брой места за тази оферта."
        : "Maria was just like you — she felt something was off but didn't know where to start. After getting her full CODE: ABUNDANCE report, she followed the plan step by step and achieved her financial goals in 60 days. Limited spots available for this offer.",
      cta: isBg ? "Виж Офертата →" : "See the Offer →",
    },
    nurture_4: {
      subject: isBg ? "Последен шанс: персонален коучинг" : "Last chance: personal coaching",
      heading: isBg ? "Готов ли си за следващото ниво?" : "Ready for the next level?",
      body: isBg
        ? "За хора като теб, които са готови да действат сериозно, предлагаме 1-на-1 коучинг програма с персонализиран roadmap базиран на твоя CODE: ABUNDANCE профил. Местата са ограничени."
        : "For people like you who are ready to take serious action, we offer a 1-on-1 coaching program with a personalized roadmap based on your CODE: ABUNDANCE profile. Spots are limited.",
      cta: isBg ? "Запази Място →" : "Reserve Your Spot →",
    },
    nurture_5: {
      subject: isBg ? "Финална покана" : "Final invitation",
      heading: isBg ? `${name}, това е последната покана.` : `${name}, this is the final invitation.`,
      body: isBg
        ? "Тази оферта изтича утре. Ако чувстваш, че е време за промяна, сега е моментът. Не позволявай на страха да те спре. Твоят CODE: ABUNDANCE профил показва огромен потенциал — нужно е само да направиш първата стъпка."
        : "This offer expires tomorrow. If you feel it's time for change, now is the moment. Don't let fear hold you back. Your CODE: ABUNDANCE profile shows enormous potential — all you need is to take the first step.",
      cta: isBg ? "Вземи Решение Сега →" : "Decide Now →",
    },
  };

  const content = nurtureContent[emailType] ?? nurtureContent.nurture_1;

  const bodyHtml = `
    <p class="gold-label">${isBg ? "CODE: ABUNDANCE" : "CODE: ABUNDANCE"}</p>
    <h1>${content.heading}</h1>
    <p>${content.body}</p>`;

  return {
    subject: content.subject,
    html: buildEmailHtml({
      title: content.subject,
      preheader: content.heading,
      bodyHtml,
      ctaText: content.cta,
      ctaUrl: "#", // TODO: replace with actual upgrade/booking URL
      locale,
    }),
  };
}

// ============================================================
// Route handler
// ============================================================

export async function POST(request: Request) {
  try {
    // --- Validate input ---
    const body = await request.json();
    const parsed = sendEmailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { submission_id, email_type } = parsed.data;

    // --- Fetch submission ---
    const { data: submission, error: fetchError } = await getSupabaseAdmin()
      .from("submissions")
      .select("*")
      .eq("id", submission_id)
      .single();

    if (fetchError || !submission) {
      return NextResponse.json(
        { success: false, error: "Submission not found" },
        { status: 404 }
      );
    }

    const locale = (submission.locale as string) ?? "bg";
    const isBg = locale === "bg";
    let subject: string;
    let html: string;

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    if (email_type === "welcome") {
      const analysis = submission.analysis_result as AnalysisResult | null;
      if (!analysis) {
        return NextResponse.json(
          { success: false, error: "Analysis not yet completed — cannot send welcome email" },
          { status: 400 }
        );
      }

      const resultsUrl = `${baseUrl}/${locale}/results/${submission_id}`;
      subject = isBg
        ? `${submission.user_name}, твоята диагностика е готова ✦`
        : `${submission.user_name}, your diagnostic is ready ✦`;
      html = buildWelcomeEmail(submission, analysis, resultsUrl);
    } else {
      const nurture = buildNurtureEmail(submission, email_type);
      subject = nurture.subject;
      html = nurture.html;
    }

    // --- Send via SendGrid ---
    try {
      await sendEmail({
        to: submission.user_email as string,
        subject,
        html,
      });
    } catch (emailError) {
      console.error("SendGrid error:", emailError);
      return NextResponse.json(
        { success: false, error: "Failed to send email" },
        { status: 502 }
      );
    }

    // --- Log email send ---
    await getSupabaseAdmin().from("email_logs").insert({
      submission_id,
      email_type,
      locale,
    });

    // --- Mark email_sent on submission for welcome ---
    if (email_type === "welcome") {
      await getSupabaseAdmin()
        .from("submissions")
        .update({ email_sent: true })
        .eq("id", submission_id);
    }

    return NextResponse.json({
      success: true,
      submission_id,
      email_type,
      sent_to: submission.user_email,
    });
  } catch (error) {
    console.error("Send email error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
