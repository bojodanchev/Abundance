import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { Rocket, Building2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WhoIsThisFor = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {t('whoIsThisFor.headlinePart1')} <span className="text-gradient">{t('whoIsThisFor.headlineHighlight')}</span>?
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('whoIsThisFor.subheadline')}
            </p>
          </div>

          <Tabs defaultValue="beginners" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="beginners" className="text-sm md:text-base">
                {t('whoIsThisFor.tabBeginners')}
              </TabsTrigger>
              <TabsTrigger value="experienced" className="text-sm md:text-base">
                {t('whoIsThisFor.tabExperienced')}
              </TabsTrigger>
              <TabsTrigger value="creators" className="text-sm md:text-base">
                {t('whoIsThisFor.tabCreators')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="beginners" className="mt-0">
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold">
                    {t('whoIsThisFor.beginnersTitle')}
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground mb-8">
                  {t('whoIsThisFor.beginnersDescription')}
                </p>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    ✓ {t('whoIsThisFor.beginnersItem1Part1')} <strong className="text-foreground">{t('whoIsThisFor.beginnersItem1Bold')}</strong> {t('whoIsThisFor.beginnersItem1Part2')}
                  </p>
                  <p>
                    ✓ {t('whoIsThisFor.beginnersItem2Part1')} <strong className="text-foreground">{t('whoIsThisFor.beginnersItem2Bold')}</strong> {t('whoIsThisFor.beginnersItem2Part2')}
                  </p>
                  <p>
                    ✓ {t('whoIsThisFor.beginnersItem3Part1')} <strong className="text-foreground">{t('whoIsThisFor.beginnersItem3Bold')}</strong>{t('whoIsThisFor.beginnersItem3Part2')}
                  </p>
                  <p>
                    ✓ {t('whoIsThisFor.beginnersItem4Part1')} <strong className="text-foreground">{t('whoIsThisFor.beginnersItem4Bold')}</strong> {t('whoIsThisFor.beginnersItem4Part2')}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="experienced" className="mt-0">
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold">
                    {t('whoIsThisFor.experiencedTitle')}
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground mb-8">
                  {t('whoIsThisFor.experiencedDescription')}
                </p>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    ✓ <strong className="text-foreground">{t('whoIsThisFor.experiencedItem1Bold')}</strong> {t('whoIsThisFor.experiencedItem1Text')}
                  </p>
                  <p>
                    ✓ <strong className="text-foreground">{t('whoIsThisFor.experiencedItem2Bold')}</strong> {t('whoIsThisFor.experiencedItem2Text')}
                  </p>
                  <p>
                    ✓ <strong className="text-foreground">{t('whoIsThisFor.experiencedItem3Bold')}</strong> {t('whoIsThisFor.experiencedItem3Text')}
                  </p>
                  <p>
                    ✓ <strong className="text-foreground">{t('whoIsThisFor.experiencedItem4Bold')}</strong> {t('whoIsThisFor.experiencedItem4Text')}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="creators" className="mt-0">
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Users className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold">
                    {t('whoIsThisFor.creatorsTitle')}
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground mb-8">
                  {t('whoIsThisFor.creatorsDescription')}
                </p>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    ✓ <strong className="text-foreground">{t('whoIsThisFor.creatorsItem1Bold')}</strong> {t('whoIsThisFor.creatorsItem1Text')}
                  </p>
                  <p>
                    ✓ <strong className="text-foreground">{t('whoIsThisFor.creatorsItem2Bold')}</strong>{t('whoIsThisFor.creatorsItem2Text')}
                  </p>
                  <p>
                    ✓ <strong className="text-foreground">{t('whoIsThisFor.creatorsItem3Bold')}</strong>{t('whoIsThisFor.creatorsItem3Text')}
                  </p>
                  <p>
                    ✓ <strong className="text-foreground">{t('whoIsThisFor.creatorsItem4Bold')}</strong> {t('whoIsThisFor.creatorsItem4Text')}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center">
            <Button size="lg" variant="hero" onClick={() => navigate('/diagnostic')}>
              {t('whoIsThisFor.cta')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsThisFor;
