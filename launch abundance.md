• 📋 ПЪЛЕН ТЕХНИЧЕСКИ ПРОДУКТ ОУТЛАЙН (Technical Product Outline)  
  ═══════════════════════════════════════════════════════════════

  CODE: ABUNDANCE™ DIAGNOSTIC FUNNEL v1.0

  За: Софтуерен Девелопер  
  Дата: 22.02.2026  
  Дедлайн: 24 часа (MVP) / 7 дни (Full Version)  
  Бюджет: MVP €1000-2000 / Full €5000-8000

  ─────────────────────────────────────────────────────────────────────────────────────  
  1\. АРХИТЕКТУРА НА СИСТЕМАТА

  1.1 High-Level Architecture

  ┌─────────────────────────────────────────────────────────────┐  
  │                        КЛИЕНТ                               │  
  │  (Браузър/Mobile)                                           │  
  └──────────────────────┬──────────────────────────────────────┘  
                         │  
                         ▼  
  ┌─────────────────────────────────────────────────────────────┐  
  │                    FRONTEND LAYER                           │  
  │  • Landing Page (Next.js/Vercel)                           │  
  │  • Typeform Embed (Widget)                                 │  
  │  • Thank You Page                                          │  
  └──────────────────────┬──────────────────────────────────────┘  
                         │  
                         ▼  
  ┌─────────────────────────────────────────────────────────────┐  
  │                    BACKEND LAYER                            │  
  │  • API Routes (Next.js API or CloudCode)                   │  
  │  • Webhook Handlers                                        │  
  │  • Database (Supabase/PostgreSQL)                          │  
  └──────────────────────┬──────────────────────────────────────┘  
                         │  
          ┌──────────────┼──────────────┐  
          ▼              ▼              ▼  
  ┌──────────┐   ┌──────────┐   ┌──────────────┐  
  │ Typeform │   │   AI     │   │ Email Service│  
  │  (API)   │   │ (OpenAI) │   │(SendGrid/   │  
  │          │   │          │   │ ConvertKit)  │  
  └──────────┘   └──────────┘   └──────────────┘

  1.2 Data Flow (Поток на данните)

  1\. User Entry → Landing Page (Vercel)  
  2\. Form Submit → Typeform (9 екрана)  
  3\. Webhook Trigger → Backend API endpoint (/api/webhook/typeform)  
  4\. Data Processing → AI Analysis (OpenAI API)  
  5\. PDF Generation → PDFKit / Puppeteer  
  6\. Storage → Cloudinary/AWS S3 (за PDF)  
  7\. Email Send → SendGrid API (Email \+ PDF attachment)  
  8\. Email Sequence → ConvertKit/Mailchimp Automation

  ─────────────────────────────────────────────────────────────────────────────────────  
  2\. FRONTEND СПЕЦИФИКАЦИИ

  2.1 Tech Stack

   Компонент   Технология                   Алтернатива  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
   Framework   Next.js 14 (App Router)      React \+ Vite  
   Hosting     Vercel                       Netlify  
   Styling     Tailwind CSS                 Styled Components  
   Forms       Typeform Embed               Tally.so  
   Analytics   Google Analytics 4 \+ Pixel   Plausible  
   Fonts       Inter (Google Fonts)         Local fonts

  2.2 Страници и Рутове

  /                           → Landing Page (Hero \+ CTA)  
  /diagnose                   → Redirect към Typeform (или Embed)  
  /thank-you                  → Thank You Page (след Typeform)  
  /api/webhook/typeform       → Webhook endpoint (POST)  
  /api/generate-pdf           → PDF Generation (POST)  
  /api/send-email             → Email sending (POST)

  2.3 Landing Page Структура (Компоненти)

  Hero Section

  // Компоненти:  
  \- \<Hero /\>  
    \- \<Countdown /\> (Остават X места \- динамично)  
    \- \<Headline /\> ("Ключът към изобилието...")  
    \- \<Subheadline /\> (Описание)  
    \- \<CTAButton /\> (→ Typeform)  
    \- \<SocialProof /\> (Брояч: "Вече 1,200+ анализа")

  Ключови Секции

  1\. Problem Section (Защо хаосът е проблем)  
  2\. How It Works (3 стъпки: Диагностика → План → Действие)  
  3\. For Who (4 таба: Начинаещи, Опитни, Криейтъри, Готови за промяна)  
  4\. FAQ (3 въпроса само за MVP)  
  5\. Final CTA (Последен бутон за диагностиката)

  Responsive Breakpoints

  • Mobile: \< 640px (единична колона)  
  • Tablet: 640px \- 1024px (2 колони)  
  • Desktop: \> 1024px (3-4 колони)

  2.4 Typeform Интеграция

  Опция A: Embed (Препоръчително за MVP)

  \<div data-tf-widget="TYPEFORM\_ID"  
       data-tf-opacity="100"  
       data-tf-inline-on-mobile  
       data-tf-redirect-target="\_self"  
       style="width:100%;height:600px;"\>  
  \</div\>  
  \<script src="https://embed.typeform.com/next/embed.js"\>\</script\>

  Опция B: Redirect Бутонът отвежда към: https://form.typeform.com/to/XXXXXX?name=defau  
  lt

  ─────────────────────────────────────────────────────────────────────────────────────  
  3\. TYPEFORM СТРУКТУРА (Детайлно)

  3.1 Form Logic & Flowchart

  Start  
    ↓  
  \[Welcome Screen\] (Опт-in екран)  
    \- Име, Имейл, Телефон  
    \- Lead Magnet: "Трансформацията започва с теб" PDF  
    ↓  
  \[Screen 2\] \- Life Audit (7 сфери)  
    \- Финанси (1-10)  
    \- Бизнес (1-10)  
    \- Здраве (1-10)  
    \- Ментално здраве (1-10)  
    \- Романтика (1-10)  
    \- Социален живот (1-10)  
    \- Мисия/Цел (1-10)  
    ↓  
  \[Screen 3\] \- Приоритети (Multi-select, max 3\)  
    \- Кои са ТОП 3 сфери за фокус?  
    ↓  
  \[Screen 4\] \- Цели (Conditional Logic)  
    \- За всяка избрана сфера от Screen 3:  
      \- Каква е целта ти (1-10) след 90 дни?  
    ↓  
  \[Screen 5\] \- Core Code (Birth Data)  
    \- Рождена дата (ДД.ММ.ГГГГ)  
    \- Час на раждане (ЧЧ:ММ) \+ опция "Не знам"  
    \- Град/Държава  
    ↓  
  \[Screen 6\] \- Commitment  
    \- Колко си готов да изпълниш плана?  
      \- High (100%)  
      \- Medium (Нужда от насоки)  
      \- Low (Проучвам)  
    ↓  
  \[Screen 7\] \- Resources  
    \- Месечен доход:  
      \- under\_1k, 1k-3k, 3k-6k, 6k-10k, over\_10k (EUR)  
    ↓  
  \[Screen 8\] \- Contact Confirmation  
    \- Потвърждение на имейл/телефон  
    ↓  
  \[End Screen\] \- Redirect to /thank-you  
    \- Съобщение: "Анализът се генерира..."  
    \- Бутон: "Гледай видеото" (VSL)

  3.2 Typeform Hidden Fields (За Tracking)

  Задай тези hidden fields в Typeform за да получаваш:

  • utm\_source (откъде идва трафика)  
  • utm\_medium (organic/paid)  
  • utm\_campaign (име на кампанията)  
  • referral\_code (ако има)

  ─────────────────────────────────────────────────────────────────────────────────────  
  4\. BACKEND СПЕЦИФИКАЦИИ

  4.1 Database Schema (PostgreSQL/Supabase)

  \-- Таблица: submissions  
  CREATE TABLE submissions (  
    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
    typeform\_response\_id VARCHAR(255) UNIQUE,  
    user\_name VARCHAR(255),  
    user\_email VARCHAR(255) UNIQUE,  
    user\_phone VARCHAR(50),

    \-- Life Audit Scores (JSON за гъвкавост)  
    scores JSONB DEFAULT '{  
      "finances": 0, "business": 0, "health": 0,  
      "mental": 0, "romantic": 0, "social": 0, "mission": 0  
    }',

    \-- Приоритети и цели  
    priority\_top3 TEXT\[\],  
    goals JSONB,

    \-- Core Code  
    birth\_date DATE,  
    birth\_time TIME,  
    birth\_city VARCHAR(255),  
    birth\_country VARCHAR(255),

    \-- Meta  
    commitment\_level VARCHAR(50),  
    income\_level VARCHAR(50),  
    utm\_source VARCHAR(255),

    \-- Status  
    status VARCHAR(50) DEFAULT 'pending', \-- pending, processing, completed, failed      
    pdf\_url TEXT,  
    email\_sent BOOLEAN DEFAULT false,  
    created\_at TIMESTAMP DEFAULT NOW(),  
    updated\_at TIMESTAMP DEFAULT NOW()  
  );

  \-- Таблица: email\_logs  
  CREATE TABLE email\_logs (  
    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
    submission\_id UUID REFERENCES submissions(id),  
    email\_type VARCHAR(100), \-- welcome, nurture\_1, nurture\_2, etc.  
    sent\_at TIMESTAMP DEFAULT NOW(),  
    opened BOOLEAN DEFAULT false,  
    clicked BOOLEAN DEFAULT false  
  );

  4.2 API Endpoints

  Webhook от Typeform

  // POST /api/webhook/typeform  
  // Headers: Authorization Bearer TOKEN

  // Body (Typeform payload):  
  {  
    "event\_id": "uuid",  
    "event\_type": "form\_response",  
    "form\_response": {  
      "form\_id": "XXXX",  
      "token": "unique\_response\_id",  
      "submitted\_at": "2026-02-22T14:00:00Z",  
      "hidden": { "utm\_source": "facebook" },  
      "answers": \[  
        { "field": { "ref": "name" }, "text": "Иван" },  
        { "field": { "ref": "email" }, "email": "ivan@example.com" },  
        // ... всички отговори  
      \]  
    }  
  }

  // Response: 200 OK  
  // Actions:  
  // 1\. Записва в базата данни  
  // 2\. Trigger-ва AI анализ (async)  
  // 3\. Добавя в email list (async)

  PDF Generation (За MVP може да е ръчно, за Full \- автоматично)

  // POST /api/generate-pdf  
  // Body: { submission\_id: "uuid" }

  // Process:  
  // 1\. Взима данни от базата  
  // 2\. Изпраща към OpenAI за генериране на текстове  
  // 3\. Генерира PDF с PDFKit/Puppeteer  
  // 4\. Качва в Cloudinary/S3  
  // 5\. Update-ва pdf\_url в базата  
  // 6\. Изпраща имейл

  4.3 AI Integration (OpenAI API)

  Prompt Structure (както си го описал, но технически):

  // OpenAI API Call  
  const completion \= await openai.chat.completions.create({  
    model: "gpt-4-turbo-preview",  
    messages: \[  
      {  
        role: "system",  
        content: \`Ти си CODE: ABUNDANCE AI Diagnostic Agent... \[целият prompt от предиш  
  ното съобщение\]\`  
      },  
      {  
        role: "user",  
        content: JSON.stringify(formData)  
      }  
    \],  
    response\_format: { type: "json\_object" }  
  });

  // Очакван Response:  
  {  
    "hd\_type\_profile": "Генератор 5/1",  
    "hd\_strategy": "Да Откликваш",  
    "life\_path\_number": "8",  
    "astro\_triad": "Слънце в Овен, Луна в Телец, Асцендент Везни",  
    "hd\_analysis\_text": "...",  
    "life\_path\_analysis\_text": "...",  
    "astro\_analysis\_text": "...",  
    "pizza\_analysis\_text": "...",  
    "generated\_phase1\_text": "...",  
    "generated\_phase2\_text": "...",  
    "generated\_phase3\_text": "..."  
  }

  ─────────────────────────────────────────────────────────────────────────────────────  
  5\. EMAIL АВТОМАЦИЯ

  5.1 Интеграция с Email Service Provider (ESP)

  Препоръка: ConvertKit или Mailchimp (и двата имат добри automation-и)

  Webhook Flow:

  Typeform Submit  
    → Zapier/Make  
      → Add to ESP List (Tag: "Diagnosis Complete")  
        → Trigger Automation Sequence

  5.2 Email Sequence (5 имейла)

   Имейл         Тригер          Закъснение   Съдържание  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
   Welcome       Form Submit     Immediate    PDF Attachment \+ VSL Link  
   Value         Open Email 1    24 часа      История \+ Soft Sell  
   Objection     Not Opened \#2   \+24h         "Цената на хаоса"  
   Scarcity      Day 3           \+24h         "Ограничени места"  
   Last Chance   Day 5           \+48h         Final CTA или Unsubscribe

  5.3 Transactional Emails (SendGrid)

  За изпращане на PDF-а (технически по-надеждно от ESP):

  • API Key интеграция  
  • Attachment handling (PDF от Cloudinary)  
  • Templates с dynamic content (Handlebars)

  ─────────────────────────────────────────────────────────────────────────────────────  
  6\. SECURITY & COMPLIANCE

  6.1 GDPR (Задължително за ЕС)

  Трябва да има:

  • \[ \] Cookie Consent Banner (OneTrust или CookieBot)  
  • \[ \] Privacy Policy страница  
  • \[ \] Terms of Service страница  
  • \[ \] Checkbox в Typeform: "Съгласен съм с обработката на лични данни"  
  • \[ \] "Unsubscribe" линк във всеки имейл  
  • \[ \] Data Deletion процедура (Right to be forgotten)

  6.2 Security Headers (Vercel)

  // next.config.js  
  module.exports \= {  
    async headers() {  
      return \[  
        {  
          source: '/(.\*)',  
          headers: \[  
            {  
              key: 'X-Content-Type-Options',  
              value: 'nosniff',  
            },  
            {  
              key: 'X-Frame-Options',  
              value: 'DENY',  
            },  
            {  
              key: 'X-XSS-Protection',  
              value: '1; mode=block',  
            },  
          \],  
        },  
      \];  
    },  
  };

  6.3 Rate Limiting

  // За webhook endpoint-овете  
  // Използвай: https://github.com/vercel/next.js/tree/canary/examples/api-routes-rate-  
  limit  
  // Лимит: 10 requests per IP per minute

  ─────────────────────────────────────────────────────────────────────────────────────  
  7\. THIRD-PARTY ИНТЕГРАЦИИ

  7.1 Задължителни

   Сервис       Purpose               Cost             Setup Time  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
   Vercel       Hosting               €0-20/мес        30 мин  
   Supabase     Database              €0-25/мес        1 час  
   Typeform     Forms                 €25/мес          2 часа  
   SendGrid     Transactional Email   €0 (100/ден)     1 час  
   ConvertKit   Email Automation      €29/мес          2 часа  
   Cloudinary   PDF Storage           €0-25/мес        30 мин  
   OpenAI       AI Analysis           \~€0.01/request   30 мин

  7.2 Optional (за по-късно)

   Сервис               Purpose  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
   Hotjar               Heatmaps & Recordings  
   Google Tag Manager   Pixel Management  
   Zapier/Make          Advanced Automations  
   Calendly             Booking Calls

  ─────────────────────────────────────────────────────────────────────────────────────  
  8\. DEPLOYMENT & DEVOPS

  8.1 Environment Variables (.env.local)

  \# Database  
  DATABASE\_URL="postgresql://..."  
  SUPABASE\_ANON\_KEY="..."  
  SUPABASE\_SERVICE\_ROLE\_KEY="..."

  \# APIs  
  OPENAI\_API\_KEY="sk-..."  
  TYPEFORM\_API\_KEY="..."  
  SENDGRID\_API\_KEY="SG..."  
  CONVERTKIT\_API\_KEY="..."

  \# Storage  
  CLOUDINARY\_CLOUD\_NAME="..."  
  CLOUDINARY\_API\_KEY="..."  
  CLOUDINARY\_API\_SECRET="..."

  \# Tracking  
  NEXT\_PUBLIC\_GA\_ID="G-..."  
  NEXT\_PUBLIC\_FB\_PIXEL\_ID="..."

  8.2 Deployment Checklist

  Преди пускане:

  • \[ \] Всички env variables са зададени в Vercel  
  • \[ \] Database migrations са изпълнени  
  • \[ \] Typeform webhook е тестван (ngrok за локално тестване)  
  • \[ \] Email templates са тествани (spam тест)  
  • \[ \] Mobile responsive тест (Chrome DevTools)  
  • \[ \] PageSpeed Insights \> 90  
  • \[ \] GDPR банер е активен  
  • \[ \] SSL сертификат е активен (автоматично на Vercel)

  ─────────────────────────────────────────────────────────────────────────────────────  
  9\. MVP vs FULL VERSION (Приоритизация)

  MVP (24 часа) \- Must Have

  Frontend:

  • \[ \] Landing Page (Hero \+ 3 секции \+ FAQ)  
  • \[ \] Thank You Page  
  • \[ \] Typeform Embed (без conditional logic за сега)

  Backend:

  • \[ \] Webhook endpoint (записва в базата)  
  • \[ \] Email изпращане (ручно или полу-автоматично)  
  • \[ \] База данни (проста таблица)

  AI:

  • \[ \] Ръчно генериране на анализа (ти използваш ChatGPT и пращаш PDF ръчно първите пъ  
    )

  Full Version (7 дни) \- Nice to Have

  • \[ \] Автоматична PDF генерация  
  • \[ \] Human Design API интеграция (mybodygraph.com или similar)  
  • \[ \] Астро калкулации (swisseph или външен API)  
  • \[ \] Пълна Email automation  
  • \[ \] User Dashboard (да виждат PDF-а си онлайн)  
  • \[ \] Admin Panel (да управляваш submission-ите)

  ─────────────────────────────────────────────────────────────────────────────────────  
  10\. КОДОВИ ПРИМЕРИ

  10.1 Webhook Handler (Next.js API Route)

  // app/api/webhook/typeform/route.ts  
  import { NextResponse } from 'next/server';  
  import { createClient } from '@supabase/supabase-js';

  const supabase \= createClient(  
    process.env.SUPABASE\_URL\!,  
    process.env.SUPABASE\_SERVICE\_ROLE\_KEY\!  
  );

  export async function POST(request: Request) {  
    try {  
      const body \= await request.json();

      // Валидация на webhook-a (Typeform подпис)  
      // const signature \= request.headers.get('typeform-signature');

      // Парсване на отговорите  
      const answers \= body.form\_response.answers;  
      const hidden \= body.form\_response.hidden;

      // Мапване на полетата  
      const submission \= {  
        typeform\_response\_id: body.form\_response.token,  
        user\_name: getAnswerByRef(answers, 'name'),  
        user\_email: getAnswerByRef(answers, 'email'),  
        // ... всички останали полета

        status: 'pending',  
        utm\_source: hidden?.utm\_source || 'organic'  
      };

      // Запис в базата  
      const { data, error } \= await supabase  
        .from('submissions')  
        .insert(submission)  
        .select()  
        .single();

      if (error) throw error;

      // Trigger async processing (AI \+ Email)  
      // Може да използваш Inngest, QStash, или просто fetch към друг endpoint  
      await fetch(\`${process.env.VERCEL\_URL}/api/process-submission\`, {  
        method: 'POST',  
        body: JSON.stringify({ submission\_id: data.id }),  
        headers: { 'Authorization': \`Bearer ${process.env.INTERNAL\_API\_KEY}\` }  
      });

      return NextResponse.json({ success: true });

    } catch (error) {  
      console.error('Webhook error:', error);  
      return NextResponse.json(  
        { error: 'Internal server error' },  
        { status: 500 }  
      );  
    }  
  }

  function getAnswerByRef(answers: any\[\], ref: string) {  
    const answer \= answers.find(a \=\> a.field.ref \=== ref);  
    return answer?.\[answer.type\] || null;  
  }

  ─────────────────────────────────────────────────────────────────────────────────────  
  11\. ЧЕКЛИСТ ЗА ДЕВЕЛОПЕРА

  Phase 1: Setup (Час 1-2)

  • \[ \] Създаване на Vercel проект  
  • \[ \] Свързване с GitHub repo  
  • \[ \] Настройка на Supabase проект  
  • \[ \] Настройка на Typeform акаунт  
  • \[ \] Настройка на SendGrid

  Phase 2: Database (Час 3\)

  • \[ \] Създаване на таблиците (SQL скриптовете горе)  
  • \[ \] Настройка на RLS policies (Row Level Security)  
  • \[ \] Тестване на connection

  Phase 3: Frontend (Час 4-8)

  • \[ \] Landing Page layout  
  • \[ \] Responsive design  
  • \[ \] Typeform embed  
  • \[ \] Thank You page  
  • \[ \] GDPR банер

  Phase 4: Backend (Час 9-12)

  • \[ \] Webhook endpoint  
  • \[ \] Data parsing  
  • \[ \] Database insert  
  • \[ \] Error handling

  Phase 5: Email (Час 13-16)

  • \[ \] Email templates (HTML)  
  • \[ \] SendGrid integration  
  • \[ \] Automation rules в ConvertKit  
  • \[ \] Testing (spam проверка)

  Phase 6: Testing (Час 17-20)

  • \[ \] End-to-end тест (попълни формата, провери имейла)  
  • \[ \] Mobile testing  
  • \[ \] Load testing (webhook-а издържа ли много заявки?)  
  • \[ \] Security audit

  Phase 7: Deployment (Час 21-24)

  • \[ \] Production deploy  
  • \[ \] Domain настройка (codeabundance.com)  
  • \[ \] SSL проверка  
  • \[ \] Analytics проверка  
  • \[ \] Backup strategy

  ─────────────────────────────────────────────────────────────────────────────────────  
  12\. БЮДЖЕТ ЗА ИНФРАСТРУКТУРА (Месечен)

   Сервис              MVP Cost          Scale Cost (10k users)  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
   Vercel Pro          €20               €20  
   Supabase Pro        €25               €75  
   Typeform Business   €25               €50  
   SendGrid            €0 (до 100/ден)   €20  
   ConvertKit          €29               €79  
   OpenAI API          €10               €100  
   Cloudinary          €0                €25  
   ОБЩО                \~€110/мес         \~€370/мес

  ─────────────────────────────────────────────────────────────────────────────────────  
  Готово за изпращане на девелопера?

  Ако има въпроси по конкретна част (например "Как точно да настрои Typeform webhook-а"  
  ), мога да разширя с още детайли.  
