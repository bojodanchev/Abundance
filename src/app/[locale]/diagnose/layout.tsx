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
    title: isBg ? "Диагностика" : "Diagnostic",
    description: isBg
      ? "Попълни 7-минутната диагностика и разкрий своя уникален код към изобилието."
      : "Complete the 7-minute diagnostic and discover your unique abundance code.",
  };
}

export default function DiagnoseLayout({ children }: { children: ReactNode }) {
  return children;
}
