import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mic,
  MicOff,
  Send,
  Loader2,
  ArrowLeft,
  Trash2,
  Volume2,
  VolumeX,
  Shield,
  Languages,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { PageMeta } from "@/components/PageMeta";
import { useGemini } from "@/hooks/useGemini";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/voice-chat")({
  head: () => ({
    meta: [
      { title: "Voice Chat - Sahara AI" },
      {
        name: "description",
        content: "Speak with Sahara AI in your language. Voice-first legal rights assistant.",
      },
      { property: "og:title", content: "Voice Chat - Sahara AI" },
      { property: "og:description", content: "Speak with Sahara AI in your language." },
    ],
  }),
  component: VoiceChat,
});

const JURISDICTIONS = [
  "India (Hindu law)",
  "India (Muslim law)",
  "Bangladesh",
  "Nepal",
  "Pakistan",
];
const LANGUAGES = [
  { label: "English", code: "en-US" },
  { label: "Hindi", code: "hi-IN" },
  { label: "Bengali", code: "bn-IN" },
  { label: "Nepali", code: "ne-NP" },
];

type SR = any;
function getRecognition(): SR | null {
  if (typeof window === "undefined") return null;
  const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  return Ctor ? new Ctor() : null;
}

function VoiceChat() {
  const { ask, loading, error, history, clearHistory } = useGemini();
  const [jurisdiction, setJurisdiction] = useState(JURISDICTIONS[0]);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [text, setText] = useState("");
  const [speakReplies, setSpeakReplies] = useState(true);
  const [supported, setSupported] = useState(true);

  const recRef = useRef<SR | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lastSpoken = useRef<string>("");
  const headerRef = useRef<HTMLDivElement>(null);
  const emptyStateRef = useRef<HTMLDivElement>(null);

  // Init recognition
  useEffect(() => {
    const rec = getRecognition();
    if (!rec) {
      setSupported(false);
      return;
    }
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = language.code;

    rec.onresult = (e: any) => {
      let finalT = "";
      let interimT = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalT += transcript;
        else interimT += transcript;
      }
      if (interimT) setInterim(interimT);
      if (finalT) {
        setInterim("");
        setText((prev) => (prev ? prev + " " : "") + finalT.trim());
      }
    };
    rec.onend = () => setListening(false);
    rec.onerror = (e: any) => {
      setListening(false);
      if (e.error === "not-allowed") {
        toast.error("Microphone permission denied.");
      } else if (e.error !== "aborted" && e.error !== "no-speech") {
        toast.error(`Voice error: ${e.error}`);
      }
    };
    recRef.current = rec;
    return () => {
      try {
        rec.abort();
      } catch {}
    };
  }, [language.code]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [history, interim, loading]);

  // Toast errors
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Speak latest AI reply
  useEffect(() => {
    if (!speakReplies || typeof window === "undefined" || !window.speechSynthesis) return;
    const last = history[history.length - 1];
    if (!last || last.role !== "ai") return;
    if (lastSpoken.current === last.text) return;
    lastSpoken.current = last.text;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(last.text);
      u.lang = language.code;
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    } catch {}
  }, [history, speakReplies, language.code]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      if (history.length === 0 && emptyStateRef.current) {
        gsap.from(emptyStateRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(0.3)",
        });
      }
    });

    return () => ctx.revert();
  }, [history.length]);

  const toggleMic = async () => {
    if (!recRef.current) return;
    if (listening) {
      recRef.current.stop();
      return;
    }
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      recRef.current.lang = language.code;
      setInterim("");
      recRef.current.start();
      setListening(true);
    } catch {
      toast.error("Microphone access required for voice input.");
    }
  };

  const send = async () => {
    const q = text.trim();
    if (!q || loading) return;
    setText("");
    setInterim("");
    if (listening) recRef.current?.stop();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    await ask(q, jurisdiction, q, language.label);
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed inset-0 top-[57px] z-30 flex flex-col bg-background">
      <PageMeta title="Voice Chat - Sahara AI" desc="Speak with Sahara AI in your language." />

      {/* Header */}
      <div ref={headerRef} className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            to="/demo"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-sm border border-border bg-muted/5 px-2 py-1.5">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                aria-label="Jurisdiction"
                className="bg-transparent text-xs font-medium outline-none sm:text-sm"
              >
                {JURISDICTIONS.map((j) => (
                  <option key={j}>{j}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 rounded-sm border border-border bg-muted/5 px-2 py-1.5">
              <Languages className="h-3 w-3 text-muted-foreground" />
              <select
                value={language.code}
                onChange={(e) =>
                  setLanguage(LANGUAGES.find((l) => l.code === e.target.value) || LANGUAGES[0])
                }
                aria-label="Language"
                className="bg-transparent text-xs font-medium outline-none sm:text-sm"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setSpeakReplies((v) => {
                  if (v && window.speechSynthesis) window.speechSynthesis.cancel();
                  return !v;
                });
              }}
              aria-label={speakReplies ? "Mute replies" : "Unmute replies"}
              className="flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted/10 hover:text-primary sm:h-9 sm:w-9"
            >
              {speakReplies ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            {history.length > 0 && (
              <button
                onClick={() => {
                  clearHistory();
                  lastSpoken.current = "";
                }}
                aria-label="Clear conversation"
                className="flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive sm:h-9 sm:w-9"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Conversation Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          {history.length === 0 && (
            <div
              ref={emptyStateRef}
              className="flex flex-col items-center justify-center py-12 text-center sm:py-20"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/5 sm:h-20 sm:w-20">
                <MessageCircle className="h-8 w-8 text-primary/60 sm:h-10 sm:w-10" />
              </div>
              <h1 className="text-xl font-light text-foreground sm:text-2xl">
                Voice Chat with Sahara AI
              </h1>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Tap the mic and ask anything about your rights - in {language.label}. Or type below.
              </p>
              {!supported && (
                <div className="mt-6 flex items-center gap-2 rounded-sm border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                  <Shield className="h-3 w-3" />
                  Voice input not supported in this browser. Please type instead.
                </div>
              )}
            </div>
          )}

          {/* Messages */}
          <div className="space-y-4">
            {history.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 fade-in duration-300`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] rounded-sm bg-primary/10 px-4 py-2.5 text-sm text-foreground"
                      : "max-w-[85%] border-l-2 border-primary bg-muted/5 px-4 py-2.5 text-sm text-foreground"
                  }
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                  {m.role === "ai" && (
                    <div className="mt-2 flex gap-3 border-t border-border/50 pt-2 text-xs text-muted-foreground">
                      <span>Tokens: ~{m.tokens}</span>
                      <span>·</span>
                      <span>{m.time}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="border-l-2 border-primary bg-muted/5 px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary/60" />
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary/60"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary/60"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6">
          {(interim || listening) && (
            <div className="mb-2 rounded-sm border border-primary/20 bg-primary/5 px-3 py-1.5">
              <p className="text-xs italic text-primary/80">
                {listening && !interim ? "Listening..." : interim}
              </p>
            </div>
          )}

          <div className="flex items-end gap-2">
            {/* Mic Button */}
            <button
              onClick={toggleMic}
              disabled={!supported}
              aria-label={listening ? "Stop recording" : "Start recording"}
              className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-sm transition-all sm:h-12 sm:w-12 ${
                listening
                  ? "bg-destructive text-destructive-foreground"
                  : "border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {listening && (
                <span className="absolute inset-0 animate-ping rounded-sm bg-destructive opacity-30" />
              )}
              {listening ? (
                <MicOff className="relative h-4 w-4" />
              ) : (
                <Mic className="relative h-4 w-4" />
              )}
            </button>

            {/* Text Input */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={onKey}
              rows={1}
              placeholder={listening ? "Listening..." : "Ask about your rights..."}
              className="max-h-32 min-h-[44px] flex-1 resize-none rounded-sm border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-0 sm:px-4"
            />

            {/* Send Button */}
            <button
              onClick={send}
              disabled={!text.trim() || loading}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40 sm:h-12 sm:w-12"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mt-3 flex items-center justify-center gap-2 border-t border-border/50 pt-3">
            <Shield className="h-3 w-3 text-muted-foreground/60" />
            <p className="text-center text-xs text-muted-foreground/60">
              AI guidance only, not legal advice. Consult a qualified lawyer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
