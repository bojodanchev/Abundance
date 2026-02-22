import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/shared/CookieConsent";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://codeabundance.com";

export const metadata: Metadata = {
  title: {
    default: "CODE: ABUNDANCE — Открий Кода Си Към Изобилието",
    template: "%s | CODE: ABUNDANCE",
  },
  description:
    "Персонализирана AI диагностика базирана на Human Design, астрология и нумерология. Разкрий силните си страни и получи 90-дневен план за действие.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "bg_BG",
    alternateLocale: "en_US",
    siteName: "CODE: ABUNDANCE",
    title: "CODE: ABUNDANCE — Открий Кода Си Към Изобилието",
    description:
      "7-минутна AI диагностика, която разкрива какво те спира и как да го преодолееш. Human Design + Астрология + Нумерология.",
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CODE: ABUNDANCE — AI Diagnostic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CODE: ABUNDANCE — Открий Кода Си Към Изобилието",
    description:
      "7-минутна AI диагностика, която разкрива какво те спира и как да го преодолееш.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
