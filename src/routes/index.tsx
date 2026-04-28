import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, ShieldCheck, MessageSquare,
  FileText, Check, ArrowUpRight,
} from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { useCounter } from "@/hooks/useCounter";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ── Fade-up wrapper ─────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Typewriter ──────────────────────────────────────────── */
const PARTS = [
  { text: "Every 72 hours, a widow loses her Index.", accent: false },
  { text: " Sahara stops it.", accent: true },
];
const FULL = PARTS.map((p) => p.text).join("");

function Typewriter() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v < FULL.length ? v + 1 : v)), 30);
    return () => clearInterval(id);
  }, []);
  let cursor = 0;
  return (
    <h1 className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
      {PARTS.map((p, i) => {
        const start = cursor; cursor += p.text.length;
        return (
          <span key={i} className={p.accent ? "text-accent" : ""}>
            {FULL.slice(start, Math.min(n, cursor))}
          </span>
        );
      })}
      {n < FULL.length && (
        <span className="ml-px inline-block h-[0.85em] w-[2px] translate-y-1 bg-foreground align-middle" />
      )}
    </h1>
  );
}

/* ── Phone Mockup ────────────────────────────────────────── */
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[240px] lg:w-[260px]">
      <div className="absolute inset-x-6 top-10 h-36 rounded-full bg-accent/10 blur-3xl" />
      <svg viewBox="0 0 300 580" className="relative w-full drop-shadow-[0_20px_48px_rgba(0,0,0,0.6)]" aria-label="Sahara app">
        <rect width="300" height="580" rx="40" fill="#1c1c1c" />
        <rect x="2" y="2" width="296" height="576" rx="38" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
        <rect x="10" y="10" width="280" height="560" rx="32" fill="#121212" />
        <rect x="10" y="10" width="280" height="48" rx="32" fill="#1a1a1a" />
        <rect x="10" y="38" width="280" height="20" fill="#1a1a1a" />
        <rect x="106" y="15" width="88" height="22" rx="11" fill="#121212" />
        {/* App header */}
        <rect x="10" y="58" width="280" height="56" fill="#3F82BA" />
        <text x="26" y="92" fill="white" fontFamily="Inter,sans-serif" fontSize="16" fontWeight="600">Sahara</text>
        <rect x="238" y="70" width="34" height="30" rx="8" fill="rgba(255,255,255,0.08)" />
        {/* Document Vault card */}
        <rect x="16" y="128" width="268" height="78" rx="12" fill="#1c1c1c" stroke="rgba(37,99,235,0.25)" strokeWidth="1" />
        <rect x="28" y="144" width="26" height="26" rx="7" fill="#2563EB" fillOpacity="0.18" />
        <rect x="64" y="149" width="96" height="8" rx="3" fill="#2563EB" fillOpacity="0.65" />
        <rect x="64" y="164" width="140" height="7" rx="3" fill="rgba(255,255,255,0.13)" />
        <rect x="28" y="183" width="190" height="6" rx="3" fill="rgba(255,255,255,0.07)" />
        {/* Rights card */}
        <rect x="16" y="220" width="268" height="78" rx="12" fill="#1c1c1c" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <rect x="28" y="236" width="26" height="26" rx="7" fill="rgba(255,255,255,0.05)" />
        <rect x="64" y="241" width="110" height="8" rx="3" fill="rgba(255,255,255,0.45)" />
        <rect x="64" y="257" width="150" height="7" rx="3" fill="rgba(255,255,255,0.10)" />
        <rect x="28" y="275" width="170" height="6" rx="3" fill="rgba(255,255,255,0.05)" />
        {/* CTA */}
        <rect x="16" y="312" width="268" height="46" rx="11" fill="#2563EB" />
        <text x="150" y="341" fill="white" fontFamily="Inter,sans-serif" fontSize="12.5" fontWeight="600" textAnchor="middle">Ask AI about my rights →</text>
        {/* Chat area */}
        <rect x="16" y="372" width="268" height="176" rx="12" fill="#1a1a1a" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <rect x="26" y="386" width="152" height="30" rx="8" fill="rgba(37,99,235,0.14)" />
        <rect x="26" y="390" width="110" height="7" rx="3" fill="rgba(255,255,255,0.22)" />
        <rect x="26" y="402" width="76" height="6" rx="3" fill="rgba(255,255,255,0.10)" />
        <rect x="104" y="430" width="154" height="38" rx="8" fill="#2563EB" fillOpacity="0.75" />
        <rect x="114" y="436" width="98" height="7" rx="3" fill="rgba(255,255,255,0.65)" />
        <rect x="114" y="449" width="116" height="6" rx="3" fill="rgba(255,255,255,0.35)" />
        <rect x="26" y="480" width="124" height="26" rx="8" fill="rgba(37,99,235,0.14)" />
        <rect x="26" y="486" width="86" height="7" rx="3" fill="rgba(255,255,255,0.22)" />
        <rect x="26" y="497" width="56" height="6" rx="3" fill="rgba(255,255,255,0.09)" />
        {/* Index bar */}
        <rect x="120" y="557" width="60" height="3.5" rx="2" fill="rgba(255,255,255,0.18)" />
      </svg>
    </div>
  );
}

