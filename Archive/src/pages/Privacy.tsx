import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-foreground">
            Политика за Поверителност
          </h1>
          
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                1. Информация, която събираме
              </h2>
              <p className="leading-relaxed mb-4">
                Събираме информация, която ни предоставяте директно, включително име, имейл адрес, 
                телефонен номер и всяка друга информация, която изберете да споделите, когато:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Попълвате формуляри на нашия уебсайт</li>
                <li>Абонирате се за нашия бюлетин или програми</li>
                <li>Свързвате се с нас чрез имейл, Telegram или други канали</li>
                <li>Участвате в нашите менторски програми и диагностични анализи</li>
                <li>Използвате нашата платформа SPACE CIRCLE</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                2. Как използваме вашата информация
              </h2>
              <p className="leading-relaxed mb-4">
                Използваме събраната информация, за да:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Предоставяме, поддържаме и подобряваме нашите услуги и образователни програми</li>
                <li>Изпращаме ви образователно съдържание, актуализации и маркетингови съобщения</li>
                <li>Отговаряме на вашите коментари, въпроси и заявки</li>
                <li>Обработваме транзакции и изпращаме свързана информация</li>
                <li>Създаваме персонализирани Human Design анализи и диагностични доклади</li>
                <li>Наблюдаваме и анализираме тенденции, използване и дейности</li>
                <li>Осигуряваме достъп до общността и менторските програми</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                3. Споделяне на информация
              </h2>
              <p className="leading-relaxed mb-4">
                Ние <strong className="text-foreground">НЕ ПРОДАВАМЕ</strong> вашата лична информация. Можем да споделим вашата информация с:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Доставчици на услуги, които изпълняват услуги от наше име</li>
                <li>Партньори за анализ и реклама (с ваше съгласие)</li>
                <li>Правоприлагащи органи, когато се изисква от закона</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                4. Бисквитки и технологии за проследяване
              </h2>
              <p className="leading-relaxed mb-4">
                Използваме бисквитки и подобни технологии за проследяване, за да събираме информация 
                за вашите дейности при разглеждане. Можете да контролирате бисквитките чрез настройките 
                на вашия браузър и нашия банер за съгласие за бисквитки.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                5. Сигурност на данните
              </h2>
              <p className="leading-relaxed mb-4">
                Прилагаме подходящи технически и организационни мерки за защита на вашата лична информация. 
                Въпреки това, нито един метод на предаване по интернет не е 100% сигурен.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                6. Вашите права
              </h2>
              <p className="leading-relaxed mb-4">
                Имате право да:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Получите достъп до вашата лична информация</li>
                <li>Коригирате неточна информация</li>
                <li>Поискате изтриване на вашата информация</li>
                <li>Откажете да получавате маркетингови съобщения</li>
                <li>Оттеглите съгласието си по всяко време</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                7. Поверителност на деца
              </h2>
              <p className="leading-relaxed mb-4">
                Нашите услуги са предназначени за лица на възраст 18 години или по-възрастни. 
                Не събираме съзнателно информация от деца под 18 години. Ако сте под 18 години и 
                желаете да се присъедините към програмата, моля обсъдете това с родител или настойник.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                8. Промени в тази политика
              </h2>
              <p className="leading-relaxed mb-4">
                Можем да актуализираме тази Политика за поверителност от време на време. Ще ви уведомим 
                за всякакви промени, като публикуваме новата политика на тази страница и актуализираме 
                датата "Последна актуализация".
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                9. Свържете се с нас
              </h2>
              <p className="leading-relaxed">
                Ако имате въпроси относно тази Политика за поверителност, моля свържете се с нас на:{" "}
                <a href="mailto:sean@codeabundance.com" className="text-primary hover:underline font-semibold">
                  sean@codeabundance.com
                </a>
              </p>
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

export default Privacy;
