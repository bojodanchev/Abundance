import { Sparkles, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import originBooks from "@/assets/origin-books.png";
import originSpeaking from "@/assets/origin-speaking.png";
import originHockey from "@/assets/origin-hockey-2.png";
import originEmpire from "@/assets/origin-empire.png";

const OriginStory = () => {
  const { t } = useTranslation();

  const stages = [
    {
      title: t('originStory.stage1Title'),
      description: t('originStory.stage1Desc'),
      visual: "from-primary/20 to-secondary/20",
      image: originBooks,
      hasDialog: true,
      dialogTitle: t('originStory.stage1DialogTitle'),
      dialogContent: t('originStory.stage1DialogContent')
    },
    {
      title: t('originStory.stage2Title'),
      description: t('originStory.stage2Desc'),
      visual: "from-secondary/20 to-primary/20",
      image: originHockey,
      hasDialog: true,
      dialogTitle: t('originStory.stage2DialogTitle'),
      dialogContent: t('originStory.stage2DialogContent')
    },
    {
      title: t('originStory.stage3Title'),
      description: t('originStory.stage3Desc'),
      visual: "from-primary/20 to-accent/20",
      image: originSpeaking,
      hasDialog: true,
      dialogTitle: t('originStory.stage3DialogTitle'),
      dialogContent: t('originStory.stage3DialogContent')
    },
    {
      title: t('originStory.stage4Title'),
      description: t('originStory.stage4Desc'),
      visual: "from-accent/20 to-primary/20",
      image: originEmpire,
      hasDialog: true,
      dialogTitle: t('originStory.stage4DialogTitle'),
      dialogContent: t('originStory.stage4DialogContent')
    }
  ];

  return (
    <section id="origin" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 border border-primary/20 bg-card/30 backdrop-blur-sm">
              <Sparkles className="text-primary" size={20} />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary/90">
                {t('originStory.badge')}
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: t('originStory.heading') }}
            />

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('originStory.subheading')}
            </p>
          </div>

          {/* Storytelling Stages */}
          <div className="grid md:grid-cols-2 gap-8">
            {stages.map((stage, index) => (
              <div
                key={index}
                className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-elegant group overflow-hidden"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stage.visual} opacity-0 group-hover:opacity-100 transition-elegant`}></div>

                {/* Image Space */}
                <div className="relative h-96 bg-muted/20 border-b border-border/30 overflow-hidden">
                  {stage.image ? (
                    <img
                      src={stage.image}
                      alt={stage.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-primary/30 flex items-center justify-center font-display text-2xl font-bold text-primary">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10 p-8">
                  <h3 className="font-display text-2xl font-bold mb-4">
                    {stage.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                    {stage.description}
                  </p>

                  {stage.hasDialog && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="group">
                          {t('originStory.tellMeMore')}
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="font-display text-3xl mb-4">
                            {stage.dialogTitle}
                          </DialogTitle>
                          <DialogDescription className="text-base leading-relaxed space-y-4">
                            <div dangerouslySetInnerHTML={{ __html: stage.dialogContent }} />
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-elegant origin-left"></div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default OriginStory;