/* ── Stat ────────────────────────────────────────────────── */
function Stat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { value, ref } = useCounter(target);
  return (
    <div ref={ref} className="flex flex-col gap-1">
      <div className="text-[2rem] font-semibold leading-none tracking-[-0.03em]">
        {value.toLocaleString()}{suffix}
      </div>
      <div className="text-[12.5px] text-muted-foreground">{label}</div>
    </div>
  );
}

/* ── Data ────────────────────────────────────────────────── */
const FEATURES = [
  { icon: ShieldCheck, num: "01", title: "Document Vault", desc: "SHA-256 encrypted proof. Tamper-proof. Works offline on 2G networks." },
  { icon: MessageSquare, num: "02", title: "AI Rights Guide", desc: "Explains inheritance law in Hindi, Urdu, Bengali, Nepali. Voice-first." },
  { icon: FileText, num: "03", title: "Legal Letters", desc: "Auto-drafts to Tehsildar, police, SDM. Sends via WhatsApp in one tap." },
];

const STEPS = [
  { label: "Register", desc: "Create your secure profile in 2 minutes." },
  { label: "Know Your Rights", desc: "AI explains what the law guarantees you." },
  { label: "Take Action", desc: "File official letters and complaints instantly." },
];

const TESTIMONIALS = [
  { q: "For the first time I understood my rights.", who: "Meera", loc: "Bihar" },
  { q: "Sahara drafted my police letter in one minute.", who: "Fatima", loc: "Bangladesh" },
  { q: "I didn't know I had rights. Now I do.", who: "Kamala", loc: "Nepal" },
  { q: "The AI spoke in my language. I wasn't alone.", who: "Sunita", loc: "Nepal" },
  { q: "My document vault saved everything when I needed it.", who: "Rokeya", loc: "Bangladesh" },
];

