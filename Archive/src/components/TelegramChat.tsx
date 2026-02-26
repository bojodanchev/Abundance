import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const TELEGRAM_USER = "alexshon7";

export const TelegramChat = () => {
  const { t } = useTranslation();

  const TEMPLATE_MESSAGE = encodeURIComponent(t('telegramChat.templateMessage'));
  const TELEGRAM_URL = `https://t.me/${TELEGRAM_USER}?text=${TEMPLATE_MESSAGE}`;

  return (
    <>
      {/* Chat Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#229ED9]/10 to-[#229ED9]/5 border border-[#229ED9]/20 rounded-full text-sm font-medium backdrop-blur-sm">
            <MessageCircle className="w-4 h-4 text-[#229ED9]" />
            <span className="text-[#229ED9]">{t('telegramChat.directContact')}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold">
            {t('telegramChat.headlinePart1')}{" "}
            <span className="bg-gradient-to-r from-[#229ED9] to-[#229ED9]/70 bg-clip-text text-transparent">
              {t('telegramChat.headlineHighlight')}
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('telegramChat.description')}
          </p>

          <Button
            size="lg"
            className="text-lg px-10 py-7 bg-[#229ED9] hover:bg-[#229ED9]/90 text-white shadow-xl hover:shadow-2xl hover:shadow-[#229ED9]/20 transition-all hover:scale-105"
            onClick={() => window.open(TELEGRAM_URL, "_blank")}
          >
            <MessageCircle className="mr-3 h-5 w-5" />
            {t('telegramChat.cta')}
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>

          <p className="text-sm text-muted-foreground">
            {t('telegramChat.responseTime')}
          </p>
        </div>
      </section>

      {/* Floating Telegram Button */}
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#229ED9] hover:bg-[#229ED9]/90 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-[#229ED9]/30 transition-all hover:scale-110"
        aria-label="Chat on Telegram"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </>
  );
};
