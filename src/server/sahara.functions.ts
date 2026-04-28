import { createServerFn } from "@tanstack/react-start";

const JURISDICTION_LAWS: Record<string, string> = {
  "India (Hindu law)": "Hindu Succession Act 1956, Section 14 (widow owns property absolutely)",
  "India (Muslim law)": "Muslim Personal Law 1937: wife inherits 1/8th with children, 1/4th without",
  Bangladesh: "Muslim Family Laws Ordinance 1961. BLAST helpline: 0800-888-000",
  Nepal: "Civil Code 2017: equal inheritance, claim within 2 years. NHRC: 1115",
  Pakistan: "West Pakistan Muslim Personal Law 1962: 1/8 with children, 1/4 without",
};

export const askSahara = createServerFn({ method: "POST" })
  .inputValidator(
    (input: {
      situation: string;
      jurisdiction: string;
      customQ?: string;
      language?: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    const { situation, jurisdiction, customQ, language = "English" } = data;
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "AI service not configured." };
    }

    const lawContext = JURISDICTION_LAWS[jurisdiction] || "";
    const langInstruction =
      language === "Hindi"
        ? "Respond in simple Hindi (Devanagari script)."
        : language === "Bengali"
          ? "Respond in simple Bengali."
          : language === "Nepali"
            ? "Respond in simple Nepali (Devanagari)."
            : "Respond in simple English.";

    const systemContext = `You are Sahara, a compassionate legal rights assistant for widows in South Asia. ${langInstruction} Jurisdiction: ${jurisdiction}. Relevant law: ${lawContext}. Rules: use simple words, keep response under 120 words, end with ONE concrete action she can take today. Be warm and reassuring.`;
    const userPrompt = customQ?.trim() || situation;

    console.log(
      `[Sahara AI ${new Date().toISOString()}] ${jurisdiction} | ${language} | "${userPrompt.substring(0, 60)}..."`,
    );

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemContext },
            { role: "user", content: userPrompt },
          ],
        }),
      });

      if (res.status === 429) {
        return { ok: false as const, error: "Rate limit reached. Please try again in a moment." };
      }
      if (res.status === 402) {
        return { ok: false as const, error: "AI credits exhausted. Please add credits in workspace settings." };
      }
      if (!res.ok) {
        const t = await res.text();
        console.error("AI gateway error:", res.status, t);
        return { ok: false as const, error: "AI temporarily unavailable. Please try again." };
      }

      const json = await res.json();
      const text: string = json.choices?.[0]?.message?.content ?? "No response.";
      const tokens = Math.round(text.split(/\s+/).length * 1.3);
      return { ok: true as const, text, tokens };
    } catch (err) {
      console.error("[Sahara Error]", err);
      return { ok: false as const, error: "AI temporarily unavailable. Check your connection." };
    }
  });

export const ack  = createServerFn({ method: "POST" })
  .inputValidator((input: { name: string; organization: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return {
        text: `Thank you, ${data.name}. We've received your message and will respond within 24 hours.`,
      };
    }
    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "user",
              content: `Write a warm 3-sentence acknowledgement for ${data.name} from ${data.organization || "their organization"}. Name their organization if provided. Promise a response within 24 hours. No greetings like "Dear" - just the body.`,
            },
          ],
        }),
      });
      if (!res.ok) throw new Error("ack failed");
      const json = await res.json();
      const text: string = json.choices?.[0]?.message?.content ?? "";
      return { text: text || `Thank you, ${data.name}. We'll respond within 24 hours.` };
    } catch {
      return { text: `Thank you, ${data.name}. We'll respond within 24 hours.` };
    }
  });