/* ── Index ────────────────────────────────────────────────── */
function Index() {
  return (
    <div>
     

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border/50 bg-background">
        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-accent" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 sm:px-8 lg:grid-cols-[1fr_auto] lg:gap-20 lg:py-28">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3.5 py-1.5 text-[11.5px] font-medium tracking-wide text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Google Solution Challenge 2026
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
              className="mt-7"
            >
              <Typewriter />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
              className="mt-6 text-[16px] leading-relaxed text-muted-foreground"
            >
              AI-powered legal protection for 300 million rural widows -
              in their language, on any phone, even without internet.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.33, 1, 0.68, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/how-it-works"
                className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-[13px] font-semibold text-accent-foreground transition-all hover:brightness-110"
              >
                See How It Works
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-5 py-2.5 text-[13px] font-medium text-foreground/75 transition-colors hover:bg-muted hover:text-foreground"
              >
                Try AI Demo
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2"
            >
              {["Free to use", "Works offline", "4 languages", "No literacy required"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-accent" />{t}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="hidden lg:block"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
          <div className="grid grid-cols-2 divide-x divide-y divide-border/50 overflow-hidden rounded-xl border border-border/50 sm:grid-cols-4 sm:divide-y-0">
            {[
              { target: 300, suffix: "M+", label: "Widows in South Asia" },
              { target: 40,  suffix: "%",  label: "Face property theft" },
              { target: 72,  suffix: "h",  label: "Avg. time to fraud attempt" },
              { target: 4,   suffix: "",   label: "Languages supported" },
            ].map((s) => (
              <div key={s.label} className="bg-card px-7 py-8">
                <Stat {...s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
          <Reveal className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.15em] text-accent">Platform</p>
              <h2 className="text-[clamp(1.5rem,2.8vw,2.2rem)] font-semibold tracking-[-0.025em]">
                Built for those the law forgot.
              </h2>
            </div>
            <p className="max-w-[260px] text-[13.5px] leading-relaxed text-muted-foreground sm:text-right">
              Three tools. One app. Complete protection.
            </p>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-xl border border-border/50 bg-border/40 sm:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}
                className="group relative flex flex-col gap-5 bg-card px-7 py-8 transition-colors duration-200 hover:bg-muted/30"
              >
                <span className="absolute right-5 top-5 text-[10.5px] font-medium tracking-widest text-foreground/15">{f.num}</span>
                <div className="grid h-9 w-9 place-items-center rounded-lg border border-border/50 bg-muted/40 text-foreground/50 transition-colors group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:text-accent">
                  <f.icon className="h-[18px] w-[18px]" />
                </div>
                <div>
                  <h3 className="text-[14.5px] font-semibold tracking-[-0.015em]">{f.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
                <ArrowUpRight className="mt-auto h-3.5 w-3.5 text-foreground/15 transition-colors group-hover:text-accent" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="border-b border-border/50 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
          <Reveal className="mb-14 text-center">
            <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.15em] text-accent">Process</p>
            <h2 className="text-[clamp(1.5rem,2.8vw,2.2rem)] font-semibold tracking-[-0.025em]">Three steps to protection</h2>
          </Reveal>

          <Reveal className="relative grid gap-10 sm:grid-cols-3 sm:gap-0">
            <div className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-px bg-border/50 sm:block" />
            {STEPS.map((s, i) => (
              <div key={s.label} className="relative flex flex-col items-center gap-4 px-8 text-center">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-card text-[13px] font-semibold shadow-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="text-[14px] font-semibold">{s.label}</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="overflow-hidden border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
          <Reveal className="mb-10">
            <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.15em] text-accent">Impact</p>
            <h2 className="text-[clamp(1.5rem,2.8vw,2.2rem)] font-semibold tracking-[-0.025em]">Voices of change</h2>
          </Reveal>
        </div>
        <div className="relative -mt-4 mb-20">
          <div className="marquee-track flex w-max gap-4 px-6 sm:px-8">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} className="w-[280px] shrink-0 rounded-xl border border-border/50 bg-card p-5 shadow-sm">
                <p className="text-[13.5px] leading-relaxed text-foreground/75">"{t.q}"</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-accent/15 text-[10px] font-semibold text-accent">
                    {t.who[0]}
                  </div>
                  <p className="text-[12px] font-medium text-muted-foreground">{t.who}, {t.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card px-10 py-16 text-center sm:px-20">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-accent" />
              <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.15em] text-accent">Get Started</p>
              <h2 className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-semibold tracking-[-0.03em]">
                Protect what is yours.
              </h2>
              <p className="mx-auto mt-4 max-w-sm text-[14.5px] leading-relaxed text-muted-foreground">
                Free. In your language. On any phone - even without internet.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/demo"
                  className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-[13px] font-semibold text-accent-foreground transition-all hover:brightness-110"
                >
                  Get Protected - It's Free
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-6 py-2.5 text-[13px] font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}