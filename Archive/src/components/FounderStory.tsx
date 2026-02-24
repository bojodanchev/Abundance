import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, TrendingUp, Users, Briefcase, DollarSign } from "lucide-react";
import seanPortrait from "@/assets/sean-portrait.jpg";

const timelineData = [
  {
    id: 1,
    phase: "Детство",
    title: "Раздвоено семейство, липси, първата дисциплина",
    points: [
      "Роден в София, в семейство на разделени родители, българка и нигериец.",
      "Още на 5 години свиква на самостоятелност и дисциплина.",
      "Израства с осъзнаването, че светът е пълен с ограничения, което запалва стремежа му да осигури живот без липси."
    ]
  },
  {
    id: 2,
    phase: "Спортът като спасение",
    title: "Лека атлетика и първите медали",
    points: [
      "Преминава през футбол, карате, баскетбол, кау-каяк и плуване, докато открива леката атлетика.",
      "Пет години състезания и отличия под менторството на доверена треньорка в кръга на олимпиеца Христо Марков.",
      "Натрупва фундамент от дисциплина, концентрация и стремеж към върха."
    ]
  },
  {
    id: 3,
    phase: "YouTube и първите книги",
    title: "Пробуждането",
    points: [
      "Открива YouTube и книгата The Secret още в четвърти клас, когато е на 10г.",
      "Преживява събуждане към личностното развитие и финансовата свобода.",
      "Преминава през творбите на Наполеон Хил, Кийосаки, Карнеги, Гардон... основателите на неговото мислене."
    ]
  },
  {
    id: 4,
    phase: "Първите пари",
    title: "Продажби, велосипеди, hustle mindset",
    points: [
      "Продава собственото си колело, за да стартира първия си бизнес.",
      "Купува и препродава стоки онлайн, печелейки първите си средства, за да има джобни за училище.",
      "Осъзнава, че амбицията, подкрепена от действия, създава резултати."
    ]
  },
  {
    id: 5,
    phase: "10 000 човека на улицата",
    title: "Психологията на въздействието",
    points: [
      "Поема предизвикателството да продаде книги на 10 000 непознати души.",
      "Улиците и моловете на София се превръщат в школа по продажби и психология.",
      "Преодолява страха от отхвърляне и изгражда необичайна социална устойчивост."
    ]
  },
  {
    id: 6,
    phase: "Голям екип и директни продажби",
    title: "Лидерство и управление",
    points: [
      "След кампанията с книгите изгражда над 100-членен екип в класически компании за директни продажби.",
      "Работи с продукти като козметика, хранителни добавки, тъговски мрежи и други.",
      "Формира лидерски умения, системно мислене и способност да управлява мащабни структури."
    ]
  },
  {
    id: 7,
    phase: "Хокей на лед",
    title: "Национален отбор, дисциплина, войнско мислене",
    points: [
      "От новак на пързалката се превръща в професионален хокеист и влиза в националния отбор на България.",
      "Участва в световни първенства и печели златен медал, както и титлата за \"Best player of the Game\" при обрата срещу Израел, това е първо злато за Националния отбор в дивизията в историята на България \"2019-та година\".",
      "Затвърждава манталитет на дисциплина, стратегия и устойчивост."
    ]
  },
  {
    id: 8,
    phase: "Спиране на училище",
    title: "Преминаване към самостоятелна форма",
    points: [
      "За да съчетае бизнеса и спорта, преминава към самостоятелна форма на обучение.",
      "Това го учи да поема отговорност за развитието си и да работи без възрастовия натиск на средата му."
    ]
  },
  {
    id: 9,
    phase: "Крипто, Web3",
    title: "Първите печалби и първите падения",
    points: [
      "В периода на локдауна изучава пазари, Forex и крипто.",
      "Постига бързи печалби, спортни автомобили, луксозен живот в Арабските Емирства, но и значителни загуби, некачествени инвестиционни решения.",
      "Става обект на публични обвинения и критика, поради негативна PR кампания и се сблъсква с негативите от мнението на обществото."
    ]
  },
  {
    id: 10,
    phase: "CBD компания",
    title: "Стотици обекти, възходът, рекламата, парите... и падението",
    points: [
      "Създава CBD бизнес с международен обхват в 8 държави.",
      "Маркетинг с инфлуенсъри, яхти, луксозни събития и силна бранд идентичност.",
      "Продуктът е добър, но пазарът остава недооценен и бизнесът не достига потенциала си.",
      "Попада в минус шестцифрени суми, задължения, прекъснати сделки, нереализирани проекти."
    ]
  },
  {
    id: 11,
    phase: "Дубай",
    title: "Глобален нетуърк, бизнес гиганти, стратегическо позициониране",
    points: [
      "Пътува до десетки локации, сред които Дубай, Марбея, Лондон, Стокхолм, Прага, Будапещ, Атина, Букурещ, Берлин, Београд и изгражда мрежа от мултимилионери и предприемачи.",
      "Влиза в непосредствен контакт с най-известните добре познати големи фигури на онлайн пространството.",
      "Събира знание, но не показност. Всичко се документира, но не се показва. Задава се нещо по-голямо..."
    ]
  },
  {
    id: 12,
    phase: "Норвегия",
    title: "Изгнанието, самотата, преосмислянето",
    points: [
      "Живее в Норвегия в доброволна изолация месеци без приятелства, без романтика, без семейство.",
      "Чете, медитира и изгражда нов вътрешен фундамент.",
      "Поставя началото на дълбока лична трансформация."
    ]
  },
  {
    id: 13,
    phase: "Маркетинг, дигитален бизнес",
    title: "Завръщането",
    points: [
      "Развива дигитални умения в маркетинга и започва работа с клиенти по целия свят.",
      "Създава нови структури, услуги и онлайн бизнеси.",
      "Възстановява репутацията си и създава нова стабилна финансова основа."
    ]
  },
  {
    id: 14,
    phase: "Такси, брокер, нула",
    title: "Тъмният период",
    points: [
      "След PR атаките работи каквото намери, включително във фабрики, таксиметров шофьор и брокер на имоти.",
      "Преминава през тежки години, които оформят стоманена идентичност.",
      "Този период става фундаменталната школа на неговия характер."
    ]
  },
  {
    id: 15,
    phase: "КОД: ИЗОБИЛИЕ™",
    title: "Системата, философията, новият Шон Иса",
    points: [
      "Създава собствена философия за успех, лидерство и растеж.",
      "Изгражда общност, обучава хора в бизнес, финанси, личен бранд и дигитални умения.",
      "Влиза в най-силния си период, с мисия да остави глобално наследство."
    ]
  }
];

