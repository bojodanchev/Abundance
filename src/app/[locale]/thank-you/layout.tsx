import type { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isBg = locale === "bg";

  return {
    title: isBg ? "Благодарим" : "Thank You",
    description: isBg
      ? "Твоята диагностика е на път към теб. Провери имейла си."
      : "Your diagnostic is on its way. Check your email.",
    robots: { index: false, follow: false },
  };
}

export default function ThankYouLayout({ children }: { children: ReactNode }) {
  return children;
}
