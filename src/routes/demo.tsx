import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Loader2, 
  Send, 
  Sparkles, 
  Trash2, 
  Shield, 
  Scale, 
  Languages, 
  MapPin,
  MessageSquare,
  FileText,
  Gavel,
  Users
} from "lucide-react";
import { toast } from "sonner";
import { PageMeta } from "@/components/PageMeta";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Try Sahara AI - Free Legal Rights Assistant" },
      { name: "description", content: "Ask Sahara AI about your legal rights. Powered by Gemini." },
      { property: "og:title", content: "Try Sahara AI" },
      { property: "og:description", content: "Ask about your inheritance and property rights - free." },
    ],
  }),
  component: Demo,
});

const SITUATIONS = [
  "My in-laws are taking my house",
  "I don't have my husband's death certificate",
  "Bank won't release my husband's account",
  "Relatives forged property papers",
  "I am being forced out of my home",
  "Custom",
];

const JURISDICTIONS = [
  "India (Hindu law)",
  "India (Muslim law)",
  "Bangladesh",
  "Nepal",
  "Pakistan",
];

const LANGUAGES = ["English", "Hindi", "Bengali", "Nepali"];

const QUICK_ACTIONS = [
  { label: "Know your full rights", icon: Scale, action: "Know your full rights" },
  { label: "Find free legal aid", icon: Users, action: "Find free legal aid" },
  { label: "Generate legal letter", icon: FileText, action: "Generate legal letter" },
];

// Use exactly as you specified
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

interface Message {
  role: "user" | "ai";
  text: string;
  tokens?: number;
  time?: string;
}

// Helper function for delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Call Gemini API with retry logic
async function callGemini(prompt: string, retries: number = 3): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
            topP: 0.95,
            topK: 40,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (aiText) return aiText;
        throw new Error("Empty response from API");
      }

      // Handle rate limits / overload with backoff
      if (response.status === 429 || response.status === 503) {
        const delay = Math.pow(2, attempt) * 1000; // 2,4,8 seconds
        console.warn(`API busy (${response.status}), retry ${attempt}/${retries} in ${delay}ms`);
        await sleep(delay);
        continue;
      }

      // Other errors
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText.slice(0, 100)}`);
    } catch (err) {
      if (attempt === retries) throw err;
      await sleep(1000 * attempt);
    }
  }
  throw new Error("Unable to get response. Please try again.");
}

function Demo() {
  const [situation, setSituation] = useState(SITUATIONS[0]);
  const [jurisdiction, setJurisdiction] = useState(JURISDICTIONS[0]);
  const [language, setLanguage] = useState("English");
  const [customQ, setCustomQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Message[]>([]);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" });
      gsap.from(formRef.current, {
        opacity: 0, x: -20, duration: 0.6, delay: 0.2,
        scrollTrigger: { trigger: formRef.current, start: "top 85%" },
      });
      gsap.from(conversationRef.current, {
        opacity: 0, x: 20, duration: 0.6, delay: 0.3,
        scrollTrigger: { trigger: conversationRef.current, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, []);

  const askGemini = async (query: string) => {
    const prompt = `You are Sahara AI, a legal rights assistant for widows in South Asia. 
    
Jurisdiction: ${jurisdiction}
Response language: ${language}

Rules:
- Keep response under 150 words
- Use simple, clear language
- Be helpful and empathetic
- Add this disclaimer at the end: "⚠️ AI guidance only, not legal advice."

User question: ${query}

