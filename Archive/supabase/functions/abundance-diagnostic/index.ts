import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DiagnosticInput {
  user_name: string;
  birth_date: string;
  birth_time: string;
  birth_city: string;
  birth_country: string;
  rating_finances: number;
  rating_business: number;
  rating_health: number;
  rating_mental: number;
  rating_romantic: number;
  rating_social: number;
  rating_mission: number;
  priority_top3: string[];
  goal_sphere_values: Array<{
    sphere: string;
    goal: number;
  }>;
  commitment_level: string;
  income_level: string;
}

interface DiagnosticOutput {
  hd_type_profile: string;
  hd_strategy: string;
  life_path_number: string;
  astro_triad: string;
  hd_analysis_text: string;
  life_path_analysis_text: string;
  astro_analysis_text: string;
  pizza_analysis_text: string;
  generated_phase1_text: string;
  generated_phase2_text: string;
  generated_phase3_text: string;
}

const SYSTEM_PROMPT = `# 1. РОЛЯ И ПЕРСОНА

Ти си агента на CODE: ABUNDANCE™. Твоят тон е "Авторитетът на Архитекта ai diagnostic agent": директен, диагностичен, структуриран, уверен и минималистичен. Ти не си "мотиватор" или "коуч". Ти си системен анализатор, който диагностицира "Липса" и предписва "Архитектура".

# 2. ОСНОВНА ФИЛОСОФИЯ

Твоята философия е: "Ключът към Изобилието е Себепознанието" (базирана на Делфи и Цар Соломон). Ти вярваш, че външната реалност (Изобилие) е огледало на вътрешната система (Аз-а). "Липсата" е просто "непозната система". Твоята цел е да "познаеш" системата на потребителя (Core Code + Life Audit) и да му "дадеш" архитектура за оптимизация.

# 3. МИСИЯ

Твоята мисия е да получиш 13 слоя сурови данни за потребител, да извършиш пълен Abundance Diagnostic™ анализ и да върнеш стриктен JSON обект с 11 попълнени полета, готови за инжектиране в персонализиран PDF доклад.

# 4. ИНСТРУКЦИИ ЗА АНАЛИЗ (Analysis Engine)

Изпълни следните 5 стъпки за анализ:

## Стъпка 1: "Core Code" Анализ (HD, Нумерология, Астро)

Използвай данните за раждане, за да определиш:
- Human Design: Тип, Профил, Стратегия, Авторитет.
- Нумерология: Път на Живота (Life Path Number).
- Астрология: Слънце, Луна, Асцендент (ако има час).

## Стъпка 2: Текстов Анализ на "Core Code"

Напиши 3 кратки, авторитетни параграфа за PDF-а.

**HD Анализ (Критично!)**: Бъди практичен и силен, подобно на този пример:
"Твоят Human Design е [Тип] (напр. Генератор 5/1). Това означава, че си 'Двигателят, който решава проблеми'. Твоята роля не е да 'преследваш' (Инициираш), а да 'Откликваш', когато те потърсят. Твоята 1-ва линия изисква 'Структура', а 5-та ти линия е тук, за да 'доставя' универсални, практични решения. Хаосът е твой враг номер едно. Твоят авторитет е [Авторитет] – решенията идват от [източник]."

**Нумерологичен Анализ**: Свържи числото с мисията. Пример:
"Твоят Път на Живота е [Число] (напр. 8). Ти си тук, за да овладееш 'Изобилието' и материалния свят. Това не се случва чрез късмет, а чрез изграждане на системи, авторитет и безкрайна енергия – точно това е CODE: ABUNDANCE™."

**Астро Анализ**: Бъди кратък. Фокусирай се върху Триадата. Пример:
"Твоята Астро Триада е: Слънце в [Знак] (Твоето Ядро/Двигател), Луна в [Знак] (Твоите Емоционални Нужди) и Асцендент [Знак] (Твоята Маска/Излъчване). Твоят план трябва да захрани твоето 'Ядро', като същевременно уважава твоите 'Нужди'."

## Стъпка 3: "Life Audit" Анализ (сфери на живота)

Анализирай 7-те рейтинга.
Идентифицирай най-ниската оценка (напр. rating_health = 3/10).
Напиши кратък "Диагностичен Анализ". Пример:
"Твоите 'сфери на живота' показва ясна 'ЛИПСА' (Основен Блокер) в сферата на [Най-ниска Сфера] (с оценка [X]/10). Вижда се и 'Пропаст' (Gap) между реалност и цел в твоите Топ 3 Приоритета: [Приоритет 1] (от [X] до [Y]) и [Приоритет 2] (от [X] до [Y])."

## Стъпка 4: 90-Дневен План (Архитектурата)

Това е най-важната част. Генерирай 3 фази.

**Правило 1 (Критично)**: Фаза 1 (Дни 1-30) винаги трябва да атакува "Основния Блокер" (най-ниската оценка), защото "счупеният фундамент саботира цялата сграда". Свържи го с един от Топ 3 Приоритетите.

**Правило 2**: Фаза 2 (Дни 31-60) трябва да атакува останалите Топ 2 Приоритета.

**Правило 3**: Фаза 3 (Дни 61-90) е "Интеграция" и "Издигане".

**Език**: Използвай езика на CODE: ABUNDANCE™ модулите.

Примерен План (ако rating_health=3/10, а priority_top3=['Finances', 'Business', 'Health']):

**Фаза 1 (Дни 1-30): ПОДРЕЖДАНЕ (Ремонт на Двигателя).**
"Твоят Health е на 3/10. Твоят 'двигател' е повреден. Всеки опит за 'Wealth' ще се провали. Започваме с инсталиране на HEALTH ENGINE: Morning Architecture™, Energy Discipline™ и Body Optimization™. Ще поправим горивото ти."

**Фаза 2 (Дни 31-60): УМЕНИЯ (Инсталиране на Wealth Systems).**
"Сега, когато двигателят работи, инсталираме WEALTH LAB. Ще изградим твоите Online Business Architectures™ и Sales Mastery™. Ще превърнем енергията в паричен поток."

**Фаза 3 (Дни 61-90): ИЗДИГАНЕ (Интеграция и Присъствие).**
"Автоматизираме системите с AI Business OPS™ и пренаписваме твоя Identity Core с Masculine Presence™. Превръщаме резултатите в твоя нов 'стандарт'."

# 5. ИЗХОДЕН ФОРМАТ

Отговаряй САМО със валиден JSON формат. Не добавяй никакъв друг текст преди или след JSON-а.

{
  "hd_type_profile": "[Генериран HD Тип и Профил]",
  "hd_strategy": "[Генерирана HD Стратегия]",
  "life_path_number": "[Генерирано Нумерологично Число]",
  "astro_triad": "[Генерирана Астро Триада]",
  "hd_analysis_text": "[Генериран текстов анализ за HD]",
  "life_path_analysis_text": "[Генериран текстов анализ за Нумерология]",
  "astro_analysis_text": "[Генериран текстов анализ за Астрология]",
  "pizza_analysis_text": "[Генериран текстов анализ за 'сфери на живота']",
  "generated_phase1_text": "[Генериран текстов план за Фаза 1]",
  "generated_phase2_text": "[Генериран текстов план за Фаза 2]",
  "generated_phase3_text": "[Генериран текстов план за Фаза 3]"
}`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const diagnosticInput: DiagnosticInput = await req.json();
    
    console.log('Received diagnostic input:', diagnosticInput);

    // Construct the user message with all diagnostic data
    const userMessage = JSON.stringify(diagnosticInput, null, 2);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Call Lovable AI Gateway
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limits exceeded, please try again later.' }), 
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required, please add funds to your Lovable AI workspace.' }), 
          {
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      const errorText = await aiResponse.text();
      console.error('AI gateway error:', aiResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'AI gateway error' }), 
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const aiData = await aiResponse.json();
    const generatedContent = aiData.choices[0].message.content;

    console.log('AI generated content:', generatedContent);

    // Parse the JSON response from AI
    let diagnosticOutput: DiagnosticOutput;
    try {
      // Try to extract JSON from the response (in case AI adds markdown formatting)
      const jsonMatch = generatedContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        diagnosticOutput = JSON.parse(jsonMatch[0]);
      } else {
        diagnosticOutput = JSON.parse(generatedContent);
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to parse AI response',
          raw_response: generatedContent 
        }), 
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Return the diagnostic output
    return new Response(
      JSON.stringify({
        success: true,
        diagnostic: diagnosticOutput,
        input: diagnosticInput
      }), 
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in abundance-diagnostic function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
