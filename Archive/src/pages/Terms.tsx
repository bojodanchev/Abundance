import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-foreground">
            Общи Условия
          </h1>
          
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                1. Приемане на условията
              </h2>
              <p className="leading-relaxed mb-4">
                Чрез достъп или използване на услугите на CODE: ABUNDANCE™, вие се съгласявате да 
                бъдете обвързани от тези Общи условия. Ако не сте съгласни с тези условия, моля не 
                използвайте нашите услуги.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                2. Описание на услугите
              </h2>
              <p className="leading-relaxed mb-4">
                CODE: ABUNDANCE™ предоставя образователно съдържание, менторски програми и ресурси, 
                фокусирани върху личностно развитие, бизнес стратегия и създаване на богатство. 
                Услугите включват:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Abundance Diagnostic™ — персонализиран анализ и диагностика</li>
                <li>Human Design анализи</li>
                <li>WEALTH LAB — Бизнес системи, продажби, финансова интелигентност, трейдинг</li>
                <li>HEALTH LAB — Дълголетие, биохакинг, фитнес и хранене</li>
                <li>PROSPERITY LAB — Mindset, продуктивност, лидерство</li>
                <li>RELATIONSHIP LAB — Взаимоотношения и социални умения</li>
                <li>Достъп до SPACE CIRCLE общност</li>
                <li>12-степенна система за развитие</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                3. Възрастово изискване
              </h2>
              <p className="leading-relaxed mb-4">
                Нашите услуги са предназначени за лица на възраст 18 години или по-възрастни. 
                Ако сте под 18 години и желаете да се присъедините, моля обсъдете това с родител 
                или настойник. Използвайки нашите услуги, вие декларирате, че сте най-малко на 18 години.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                4. Липса на финансови или инвестиционни съвети
              </h2>
              <p className="leading-relaxed mb-4">
                <strong className="text-foreground">Важна декларация:</strong> Информацията, предоставена 
                чрез CODE: ABUNDANCE™, е само за образователни и информационни цели. Тя НЕ представлява 
                финансов, инвестиционен, правен или професионален съвет.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ние НЕ сме лицензирани финансови съветници или инвестиционни професионалисти</li>
                <li>Резултатите могат да варират значително въз основа на индивидуалните обстоятелства</li>
                <li>Минали резултати НЕ гарантират бъдещи резултати</li>
                <li>Трябва да се консултирате с квалифицирани специалисти преди да вземате финансови решения</li>
                <li>Всеки предприемач знае, че бизнесът има своите рискове и разходи</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                5. Информация за недвижими имоти и заеми
              </h2>
              <p className="leading-relaxed mb-4">
                Всяка информация относно недвижими имоти, ипотеки или заеми се предоставя само за 
                образователни цели. Условията подлежат на индивидуални обстоятелства и одобрение от 
                съответните финансови институции или партньори.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                6. Плащане и възстановявания
              </h2>
              <p className="leading-relaxed mb-4">
                Условията за плащане варират според програмата:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Диагностики и дигитални продукти: изисква се плащане преди достъп</li>
                <li>Менторски програми: условията се уточняват в индивидуални споразумения</li>
                <li>Политика за възстановяване: специфицирана за всяка програма или в рамките на 7 дни, ако не е посочено друго</li>
                <li>Динамично ценообразуване: цените се повишават редовно с добавянето на нови членове и ресурси</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                7. Отговорности на потребителя
              </h2>
              <p className="leading-relaxed mb-4">
                Вие се съгласявате да:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Предоставяте точна информация</li>
                <li>Поддържате поверителността на вашия акаунт</li>
                <li>НЕ споделяте или разпространявате собствено съдържание</li>
                <li>Използвате услугите само за законни цели</li>
                <li>Уважавате правата на интелектуална собственост</li>
                <li>Прилагате наученото с дисциплина и последователност</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                8. Интелектуална собственост
              </h2>
              <p className="leading-relaxed mb-4">
                Цялото съдържание, материали, рамки и методологии, предоставени чрез CODE: ABUNDANCE™, 
                са защитени от законите за авторски права и търговски марки. Не можете да възпроизвеждате, 
                разпространявате или създавате производни произведения без изрично писмено разрешение. 
                Това включва всички модули от WEALTH LAB, HEALTH LAB, PROSPERITY LAB и RELATIONSHIP LAB.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                9. Ограничение на отговорността
              </h2>
              <p className="leading-relaxed mb-4">
                До най-голямата степен, разрешена от закона, CODE: ABUNDANCE™ и неговите филиали не носят 
                отговорност за каквито и да е непреки, случайни, специални, последващи или наказателни 
                щети, произтичащи от вашето използване на нашите услуги.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                10. Прекратяване
              </h2>
              <p className="leading-relaxed mb-4">
                Запазваме си правото да прекратим или спрем достъпа до нашите услуги по всяко време, 
                без предизвестие, за поведение, което считаме, че нарушава тези Условия или е вредно 
                за други потребители или за нас.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                11. Промени в условията
              </h2>
              <p className="leading-relaxed mb-4">
                Можем да променим тези Условия по всяко време. Промените влизат в сила незабавно след 
                публикуването им. Вашето продължаващо използване на нашите услуги след публикуването на 
                промените представлява приемане на променените Условия.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                12. Приложимо право
              </h2>
              <p className="leading-relaxed mb-4">
                Тези Условия се управляват от законите на Република България. Всички спорове се решават 
                в съдилищата на България.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                13. Контактна информация
              </h2>
              <p className="leading-relaxed">
                За въпроси относно тези Условия, свържете се с нас на:{" "}
                <a href="mailto:sean@codeabundance.com" className="text-primary hover:underline font-semibold">
                  sean@codeabundance.com
                </a>
              </p>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg border border-border">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                ⚠️ Важни декларации
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  <strong className="text-foreground">Образователна цел:</strong> CODE: ABUNDANCE™ е образователна 
                  платформа. Всички резултати зависят от вашето прилагане на наученото.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-foreground">Без гаранции за резултати:</strong> Не гарантираме специфични 
                  финансови резултати. Успехът зависи от множество фактори, включително вашата дисциплина, 
                  пазарни условия и лични обстоятелства.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-foreground">Инвестиционен риск:</strong> Всяка информация за трейдинг, 
                  инвестиции или финансови пазари е за образователни цели. Винаги консултирайте лицензиран 
                  финансов съветник преди инвестиционни решения.
                </p>
              </div>
            </section>

            <div className="pt-8 border-t border-border">
              <p className="text-sm">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