Answer:`;

    return await callGemini(prompt);
  };

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    const query = situation === "Custom" ? customQ : situation;
    if (!query.trim()) {
      toast.error("Please describe your situation.");
      return;
    }

    if (!GEMINI_API_KEY) {
      toast.error("Gemini API key not configured. Please add VITE_GEMINI_API_KEY to .env");
      return;
    }

    setLoading(true);
    setError(null);

    const userMessage: Message = { role: "user", text: query };
    setHistory(prev => [...prev, userMessage]);

    try {
      const aiResponse = await askGemini(query);
      const aiMessage: Message = {
        role: "ai",
        text: aiResponse,
        tokens: Math.ceil(aiResponse.length / 4),
        time: new Date().toLocaleTimeString(),
      };
      setHistory(prev => [...prev, aiMessage]);
      toast.success("Response received");
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Service is busy. Please try again in a few moments.";
      setError(errorMsg);
      setHistory(prev => prev.slice(0, -1));
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    toast.success("Conversation cleared");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title="Try Sahara AI" desc="Ask Sahara AI about your legal rights." />

      <div ref={heroRef} className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center sm:px-8 lg:py-16">
          <div className="inline-flex items-center gap-2 rounded-sm border border-primary/20 bg-primary/5 px-3 py-1">
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary">Powered by Gemini 2.5 Flash</span>
          </div>
          <h1 className="mt-4 text-3xl font-light tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Talk to Sahara AI
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Ask any question about your rights. Free, private, in your language.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form Panel */}
          <div ref={formRef}>
            <form onSubmit={submit} className="border border-border bg-background">
              <div className="border-b border-border bg-muted/5 px-6 py-4">
                <h2 className="text-sm font-medium text-foreground">Legal Query Parameters</h2>
              </div>
              
              <div className="space-y-5 p-6">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <MessageSquare className="h-3 w-3" /> Situation
                  </label>
                  <select
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/50"
                  >
                    {SITUATIONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <MapPin className="h-3 w-3" /> Jurisdiction
                  </label>
                  <select
                    value={jurisdiction}
                    onChange={(e) => setJurisdiction(e.target.value)}
                    className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/50"
                  >
                    {JURISDICTIONS.map(j => <option key={j}>{j}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <Languages className="h-3 w-3" /> Response Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/50"
                  >
                    {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>

                {situation === "Custom" && (
                  <div className="animate-in fade-in duration-200">
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Describe Your Situation
                    </label>
                    <textarea
                      rows={4}
                      value={customQ}
                      onChange={(e) => setCustomQ(e.target.value)}
                      placeholder="Describe your situation in your own words..."
                      className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/50"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {loading ? "Asking Sahara AI..." : "Ask Sahara AI →"}
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  Powered by Google Gemini 2.5 Flash · Free to use
                </p>

                {history.length > 0 && (
                  <button
                    type="button"
                    onClick={clearHistory}
                    className="mx-auto flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" /> Clear conversation
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Conversation Panel */}
          <div ref={conversationRef}>
            <div className="flex h-[600px] flex-col border border-border bg-background">
              <div className="border-b border-border bg-muted/5 px-6 py-4">
                <h2 className="text-sm font-medium text-foreground">Conversation</h2>
              </div>

              <div ref={chatContainerRef} className="flex-1 space-y-4 overflow-y-auto p-6">
                {history.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-muted/10">
                      <MessageSquare className="h-8 w-8 text-muted-foreground/40" />
                    </div>
                    <p className="text-sm text-muted-foreground">Ask your first question →</p>
                    <p className="mt-1 text-xs text-muted-foreground/60">Your conversation will appear here</p>
                  </div>
                ) : (
                  history.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
                      <div className={m.role === "user"
                        ? "max-w-[85%] rounded-sm bg-primary/10 px-4 py-2.5 text-sm text-foreground"
                        : "max-w-[85%] border-l-2 border-primary bg-muted/5 px-4 py-2.5 text-sm text-foreground"
                      }>
                        <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                        {m.role === "ai" && (
                          <div className="mt-2 flex gap-3 border-t border-border/50 pt-2 text-xs text-muted-foreground">
                            <span>Tokens: ~{m.tokens}</span> <span>·</span> <span>{m.time}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-border bg-muted/5 p-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Quick Actions</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => {
                        setSituation("Custom");
                        setCustomQ(action.action);
                        setTimeout(() => submit(), 100);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/5"
                    >
                      <action.icon className="h-3 w-3" /> {action.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border bg-destructive/5 p-4">
                <div className="flex items-start gap-2">
                  <Shield className="mt-0.5 h-3 w-3 shrink-0 text-destructive" />
                  <p className="text-xs leading-relaxed text-destructive">
                    AI guidance only, not legal advice. Consult a qualified lawyer for binding legal decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-border pt-12 sm:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted/5">
                <Shield className="h-4 w-4 text-primary/60" />
              </div>
            </div>
            <p className="text-xs font-medium text-foreground">Private & Secure</p>
            <p className="text-xs text-muted-foreground">Your data never leaves your device</p>
          </div>
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted/5">
                <Gavel className="h-4 w-4 text-primary/60" />
              </div>
            </div>
            <p className="text-xs font-medium text-foreground">Multi-Jurisdiction</p>
            <p className="text-xs text-muted-foreground">Covers 5 South Asian legal systems</p>
          </div>
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted/5">
                <Languages className="h-4 w-4 text-primary/60" />
              </div>
            </div>
            <p className="text-xs font-medium text-foreground">4+ Languages</p>
            <p className="text-xs text-muted-foreground">English, Hindi, Bengali, Nepali</p>
          </div>
        </div>
      </div>
    </div>
  );
} 