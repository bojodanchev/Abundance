import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useTranslation } from 'react-i18next';

const VSL = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            {t('vsl.heading')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('vsl.subheading')}
          </p>
        </div>

        {/* Video Placeholder */}
        <div className="aspect-video bg-muted rounded-lg mb-8 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
          <div className="relative z-10 text-center space-y-4">
            <PlayCircle className="w-24 h-24 text-primary mx-auto" />
            <p className="text-muted-foreground">
              {t('vsl.videoPlaceholder')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('vsl.videoNote')}
            </p>
          </div>
        </div>

        {/* Key Points */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            {t('vsl.keyPointsHeading')}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-semibold mb-1">{t('vsl.point1Title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('vsl.point1Desc')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
              <span className="text-2xl">💰</span>
              <div>
                <h3 className="font-semibold mb-1">{t('vsl.point2Title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('vsl.point2Desc')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
              <span className="text-2xl">🚀</span>
              <div>
                <h3 className="font-semibold mb-1">{t('vsl.point3Title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('vsl.point3Desc')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
              <span className="text-2xl">👥</span>
              <div>
                <h3 className="font-semibold mb-1">{t('vsl.point4Title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('vsl.point4Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 text-center space-y-6">
          <h2 className="text-3xl font-bold">
            {t('vsl.ctaHeading')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('vsl.ctaText')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="/diagnostic">
                {t('vsl.ctaButton1')}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <a href="/diagnostic">
                {t('vsl.ctaButton2')}
              </a>
            </Button>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16 space-y-8">
          <h2 className="text-3xl font-bold text-center">
            {t('vsl.testimonialsHeading')}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 bg-muted/30 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10" />
                  <div>
                    <p className="font-semibold">{t('vsl.memberLabel')} {i}</p>
                    <p className="text-sm text-muted-foreground">{t('vsl.entrepreneurLabel')}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  {t('vsl.testimonialQuote')}
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-500">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSL;