const FounderStory = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="founder" className="py-24 bg-gradient-dark relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight">
              <span className="text-gradient">Основателят</span>
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-4 max-w-4xl mx-auto leading-relaxed">
              "Не съм роден с предимства. Изградих всичко след десетилетие труд, тестове, успехи и фалити.
              Платих цената, за да не се налага да я плащаш и ти."
            </p>
            <p className="text-xl text-primary font-semibold mb-12">
              Шон Иса — ОСНОВАТЕЛЯТ на CODE: ABUNDANCE™
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-black text-gradient mb-2">9+</div>
                <div className="text-sm text-muted-foreground">години опит</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <Users className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-3xl font-black text-gradient mb-2">120+</div>
                <div className="text-sm text-muted-foreground">души в екипи</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <Briefcase className="w-8 h-8 text-gold mx-auto mb-3" />
                <div className="text-3xl font-black text-gradient mb-2">7+</div>
                <div className="text-sm text-muted-foreground">бизнеса международно</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-black text-gradient mb-2">7</div>
                <div className="text-sm text-muted-foreground">цифрени суми оборот</div>
              </div>
            </div>

            {/* Portrait and Intro */}
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-8 mb-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-48 h-48 rounded-xl overflow-hidden border-4 border-primary/30 flex-shrink-0">
                  <img
                    src={seanPortrait}
                    alt="Шон Иса"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    Той не е теоретик. Той е <strong className="text-foreground">предприемач по душа</strong> и
                    бивш <strong className="text-foreground">национален състезател за България</strong>.
                    Всяка една стратегия, бизнес модел и концепция е лично тествана на бойното поле
                    в живота и са извадени работещите практики тук наготово за всеки студент.
                  </p>
                  <p className="text-lg text-primary font-semibold">
                    КОД: ИЗОБИЛИЕ™ е структурираният резултат от всички уроци.
                    Спести си годините лутане и болка и вземи готовия си личен план сега.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-12">
            <h3 className="font-display text-3xl font-bold text-center mb-12">
              ВИЖ <span className="text-gradient">ПЪТЯ НА ШОН ИСА</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Left Column (1-8) */}
              <div className="space-y-4">
                {timelineData.slice(0, 8).map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-card/50 transition-all"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-black text-lg">{item.id}</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-primary font-semibold mb-1">{item.phase}</div>
                          <div className="text-base md:text-lg font-bold text-foreground">{item.title}</div>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-muted-foreground transition-transform flex-shrink-0 ${expandedItems.includes(item.id) ? 'rotate-180' : ''
                          }`}
                      />
                    </button>

                    {expandedItems.includes(item.id) && (
                      <div className="px-6 pb-6 pt-2 border-t border-border/50">
                        <ul className="space-y-3">
                          {item.points.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-muted-foreground leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Column (9-15) */}
              <div className="space-y-4">
                {timelineData.slice(8).map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-card/50 transition-all"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-black text-lg">{item.id}</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-primary font-semibold mb-1">{item.phase}</div>
                          <div className="text-base md:text-lg font-bold text-foreground">{item.title}</div>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-muted-foreground transition-transform flex-shrink-0 ${expandedItems.includes(item.id) ? 'rotate-180' : ''
                          }`}
                      />
                    </button>

                    {expandedItems.includes(item.id) && (
                      <div className="px-6 pb-6 pt-2 border-t border-border/50">
                        <ul className="space-y-3">
                          {item.points.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-muted-foreground leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-primary rounded-2xl p-8 md:p-12">
              <p className="text-sm text-background/80 mb-2 uppercase tracking-wider font-semibold">
                Личен Уебсайт
              </p>
              <p className="text-2xl md:text-3xl font-black text-background mb-6">
                Personal Website – Coming Soon
              </p>
              <p className="text-background/90 mb-8 max-w-2xl mx-auto">
                Научи повече за личния път на Шон Иса и неговото развитие
              </p>
              <Button
                size="lg"
                variant="default"
                className="bg-background text-primary hover:bg-background/90"
                onClick={() => window.location.href = '/archive/diagnostic'}
              >
                🔥 ВИЖ КАК ЩЕ РАБОТИ ЗА ТЕБ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
