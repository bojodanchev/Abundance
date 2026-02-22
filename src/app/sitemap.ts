import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://codeabundance.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["bg", "en"];
  const now = new Date();

  const staticPages = ["", "/diagnose", "/privacy", "/terms"];

  return staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${page}`,
      lastModified: now,
      changeFrequency: page === "" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "" ? 1.0 : 0.7,
    })),
  );
}
