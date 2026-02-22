"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function LanguageSwitcher({ className }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-2">
          {i > 0 && <span className="text-border">|</span>}
          <button
            onClick={() => switchLocale(loc)}
            className={cn(
              "text-sm font-mono transition-colors cursor-pointer",
              locale === loc
                ? "text-accent"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
