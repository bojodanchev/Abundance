const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenAIChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function chatCompletion(
  messages: ChatMessage[],
  options?: {
    model?: string;
    temperature?: number;
    max_completion_tokens?: number;
    response_format?: { type: "json_object" | "text" };
  }
): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: options?.model ?? "gpt-5-mini",
      messages,
      max_completion_tokens: options?.max_completion_tokens ?? 4000,
      ...(options?.temperature != null && { temperature: options.temperature }),
      ...(options?.response_format && {
        response_format: options.response_format,
      }),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const data: OpenAIChatResponse = await response.json();
  return data.choices[0].message.content;
}
