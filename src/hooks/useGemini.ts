import { useState } from "react";
import { askSahara } from "@/server/sahara.functions";

export type Msg = { role: "user" | "ai"; text: string; time: string; tokens?: number };

export function useGemini() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Msg[]>([]);

  const ask = async (
    situation: string,
    jurisdiction: string,
    customQ?: string,
    language: string = "English",
  ) => {
    setLoading(true);
    setError(null);
    const userPrompt = customQ?.trim() || situation;
    try {
      const res = await askSahara({ data: { situation, jurisdiction, customQ, language } });
      if (!res.ok) {
        setError(res.error);
        return null;
      }
      const time = new Date().toLocaleTimeString();
      setHistory((prev) => [
        ...prev,
        { role: "user", text: userPrompt, time },
        { role: "ai", text: res.text, tokens: res.tokens, time },
      ]);
      return { text: res.text, tokens: res.tokens };
    } catch (e) {
      console.error(e);
      setError("AI temporarily unavailable. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { ask, loading, error, history, clearHistory: () => setHistory([]) };
}
