import { Crown, Flame, Rocket, Brain, Gem, Zap, Wrench, Flag, FileText, Eye, Gift, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import luxuryJet from "@/assets/luxury-jet.jpg";

const ProgramPaths = () => {
  const navigate = useNavigate();
  const programs = {
    elite: [
      {
        number: "12",
        icon: Crown,
        title: "EXCLUSIVE PARTNER",
        status: "ПО ПОКАНА",
        forWho: "Готови за скалиране до 6–7 цифри.",
        commitment: "Пълно сливане на ресурси. Влагаме хора, стратегия и капитал.",
        result: "Автоматизирана бизнес империя.",
        note: "Прием само след одобрение.",
        color: "gold"
      },
      {
        number: "11",
        icon: Flame,
        title: "DONE FOR YOU (DFY)",
        status: "ОСТАВИ НА ЕКСПЕРТИТЕ",
        guarantee: "Работа до 50,000 BGN печалба.",
        includes: "Ние строим системата. Ти получаваш ключа.",
        details: "Маркетинг, Фунии, Позициониране + Частни срещи с експерти.",
        goal: "4-цифрени суми седмично в бизнеса ти (Автопилот).",
        color: "gold"
      },
      {
        number: "10",
        icon: Rocket,
        title: "DONE WITH YOU (DWY)",
        status: "КО-ПИЛОТ (Coaching)",
        guarantee: "200% ROI (Удвояване на бизнеса ти).",
        includes: "9 Лични Сесии + 3 VIP Събития.",
        bonus: "Ежедневен достъп до личен Success Manager.",
        method: "Работа рамо до рамо със специалист.",
        color: "violet"
      },
      {
        number: "9",
        icon: Brain,
        title: "1:1 MENTORING",
        status: "СТРАТЕГИЯ (3 Месеца)",
        includes: "3 Лични Срещи + 6 Мастеркласа.",
        access: "Специални събития (3 пъти).",
        focus: "Дълбока работа на твоята система и мениджмънт.",
        goal: "Изчистване на грешките в изпълнението.",
        color: "primary"
      }
    ],
    core: [
      {
        number: "8",
        icon: Gem,
        title: "CORE (DIY PROGRAM)",
        status: "ФУНДАМЕНТЪТ",
        description: "Пълен достъп до 'Системата'. Ти си строителят.",
        includes: "Всички курсове, Frameworks + VIP Общност.",
        bonus: "Месечни срещи и възможности за бизнес позициониране.",
        requirement: "За хора, които действат като предприемачи.",
        note: "базиран на Circle Space app",
        color: "primary"
      },
      {
        number: "7",
        icon: Zap,
        title: "BOOST",
        status: "УСКОРИТЕЛ",
        description: "Оптимизиращо надграждане за бързи резултати.",
        comingSoon: true,
        role: "Инжекция премиум гориво за твоята ниша.",
        color: "violet"
      },
      {
        number: "6",
        icon: Wrench,
        title: "NICHED LABS",
        status: "СПЕЦИАЛИЗАЦИЯ",
        format: "Конкретни модули 'Лаборатории'.",
        examples: "Sales Mastery LAB, Trading CRYPTO/FOREX LAB, Positioning LAB, AI OPS LAB.",
        goal: "Дълбоко практическо усвояване на едно конкретно 'Killer Skill' умение.",
        color: "gold"
      },
      {
        number: "5",
        icon: Flag,
        title: "CHALLENGE",
        status: "ПРАКТИЧЕСКИ СТАРТ",
        role: "Филтърът. Сепарира сериозните от любопитните.",
        includes: "Ниширане + Практически насоки + Q&A Live.",
        result: "Първоначални реални действия.",
        color: "primary"
      }
    ],
    entry: [
      {
        number: "4",
        icon: FileText,
        title: "ENTRY PROTOCOLS",
        status: "ПЛАНЪТ",
        includes: "Протокол за ниширане + 1 часова консултация (2x30 мин).",
        support: "Седмичен Email съпорт за просперитет.",
        goal: "Микро-ангажимент. Получаваш базова яснота спрямо твоите цели.",
        color: "violet"
      },
      {
        number: "3",
        icon: Eye,
        title: "SPRINT WEBINAR",
        status: "ПРОГЛЕЖДАНЕ",
        focus: "Фундаментално осъзнаване на твоите болките, нужди и желания за реализация",
        bonuses: "Физическа книга + 2 Резюмета на топ книги.",
        goal: "Да разбереш 'Защо' преди да питаш 'Как'.",
        color: "primary"
      },
      {
        number: "2",
        icon: Gift,
        title: "VALUE",
        status: "ПОДАРЪК",
        price: "19.97 EUR сега → FREE 0 EUR",
        theme: "'Трансформацията започва с теб'",
        tool: "FREE AI Agent + 3 готови промпта за AI асистент",
        goal: "Демонстрация на мощта на нашата AI Business OPS™ система.",
        color: "gold"
      },
      {
        number: "1",
        icon: Key,
        title: "WELCOME",
        status: "ВХОДЪТ",
        price: "9.97 EUR сега → FREE 0 EUR",
        name: "Abundance Diagnostic™",
        role: "Влез в света на КОД ИЗОБИЛИЕ безплатно.",
        action: "Твоята първа стъпка към изхода от хаоса.",
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
          {program.forWho && <p><span className="font-bold">За кого:</span> {program.forWho}</p>}
          {program.guarantee && <p><span className="font-bold text-primary">Гаранция:</span> {program.guarantee}</p>}
          {program.commitment && <p><span className="font-semibold">Ангажимент:</span> {program.commitment}</p>}
          {program.includes && <p><span className="font-semibold">Включва:</span> {program.includes}</p>}
          {program.description && <p>{program.description}</p>}
          {program.result && <p><span className="font-semibold">Резултат:</span> {program.result}</p>}
          {program.goal && <p><span className="font-semibold">Цел:</span> {program.goal}</p>}
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
              <span className="text-gradient">ТВОЕТО СЛЕДВАЩО НИВО</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-semibold">
              От безплатен анализ до дългосрочно партньорство за милиони. Избери своя мащаб.
            </p>
          </div>

          {/* Elite Tier */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-black mb-6 text-center">
              <span className="text-gradient">ELITE & HIGH-TICKET</span> — Върховна Власт & Стратегия
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {programs.elite.map(renderCard)}
            </div>
          </div>

          {/* Core Tier */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-black mb-6 text-center">
              <span className="text-gradient">CORE & ACCELERATORS</span> — Системата & Ускорители
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {programs.core.map(renderCard)}
            </div>
          </div>

          {/* Entry Tier */}
          <div>
            <h3 className="text-2xl md:text-3xl font-black mb-6 text-center">
              <span className="text-gradient">ENTRY & NURTURE</span> — Вход & Доверие
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {programs.entry.map(renderCard)}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              НЕ ЗНАЕШ ОТ КЪДЕ ДА ЗАПОЧНЕШ?
            </p>
            <button
              onClick={() => navigate('/diagnostic')}
              className="text-primary font-bold text-lg hover:text-gold transition-colors underline"
            >
              СТАРТИРАЙ С ДИАГНОСТИКА (№1)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramPaths;
