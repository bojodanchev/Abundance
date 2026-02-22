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
    title: isBg ? "Общи условия за ползване" : "Terms of Service",
    description: isBg
      ? "Общи условия за ползване на платформата CODE: ABUNDANCE."
      : "Terms of Service for the CODE: ABUNDANCE platform.",
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TermsContent />;
}

function TermsContent() {
  const t = useTranslations("terms");

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

          {/* Service Description */}
          <Section title={t("serviceTitle")}>
            <p>{t("serviceText")}</p>
            <ul className="mt-3 space-y-2">
              <Li>{t("serviceItem1")}</Li>
              <Li>{t("serviceItem2")}</Li>
              <Li>{t("serviceItem3")}</Li>
            </ul>
          </Section>

          {/* Disclaimer */}
          <Section title={t("disclaimerTitle")}>
            <p>{t("disclaimerText")}</p>
          </Section>

          {/* User Responsibilities */}
          <Section title={t("userTitle")}>
            <p>{t("userText")}</p>
            <ul className="mt-3 space-y-2">
              <Li>{t("userItem1")}</Li>
              <Li>{t("userItem2")}</Li>
              <Li>{t("userItem3")}</Li>
              <Li>{t("userItem4")}</Li>
            </ul>
          </Section>

          {/* Payments */}
          <Section title={t("paymentTitle")}>
            <p>{t("paymentText")}</p>
          </Section>

          {/* Refund Policy */}
          <Section title={t("refundTitle")}>
            <p>{t("refundText")}</p>
          </Section>

          {/* IP */}
          <Section title={t("ipTitle")}>
            <p>{t("ipText")}</p>
          </Section>

          {/* Liability */}
          <Section title={t("liabilityTitle")}>
            <p>{t("liabilityText")}</p>
          </Section>

          {/* Termination */}
          <Section title={t("terminationTitle")}>
            <p>{t("terminationText")}</p>
          </Section>

          {/* Changes */}
          <Section title={t("changesTitle")}>
            <p>{t("changesText")}</p>
          </Section>

          {/* Governing Law */}
          <Section title={t("lawTitle")}>
            <p>{t("lawText")}</p>
          </Section>

          {/* Contact */}
          <Section title={t("contactTitle")}>
            <p>{t("contactText")}</p>
            <p className="mt-2 font-mono text-accent">{t("contactEmail")}</p>
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
