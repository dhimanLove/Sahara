/* eslint-disable prettier/prettier */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  FileText,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { useCounter } from "@/hooks/useCounter";
import saharaPng from "../../asset/sahara.png?url";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ── Fade-up wrapper ─────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
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
    const id = setInterval(
      () => setN((v) => (v < FULL.length ? v + 1 : v)),
      30,
    );
    return () => clearInterval(id);
  }, []);
  let cursor = 0;
  return (
    <h1 className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
      {PARTS.map((p, i) => {
        const start = cursor;
        cursor += p.text.length;
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
function PhoneMockup() {
  return (
    <div className="mx-auto w-[340px] lg:w-[300px]">
      <img
        src={saharaPng}
        alt="Sahara phone mockup"
        loading="lazy"
        className="block h-auto w-full rounded-[48px] object-cover"
      />
    </div>
  );
}

function Stat({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { value, ref } = useCounter(target);
  return (
    <div ref={ref} className="flex flex-col gap-1">
      <div className="text-[2rem] font-semibold leading-none tracking-[-0.03em]">
        {value.toLocaleString()}
        {suffix}
      </div>
      <div className="text-[12.5px] text-muted-foreground">{label}</div>
    </div>
  );
}

/* ── Data ────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: ShieldCheck,
    num: "01",
    title: "Document Vault",
    desc: "SHA-256 encrypted proof. Tamper-proof. Works offline on 2G networks.",
  },
  {
    icon: MessageSquare,
    num: "02",
    title: "AI Rights Guide",
    desc: "Explains inheritance law in Hindi, Urdu, Bengali, Nepali. Voice-first.",
  },
  {
    icon: FileText,
    num: "03",
    title: "Legal Letters",
    desc: "Auto-drafts to Tehsildar, police, SDM. Sends via WhatsApp in one tap.",
  },
];

const STEPS = [
  { label: "Register", desc: "Create your secure profile in 2 minutes." },
  {
    label: "Know Your Rights",
    desc: "AI explains what the law guarantees you.",
  },
  {
    label: "Take Action",
    desc: "File official letters and complaints instantly.",
  },
];

const TESTIMONIALS = [
  {
    q: "For the first time I understood my rights.",
    who: "Meera",
    loc: "Bihar",
  },
  {
    q: "Sahara drafted my police letter in one minute.",
    who: "Fatima",
    loc: "Bangladesh",
  },
  { q: "I didn't know I had rights. Now I do.", who: "Kamala", loc: "Nepal" },
  {
    q: "The AI spoke in my language. I wasn't alone.",
    who: "Sunita",
    loc: "Nepal",
  },
  {
    q: "My document vault saved everything when I needed it.",
    who: "Rokeya",
    loc: "Bangladesh",
  },
];

/* ── Index ────────────────────────────────────────────────── */
function Index() {
  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border/50 bg-background min-h-[100dvh] lg:min-h-0 text-center lg:text-left flex items-center">
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

        <div className="relative mx-auto w-full grid max-w-7xl items-center gap-14 px-6 py-[clamp(2rem,5vw,6rem)] sm:px-8 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3.5 py-1.5 text-[11.5px] font-medium tracking-wide text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Developed for Widows
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="mt-7"
            >
              <Typewriter />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="mt-6 text-[16px] leading-relaxed text-muted-foreground"
            >
              AI-powered legal protection for 300 million rural widows - in
              their language, on any phone, even without internet.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.28,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3 w-full"
            >
              <Link
                to="/how-it-works"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-[13px] font-semibold text-accent-foreground transition-all hover:brightness-110 w-full sm:w-auto touch-target"
              >
                See How It Works
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-6 py-3 text-[13px] font-medium text-foreground/75 transition-colors hover:bg-muted hover:text-foreground w-full sm:w-auto touch-target"
              >
                Try AI Demo
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2"
            >
              {[
                "Free to use",
                "Works offline",
                "4 languages",
                "No literacy required",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 text-[12.5px] text-muted-foreground"
                >
                  <Check className="h-3.5 w-3.5 text-accent" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
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
              { target: 40, suffix: "%", label: "Face property theft" },
              { target: 72, suffix: "h", label: "Avg. time to fraud attempt" },
              { target: 4, suffix: "", label: "Languages supported" },
            ].map((s) => (
              <div key={s.label} className="bg-card px-7 py-8">
                <Stat {...s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border/30">
  {/* Ambient blue whisper */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -top-32 left-1/4 h-[400px] w-[400px] rounded-full bg-[#2563EB]/[0.02] blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
    {/* Header */}
    <Reveal>
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <span className="inline-block text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#2563EB]/60">
            Platform
          </span>
          <h2 className="max-w-lg text-balance text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.12] tracking-[-0.035em] text-foreground">
            Built for those the law forgot.
          </h2>
        </div>
        <p className="max-w-[240px] text-[13.5px] leading-relaxed text-muted-foreground sm:text-right sm:pb-1">
          Three tools. One app. Complete protection.
        </p>
      </div>
    </Reveal>

    {/* Cards */}
    <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/30 bg-border/20 sm:grid-cols-3">
      {FEATURES.map((f, i) => (
        <Reveal key={f.title} delay={i * 0.06}>
          <div className="group relative flex h-full flex-col bg-card px-8 py-10 transition-all duration-300 hover:bg-[#2563EB]/[0.02] sm:px-10">
            {/* Number */}
            <span className="absolute right-6 top-6 text-[11px] font-medium tracking-[0.2em] text-foreground/10 transition-colors group-hover:text-[#2563EB]/20">
              {f.num}
            </span>

            {/* Icon */}
            <div className="mb-6 grid h-10 w-10 place-items-center rounded-xl border border-border/40 bg-muted/30 text-foreground/40 transition-all duration-300 group-hover:border-[#2563EB]/25 group-hover:bg-[#2563EB]/[0.06] group-hover:text-[#2563EB]">
              <f.icon className="h-[18px] w-[18px]" />
            </div>

            {/* Title + Desc */}
            <div className="flex-1">
              <h3 className="text-[15px] font-semibold tracking-[-0.015em] text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </div>

            {/* Arrow */}
            <div className="mt-8 flex h-8 w-8 items-center justify-center rounded-lg border border-border/30 bg-muted/20 text-foreground/15 opacity-0 transition-all duration-300 group-hover:border-[#2563EB]/20 group-hover:bg-[#2563EB]/[0.06] group-hover:text-[#2563EB] group-hover:opacity-100">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
</section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="border-b border-border/50 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
          <Reveal className="mb-14 text-center">
            <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.15em] text-accent">
              Process
            </p>
            <h2 className="text-[clamp(1.5rem,2.8vw,2.2rem)] font-semibold tracking-[-0.025em]">
              Three steps to protection
            </h2>
          </Reveal>

          <Reveal className="relative grid gap-10 sm:grid-cols-3 sm:gap-0">
            <div className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-px bg-border/50 sm:block" />
            {STEPS.map((s, i) => (
              <div
                key={s.label}
                className="relative flex flex-col items-center gap-4 px-8 text-center"
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-card text-[13px] font-semibold shadow-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="text-[14px] font-semibold">{s.label}</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

<section className="relative overflow-hidden border-b border-border/30">
  {/* Ambient depth */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-[#2563EB]/[0.015] blur-3xl" />
    <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-[#2563EB]/[0.01] blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
    {/* Header */}
    <Reveal>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-block text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#2563EB]/60">
            Impact
          </span>
          <h2 className="mt-2 text-[clamp(2rem,4vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.04em] text-foreground">
            Voices of change
          </h2>
        </div>
        <p className="max-w-[220px] text-[13.5px] leading-relaxed text-muted-foreground/60 sm:text-right sm:pb-1">
          Real stories. Real protection. Real lives changed.
        </p>
      </div>
    </Reveal>
  </div>

  {/* Marquee */}
  <div className="relative mb-28">
    {/* Fade edges — wider for bigger cards */}
    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-r from-transparent to-background" />

    <div className="marquee-track flex w-max gap-5 px-6 sm:px-10">
      {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
        <div
          key={i}
          className="group relative w-[340px] shrink-0 rounded-2xl border border-border/20 bg-card p-8 transition-all duration-500 hover:border-[#2563EB]/20 hover:bg-card/80 sm:w-[380px]"
        >
          {/* Subtle inner highlight on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#2563EB]/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative">
            {/* Quote mark */}
            <span className="mb-5 block text-4xl font-serif leading-none text-[#2563EB]/15">
              "
            </span>

            {/* Quote text */}
            <p className="text-[15px] leading-relaxed text-foreground/80 transition-colors group-hover:text-foreground/90">
              {t.q}
            </p>

            {/* Separator */}
            <div className="mt-6 h-px w-10 bg-border/40 transition-all duration-500 group-hover:w-16 group-hover:bg-[#2563EB]/25" />

            {/* Author */}
            <div className="mt-5 flex items-center gap-3.5">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#2563EB]/[0.05] text-[12px] font-semibold text-[#2563EB] transition-all duration-300 group-hover:bg-[#2563EB]/[0.1] group-hover:scale-105">
                {t.who[0]}
              </div>
              <div>
                <p className="text-[13px] font-medium text-foreground">
                  {t.who}
                </p>
                <p className="text-[12px] text-muted-foreground/50">
                  {t.loc}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

     <section className="relative overflow-hidden bg-background py-28 sm:py-36">
  {/* Ambient depth layers */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -top-64 right-0 h-[600px] w-[600px] translate-x-1/3 rounded-full bg-[#2563EB]/[0.03] blur-3xl" />
    <div className="absolute -bottom-48 left-0 h-[500px] w-[500px] -translate-x-1/3 rounded-full bg-[#3B82F6]/[0.02] blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <Reveal>
      <div className="flex flex-col items-start justify-between gap-12 lg:flex-row lg:gap-20">
        {/* Left: Label + Headline + Subhead */}
        <div className="flex-1">
          <span className="inline-block text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#2563EB]/60">
            Get Started
          </span>

          <h2 className="mt-5 max-w-lg text-balance text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.06] tracking-[-0.04em] text-foreground">
            Protect what is
            <br />
            <span className="italic text-[#2563EB]">yours.</span>
          </h2>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Free. In your language. On any phone - even without internet.
          </p>
        </div>

        {/* Right: CTAs + Trust line */}
        <div className="flex flex-1 flex-col items-start justify-end lg:items-end lg:pt-16">
          <div className="flex flex-col gap-3.5 sm:flex-row">
            <Link
              to="/demo"
              className="group relative isolate inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-[#2563EB] px-8 py-3.5 text-[13.5px] font-semibold text-white shadow-sm transition-all hover:bg-[#1D4ED8] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Get Protected - It's Free
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center gap-2.5 rounded-xl border border-[#2563EB]/15 px-8 py-3.5 text-[13.5px] font-medium text-[#2563EB] transition-all hover:border-[#2563EB]/30 hover:bg-[#2563EB]/[0.04]"
            >
              Learn More
            </Link>
          </div>

          <p className="mt-10 text-[11.5px] tracking-wide text-muted-foreground/50">
            Trusted by rural widows across South Asia
          </p>
        </div>
      </div>
    </Reveal>
  </div>
</section>
    </div>
  );
}
