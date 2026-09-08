import { createServerFn } from "@tanstack/react-start";

type ChatTurn = { role: "user" | "assistant"; content: string };

type ChefInput = {
  messages: ChatTurn[];
  lang: "en" | "ar";
  leftoverMode: boolean;
};

function validate(input: unknown): ChefInput {
  const data = input as Partial<ChefInput>;
  if (!Array.isArray(data.messages) || data.messages.length === 0) {
    throw new Error("messages required");
  }
  const messages = data.messages.slice(-12).map((m) => ({
    role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
    content: String(m.content ?? "").slice(0, 4000),
  }));
  return {
    messages,
    lang: data.lang === "ar" ? "ar" : "en",
    leftoverMode: Boolean(data.leftoverMode),
  };
}

export const askChef = createServerFn({ method: "POST" })
  .inputValidator(validate)
  .handler(async ({ data }): Promise<{ ok: boolean; reply: string; reason?: string }> => {
    const key = process.env["GROQ_API_KEY"];
    console.log("chef: key present?", Boolean(key));
    if (!key) {
      return { ok: false, reply: "", reason: "missing_key" };
    }

    const system =
      data.lang === "ar"
        ? "أنت «شيف الذكاء»، طاهٍ ودود وعملي. أجب بالعربية فقط. اقترح وصفات واقعية بمكونات متوفرة، مع وقت التحضير وقائمة مكونات وخطوات مرقّمة قصيرة. كن مختصراً ومباشراً."
        : "You are Chef AI, a warm and practical cook. Answer in English only. Suggest realistic recipes from the ingredients given, with prep time, an ingredient list and short numbered steps. Be concise.";
    const leftover = data.leftoverMode
      ? data.lang === "ar"
        ? " وضع البقايا مفعّل: ركّز على إنقاذ الطعام المطبوخ أو المكونات القريبة من الانتهاء وتقليل الهدر."
        : " Leftover Mode is on: focus on rescuing already-cooked food and ingredients near their end, minimising waste."
      : "";

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
          max_tokens: 900,
          messages: [{ role: "system", content: system + leftover }, ...data.messages],
        }),
      });

      if (!res.ok) {
        const status = res.status;
        const reason =
          status === 401 ? "auth" : status === 429 ? "rate_limit" : status >= 500 ? "upstream" : "request";
        console.log("chef: groq error", status, (await res.text()).slice(0, 300));
        return { ok: false, reply: "", reason };
      }

      const json = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const reply = json.choices?.[0]?.message?.content?.trim() ?? "";
      if (!reply) return { ok: false, reply: "", reason: "empty" };
      return { ok: true, reply };
    } catch (e) {
      console.log("chef: network error", String(e).slice(0, 300));
      return { ok: false, reply: "", reason: "network" };
    }
  });
