import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Diamond, ArrowLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isBg = locale === "bg";

  return {
    title: isBg ? "Политика за поверителност" : "Privacy Policy",
    description: isBg
      ? "Научете как CODE: ABUNDANCE събира, използва и защитава вашите лични данни."
      : "Learn how CODE: ABUNDANCE collects, uses, and protects your personal data.",
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations("privacy");

  return (
    <main className="min-h-screen bg-surface-dark">
      {/* Minimal nav */}
      <nav className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-black/90 backdrop-blur-md border-b border-border">
        <Link href="/" className="flex items-center gap-2 group">
          <Diamond className="w-5 h-5 text-accent transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-display font-bold text-lg tracking-wide text-text-primary">
            ABUNDANCE
          </span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">
  Back
          </span>
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-2">
          {t("title")}
        </h1>
        <p className="text-sm text-text-secondary mb-12 font-mono">
          {t("lastUpdated")}
        </p>

        <div className="space-y-10">
          {/* Introduction */}
          <Section title={t("introTitle")}>
            <p>{t("introText")}</p>
          </Section>

          {/* Data Collected */}
          <Section title={t("dataCollectedTitle")}>
            <p>{t("dataCollectedText")}</p>
            <ul className="mt-3 space-y-2">
              <Li>{t("dataItem1")}</Li>
              <Li>{t("dataItem2")}</Li>
              <Li>{t("dataItem3")}</Li>
              <Li>{t("dataItem4")}</Li>
              <Li>{t("dataItem5")}</Li>
            </ul>
          </Section>

          {/* How We Use Data */}
          <Section title={t("howUsedTitle")}>
            <p>{t("howUsedText")}</p>
            <ul className="mt-3 space-y-2">
              <Li>{t("howUsedItem1")}</Li>
              <Li>{t("howUsedItem2")}</Li>
              <Li>{t("howUsedItem3")}</Li>
              <Li>{t("howUsedItem4")}</Li>
              <Li>{t("howUsedItem5")}</Li>
            </ul>
          </Section>

          {/* Legal Basis */}
          <Section title={t("legalBasisTitle")}>
            <p>{t("legalBasisText")}</p>
          </Section>

          {/* Third Parties */}
          <Section title={t("thirdPartiesTitle")}>
            <p>{t("thirdPartiesText")}</p>
            <ul className="mt-3 space-y-2">
              <Li>{t("thirdParty1")}</Li>
              <Li>{t("thirdParty2")}</Li>
              <Li>{t("thirdParty3")}</Li>
              <Li>{t("thirdParty4")}</Li>
              <Li>{t("thirdParty5")}</Li>
            </ul>
          </Section>

          {/* Retention */}
          <Section title={t("retentionTitle")}>
            <p>{t("retentionText")}</p>
          </Section>

          {/* Rights */}
          <Section title={t("rightsTitle")}>
            <p>{t("rightsText")}</p>
            <ul className="mt-3 space-y-2">
              <Li>{t("right1")}</Li>
              <Li>{t("right2")}</Li>
              <Li>{t("right3")}</Li>
              <Li>{t("right4")}</Li>
              <Li>{t("right5")}</Li>
              <Li>{t("right6")}</Li>
            </ul>
          </Section>

          {/* Security */}
          <Section title={t("securityTitle")}>
            <p>{t("securityText")}</p>
          </Section>

          {/* Cookies */}
          <Section title={t("cookiesTitle")}>
            <p>{t("cookiesText")}</p>
          </Section>

          {/* Contact */}
          <Section title={t("contactTitle")}>
            <p>{t("contactText")}</p>
            <p className="mt-2 font-mono text-accent">{t("contactEmail")}</p>
            <p className="mt-4 text-sm">{t("supervisoryText")}</p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-display font-semibold text-accent mb-3">
        {title}
      </h2>
      <div className="text-text-secondary text-sm sm:text-base leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-accent mt-1.5 shrink-0">&#9670;</span>
      <span>{children}</span>
    </li>
  );
}
