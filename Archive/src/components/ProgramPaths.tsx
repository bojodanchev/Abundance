import { Crown, Flame, Rocket, Brain, Gem, Zap, Wrench, Flag, FileText, Eye, Gift, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import luxuryJet from "@/assets/luxury-jet.jpg";

const ProgramPaths = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const programs = {
    elite: [
      {
        number: "12",
        icon: Crown,
        title: "EXCLUSIVE PARTNER",
        status: t('programPaths.p12Status'),
        forWho: t('programPaths.p12ForWho'),
        commitment: t('programPaths.p12Commitment'),
        result: t('programPaths.p12Result'),
        note: t('programPaths.p12Note'),
        color: "gold"
      },
      {
        number: "11",
        icon: Flame,
        title: "DONE FOR YOU (DFY)",
        status: t('programPaths.p11Status'),
        guarantee: t('programPaths.p11Guarantee'),
        includes: t('programPaths.p11Includes'),
        details: t('programPaths.p11Details'),
        goal: t('programPaths.p11Goal'),
        color: "gold"
      },
      {
        number: "10",
        icon: Rocket,
        title: "DONE WITH YOU (DWY)",
        status: t('programPaths.p10Status'),
        guarantee: t('programPaths.p10Guarantee'),
        includes: t('programPaths.p10Includes'),
        bonus: t('programPaths.p10Bonus'),
        method: t('programPaths.p10Method'),
        color: "violet"
      },
      {
        number: "9",
        icon: Brain,
        title: "1:1 MENTORING",
        status: t('programPaths.p9Status'),
        includes: t('programPaths.p9Includes'),
        access: t('programPaths.p9Access'),
        focus: t('programPaths.p9Focus'),
        goal: t('programPaths.p9Goal'),
        color: "primary"
      }
    ],
    core: [
      {
        number: "8",
        icon: Gem,
        title: "CORE (DIY PROGRAM)",
        status: t('programPaths.p8Status'),
        description: t('programPaths.p8Description'),
        includes: t('programPaths.p8Includes'),
        bonus: t('programPaths.p8Bonus'),
        requirement: t('programPaths.p8Requirement'),
        note: t('programPaths.p8Note'),
        color: "primary"
      },
      {
        number: "7",
        icon: Zap,
        title: "BOOST",
        status: t('programPaths.p7Status'),
        description: t('programPaths.p7Description'),
        comingSoon: true,
        role: t('programPaths.p7Role'),
        color: "violet"
      },
      {
        number: "6",
        icon: Wrench,
        title: "NICHED LABS",
        status: t('programPaths.p6Status'),
        format: t('programPaths.p6Format'),
        examples: t('programPaths.p6Examples'),
        goal: t('programPaths.p6Goal'),
        color: "gold"
      },
      {
        number: "5",
        icon: Flag,
        title: "CHALLENGE",
        status: t('programPaths.p5Status'),
        role: t('programPaths.p5Role'),
        includes: t('programPaths.p5Includes'),
        result: t('programPaths.p5Result'),
        color: "primary"
      }
    ],
    entry: [
      {
        number: "4",
        icon: FileText,
        title: "ENTRY PROTOCOLS",
        status: t('programPaths.p4Status'),
        includes: t('programPaths.p4Includes'),
        support: t('programPaths.p4Support'),
        goal: t('programPaths.p4Goal'),
        color: "violet"
      },
      {
        number: "3",
        icon: Eye,
        title: "SPRINT WEBINAR",
        status: t('programPaths.p3Status'),
        focus: t('programPaths.p3Focus'),
        bonuses: t('programPaths.p3Bonuses'),
        goal: t('programPaths.p3Goal'),
        color: "primary"
      },
      {
        number: "2",
        icon: Gift,
        title: "VALUE",
        status: t('programPaths.p2Status'),
        price: t('programPaths.p2Price'),
        theme: t('programPaths.p2Theme'),
        tool: t('programPaths.p2Tool'),
        goal: t('programPaths.p2Goal'),
        color: "gold"
      },
      {
        number: "1",
        icon: Key,
        title: "WELCOME",
        status: t('programPaths.p1Status'),
        price: t('programPaths.p1Price'),
        name: "Abundance Diagnostic\u2122",
        role: t('programPaths.p1Role'),
        action: t('programPaths.p1Action'),
        isMainCTA: true,
        color: "primary"
      }
    ]
  };

  const renderCard = (program: any) => {
    const Icon = program.icon;
    const colorClass = program.color === "gold" ? "gold" : program.color === "violet" ? "violet" : "primary";

    return (
      <div
        key={program.number}
        className={`group p-4 md:p-6 bg-gradient-to-br from-${colorClass}/10 to-${colorClass}/5 border-2 border-${colorClass}/20 rounded-xl hover:border-${colorClass}/50 transition-all hover-scale h-full flex flex-col ${
          program.isMainCTA ? 'ring-2 ring-primary shadow-glow' : ''
        }`}
      >
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-10 h-10 rounded-full bg-${colorClass}/20 flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 text-${colorClass}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-3xl md:text-4xl font-black mb-2">{program.number}</div>
            <h3 className="text-lg md:text-xl font-black mb-2 break-words">{program.title}</h3>
            <p className="text-sm md:text-base text-muted-foreground mb-3 font-semibold">{program.status}</p>
          </div>
        </div>

        <div className="space-y-3 text-sm md:text-base flex-1">
          {program.forWho && <p><span className="font-bold">{t('programPaths.labelForWho')}</span> {program.forWho}</p>}
          {program.guarantee && <p><span className="font-bold text-primary">{t('programPaths.labelGuarantee')}</span> {program.guarantee}</p>}
          {program.commitment && <p><span className="font-semibold">{t('programPaths.labelCommitment')}</span> {program.commitment}</p>}
          {program.includes && <p><span className="font-semibold">{t('programPaths.labelIncludes')}</span> {program.includes}</p>}
          {program.description && <p>{program.description}</p>}
          {program.result && <p><span className="font-semibold">{t('programPaths.labelResult')}</span> {program.result}</p>}
          {program.goal && <p><span className="font-semibold">{t('programPaths.labelGoal')}</span> {program.goal}</p>}
          {program.note && <p className="text-muted-foreground italic">{program.note}</p>}
          {program.comingSoon && <p className="text-primary font-semibold">Coming Soon / TBD</p>}
        </div>
      </div>
    );
  };

  return (
    <section id="programs" className="py-16 md:py-24 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={luxuryJet}
          alt="Luxury Private Jet"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/94 via-background/92 to-background"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="text-gradient">{t('programPaths.headline')}</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-semibold">
              {t('programPaths.subheadline')}
            </p>
          </div>

          {/* Elite Tier */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-black mb-6 text-center">
              <span className="text-gradient">ELITE & HIGH-TICKET</span> — {t('programPaths.eliteSubtitle')}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {programs.elite.map(renderCard)}
            </div>
          </div>

          {/* Core Tier */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-black mb-6 text-center">
              <span className="text-gradient">CORE & ACCELERATORS</span> — {t('programPaths.coreSubtitle')}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {programs.core.map(renderCard)}
            </div>
          </div>

          {/* Entry Tier */}
          <div>
            <h3 className="text-2xl md:text-3xl font-black mb-6 text-center">
              <span className="text-gradient">ENTRY & NURTURE</span> — {t('programPaths.entrySubtitle')}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {programs.entry.map(renderCard)}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              {t('programPaths.dontKnowWhere')}
            </p>
            <button
              onClick={() => navigate('/diagnostic')}
              className="text-primary font-bold text-lg hover:text-gold transition-colors underline"
            >
              {t('programPaths.startWithDiagnostic')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramPaths;
