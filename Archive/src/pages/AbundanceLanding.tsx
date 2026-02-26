import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { TelegramChat } from "@/components/TelegramChat";
import { useTranslation } from 'react-i18next';

const AbundanceLanding = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 -z-10" />

        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
              dangerouslySetInnerHTML={{ __html: t('abundanceLanding.heroHeadline') }}
            />

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t('abundanceLanding.heroSubtext') }}
            />
          </div>

          {/* Hook / Body */}
          <div className="max-w-3xl mx-auto space-y-6 py-8">
            <p className="text-lg md:text-xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t('abundanceLanding.hookLine1') }}
            />
            <p className="text-lg md:text-xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t('abundanceLanding.hookLine2') }}
            />
            <p className="text-lg md:text-xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t('abundanceLanding.hookLine3') }}
            />
          </div>

          {/* CTA */}
          <div className="space-y-6">
            <Button
              size="lg"
              className="text-xl px-12 py-8 bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all"
              onClick={() => navigate('/diagnostic')}
            >
              <Sparkles className="mr-3 h-6 w-6" />
              {t('abundanceLanding.ctaButton')}
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {t('abundanceLanding.benefit1')}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {t('abundanceLanding.benefit2')}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {t('abundanceLanding.benefit3')}
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="pt-12">
            <p className="text-sm text-muted-foreground mb-4">
              {t('abundanceLanding.socialProof')}
            </p>
            <div className="flex justify-center items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-background"
                  />
                ))}
              </div>
              <span className="text-sm font-medium ml-2">{t('abundanceLanding.memberCount')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('abundanceLanding.featuresHeading')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-background rounded-lg border">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">{t('abundanceLanding.feature1Title')}</h3>
              <p className="text-muted-foreground">
                {t('abundanceLanding.feature1Desc')}
              </p>
            </div>

            <div className="p-6 bg-background rounded-lg border">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">{t('abundanceLanding.feature2Title')}</h3>
              <p className="text-muted-foreground">
                {t('abundanceLanding.feature2Desc')}
              </p>
            </div>

            <div className="p-6 bg-background rounded-lg border">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">{t('abundanceLanding.feature3Title')}</h3>
              <p className="text-muted-foreground">
                {t('abundanceLanding.feature3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Telegram Chat */}
      <TelegramChat />

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">
            {t('abundanceLanding.finalCtaHeading')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('abundanceLanding.finalCtaText')}
          </p>
          <Button
            size="lg"
            className="text-xl px-12 py-8 bg-primary hover:bg-primary/90"
            onClick={() => navigate('/diagnostic')}
          >
            <Sparkles className="mr-3 h-6 w-6" />
            {t('abundanceLanding.finalCtaButton')}
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AbundanceLanding;
