import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.83.0';
import { Resend } from 'https://esm.sh/resend@2.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string);

interface ProcessDiagnosticRequest {
  user_name: string;
  user_email: string;
  user_phone?: string;
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
  goal_sphere_values: Array<{ sphere: string; goal: number }>;
  commitment_level: string;
  income_level: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const diagnosticData: ProcessDiagnosticRequest = await req.json();
    
    console.log('Processing diagnostic for:', diagnosticData.user_email);

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Step 1: Save initial submission to database
    const { data: submission, error: insertError } = await supabase
      .from('diagnostic_submissions')
      .insert({
        user_name: diagnosticData.user_name,
        user_email: diagnosticData.user_email,
        user_phone: diagnosticData.user_phone || null,
        birth_date: diagnosticData.birth_date,
        birth_time: diagnosticData.birth_time,
        birth_city: diagnosticData.birth_city,
        birth_country: diagnosticData.birth_country,
        rating_finances: diagnosticData.rating_finances,
        rating_business: diagnosticData.rating_business,
        rating_health: diagnosticData.rating_health,
        rating_mental: diagnosticData.rating_mental,
        rating_romantic: diagnosticData.rating_romantic,
        rating_social: diagnosticData.rating_social,
        rating_mission: diagnosticData.rating_mission,
        priority_top3: diagnosticData.priority_top3,
        goal_sphere_values: diagnosticData.goal_sphere_values,
        commitment_level: diagnosticData.commitment_level,
        income_level: diagnosticData.income_level,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error saving submission:', insertError);
      throw insertError;
    }

    console.log('Submission saved with ID:', submission.id);

    // Step 2: Call AI Diagnostic Engine
    const diagnosticResponse = await fetch(`${supabaseUrl}/functions/v1/abundance-diagnostic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify(diagnosticData),
    });

    if (!diagnosticResponse.ok) {
      const errorText = await diagnosticResponse.text();
      console.error('Diagnostic engine error:', errorText);
      throw new Error('Failed to generate diagnostic');
    }

    const diagnosticResult = await diagnosticResponse.json();
    console.log('Diagnostic generated successfully');

    // Step 3: Update submission with diagnostic result
    const { error: updateError } = await supabase
      .from('diagnostic_submissions')
      .update({
        diagnostic_result: diagnosticResult.diagnostic,
      })
      .eq('id', submission.id);

    if (updateError) {
      console.error('Error updating submission:', updateError);
    }

    // Step 4: Send email with diagnostic report
    const emailHtml = generateEmailHtml(
      diagnosticData.user_name,
      diagnosticResult.diagnostic
    );

    const { error: emailError } = await resend.emails.send({
      from: 'CODE: ABUNDANCE™ <onboarding@resend.dev>',
      to: [diagnosticData.user_email],
      subject: `${diagnosticData.user_name}, твоят Abundance Diagnostic™ е готов! 🎯`,
      html: emailHtml,
    });

    if (emailError) {
      console.error('Error sending email:', emailError);
      throw emailError;
    }

    // Mark email as sent
    await supabase
      .from('diagnostic_submissions')
      .update({ email_sent: true })
      .eq('id', submission.id);

    console.log('Email sent successfully to:', diagnosticData.user_email);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Diagnostic processed and email sent',
        submission_id: submission.id,
        diagnostic: diagnosticResult.diagnostic,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in process-diagnostic function:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function generateEmailHtml(userName: string, diagnostic: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Твоят Abundance Diagnostic™</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
      color: #ffffff;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 10px 0 0;
      font-size: 16px;
      opacity: 0.9;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
      color: #000;
    }
    .section {
      margin-bottom: 30px;
      padding: 20px;
      background-color: #f8f8f8;
      border-left: 4px solid #000;
      border-radius: 4px;
    }
    .section h2 {
      margin: 0 0 15px;
      font-size: 20px;
      color: #000;
      font-weight: 700;
    }
    .section p {
      margin: 10px 0;
      color: #333;
      line-height: 1.7;
    }
    .phase {
      background-color: #fff;
      padding: 15px;
      margin: 15px 0;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
    }
    .phase h3 {
      margin: 0 0 10px;
      font-size: 16px;
      color: #000;
      font-weight: 600;
    }
    .cta {
      text-align: center;
      margin: 40px 0;
    }
    .cta-button {
      display: inline-block;
      padding: 16px 40px;
      background-color: #000;
      color: #fff;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 16px;
      transition: background-color 0.3s;
    }
    .cta-button:hover {
      background-color: #333;
    }
    .footer {
      background-color: #f8f8f8;
      padding: 30px;
      text-align: center;
      font-size: 14px;
      color: #666;
      border-top: 1px solid #e0e0e0;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>CODE: ABUNDANCE™</h1>
      <p>Твоят персонализиран диагностичен анализ</p>
    </div>
    
    <div class="content">
      <p class="greeting">Здравей ${userName},</p>
      
      <p>Твоят Abundance Diagnostic™ анализ е готов! 🎯</p>
      
      <p>Базирано на твоите данни, ние анализирахме твоя "Core Code" (Human Design, Нумерология, Астрология) и 7-те сфери на живота ти, за да ти дадем персонализиран 90-дневен план за достигане на Изобилие.</p>

      <!-- Core Code Section -->
      <div class="section">
        <h2>📊 Твоят Core Code</h2>
        <p><strong>Human Design:</strong> ${diagnostic.hd_type_profile}</p>
        <p><strong>Стратегия:</strong> ${diagnostic.hd_strategy}</p>
        <p><strong>Път на Живота:</strong> ${diagnostic.life_path_number}</p>
        <p><strong>Астро Триада:</strong> ${diagnostic.astro_triad}</p>
      </div>

      <!-- HD Analysis -->
      <div class="section">
        <h2>🎯 Human Design Анализ</h2>
        <p>${diagnostic.hd_analysis_text}</p>
      </div>

      <!-- Life Path Analysis -->
      <div class="section">
        <h2>🔢 Нумерологичен Анализ</h2>
        <p>${diagnostic.life_path_analysis_text}</p>
      </div>

      <!-- Astro Analysis -->
      <div class="section">
        <h2>⭐ Астрологичен Анализ</h2>
        <p>${diagnostic.astro_analysis_text}</p>
      </div>

      <!-- Life Audit -->
      <div class="section">
        <h2>📈 Анализ на сферите на живота</h2>
        <p>${diagnostic.pizza_analysis_text}</p>
      </div>

      <!-- 90-Day Plan -->
      <div class="section">
        <h2>🚀 Твоят 90-Дневен План за Изобилие</h2>
        
        <div class="phase">
          <h3>Фаза 1 (Дни 1-30): ПОДРЕЖДАНЕ</h3>
          <p>${diagnostic.generated_phase1_text}</p>
        </div>
        
        <div class="phase">
          <h3>Фаза 2 (Дни 31-60): УМЕНИЯ</h3>
          <p>${diagnostic.generated_phase2_text}</p>
        </div>
        
        <div class="phase">
          <h3>Фаза 3 (Дни 61-90): ИЗДИГАНЕ</h3>
          <p>${diagnostic.generated_phase3_text}</p>
        </div>
      </div>

      <!-- CTA -->
      <div class="cta">
        <p><strong>Готов ли си за следващата стъпка?</strong></p>
        <p>Гледай това кратко видео, за да видиш КАК CODE: ABUNDANCE™ работи:</p>
        <a href="#" class="cta-button">➡️ ГЛЕДАЙ ВИДЕОТО СЕГА</a>
      </div>

      <p style="margin-top: 30px; font-size: 14px; color: #666;">
        Това е само началото на твоята трансформация. CODE: ABUNDANCE™ е пълната система за изграждане на Изобилие във всички 7 сфери на живота.
      </p>
    </div>
    
    <div class="footer">
      <p><strong>CODE: ABUNDANCE™</strong></p>
      <p>Ключът към Изобилието е Себепознанието</p>
    </div>
  </div>
</body>
</html>
  `;
}
