import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Shield,
  Users,
  Mic,
  CheckCircle,
  Scale,
  Bell,
  MapPin,
  FileText,
  Bot,
  Handshake,
  Lock,
  Database,
  Cloud,
  Smartphone,
  Languages,
} from "lucide-react";
import { PageMeta } from "@/components/PageMeta";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Sahara Works - Three phases of protection" },
      {
        name: "description",
        content: "Three phases: proactive registration, immediate protection, active defence.",
      },
      { property: "og:title", content: "How Sahara Works" },
      { property: "og:description", content: "Three phases of protection." },
    ],
  }),
  component: HowItWorks,
});

const PHASES = [
  {
    n: 1,
    badge: "Do this now",
    title: "Proactive Protection",
    icon: Shield,
    steps: [
      {
        icon: FileText,
        title: "Register Documents",
        desc: "SHA-256 sealed land deeds, Aadhaar, marriage certificates",
      },
      {
        icon: Users,
        title: "Trusted Contacts",
        desc: "Daughter, NGO, ASHA worker - auto-notified in emergency",
      },
      { icon: Mic, title: "Voice Will", desc: "State wishes by voice. Encrypted. Timestamped." },
    ],
  },
  {
    n: 2,
    badge: "First 72 hours",
    title: "Immediate Protection",
    icon: Bell,
    steps: [
      {
        icon: CheckCircle,
        title: "Register Bereavement",
        desc: "One-tap - locks vault, notifies network",
      },
      {
        icon: Scale,
        title: "Rights Explained",
        desc: "Gemini reads your laws aloud, in your language",
      },
      {
        icon: Bell,
        title: "Contacts Alerted",
        desc: "Trusted circle gets your location and status",
      },
      {
        icon: MapPin,
        title: "Help on Maps",
        desc: "Nearest free legal aid centres on Google Maps",
      },
    ],
  },
  {
    n: 3,
    badge: "When fraud is attempted",
    title: "Active Defence",
    icon: Bot,
    steps: [
      { icon: Mic, title: "Describe Threat", desc: "Speak - no typing required" },
      { icon: Bot, title: "AI Classifies", desc: "Forgery, occupation, coercion - Gemini decides" },
      { icon: FileText, title: "Letter Generated", desc: "Tehsildar, SHO, SDM, bank - instantly" },
      { icon: Handshake, title: "NGO Connected", desc: "BLAST, NALSA, NHRC - hand-off in one tap" },
    ],
  },
];

const TECH_STACK = [
  { name: "Flutter", category: "Frontend", purpose: "Cross-platform mobile app", color: "#02569B" },
  {
    name: "Firebase",
    category: "Backend",
    purpose: "Authentication, database, storage",
    color: "#FFA000",
  },
  {
    name: "Gemini AI",
    category: "AI/ML",
    purpose: "Legal analysis & classification",
    color: "#4285F4",
  },
  {
    name: "Google Maps",
    category: "Location",
    purpose: "Legal aid centre locator",
    color: "#34A853",
  },
  {
    name: "TensorFlow Lite",
    category: "AI/ML",
    purpose: "On-device ML for low connectivity",
    color: "#FF6F00",
  },
  {
    name: "Google Translate",
    category: "NLP",
    purpose: "Multi-language support",
    color: "#EA4335",
  },
  {
    name: "Speech Recognition",
    category: "Voice",
    purpose: "Voice-first interface",
    color: "#7C3AED",
  },
  { name: "AES-256", category: "Security", purpose: "End-to-end encryption", color: "#059669" },
];

const ACCESSIBILITY_FEATURES = [
  { icon: Smartphone, label: "₹5,000 phones", desc: "Works on budget smartphones" },
  { icon: Cloud, label: "Offline capable", desc: "Core features work without internet" },
  { icon: Languages, label: "4+ languages", desc: "Hindi, Bengali, Nepali, English" },
  { icon: Database, label: "2G friendly", desc: "Optimized for slow networks" },
];

function HowItWorks() {
  const heroRef = useRef<HTMLDivElement>(null);
  const phasesRef = useRef<(HTMLDivElement | null)[]>([]);
  const techRef = useRef<HTMLDivElement>(null);
  const accessibilityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      });

      // Phase animations
      phasesRef.current.forEach((phase, idx) => {
        if (phase) {
          gsap.from(phase, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: idx * 0.15,
            scrollTrigger: {
              trigger: phase,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      // Tech stack animation
      gsap.from(techRef.current?.children || [], {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.5,
        scrollTrigger: {
          trigger: techRef.current,
          start: "top 85%",
        },
      });

      // Accessibility features animation
      gsap.from(accessibilityRef.current?.children || [], {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.5,
        scrollTrigger: {
          trigger: accessibilityRef.current,
          start: "top 85%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title="How Sahara Works" desc="Three phases of protection." />

      {/* Hero Section */}
      <div ref={heroRef} className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <h1 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Three phases of protection
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            From prevention to active defence - Sahara is with her at every stage.
          </p>
        </div>
      </div>

      {/* Phases */}
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:py-20">
        <div className="space-y-16 lg:space-y-20">
          {PHASES.map((phase, idx) => (
            <div
              key={phase.n}
              ref={(el) => {
                phasesRef.current[idx] = el;
              }}
              className="relative"
            >
              {/* Phase Header */}
              <div className="mb-8 flex items-start gap-4 sm:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-primary/20 bg-primary/5 sm:h-14 sm:w-14">
                  <phase.icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                </div>
                <div>
                  <span className="inline-block rounded-sm border border-primary/20 bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary">
                    Phase {phase.n} · {phase.badge}
                  </span>
                  <h2 className="mt-2 text-xl font-light text-foreground sm:text-2xl">
                    {phase.title}
                  </h2>
                </div>
              </div>

              {/* Steps Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {phase.steps.map((step, stepIdx) => (
                  <div
                    key={stepIdx}
                    className="border border-border bg-background p-5 transition-all hover:border-primary/20 hover:bg-muted/5"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sm border border-primary/20 bg-primary/5">
                      <step.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="mb-1 text-sm font-medium text-foreground">{step.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Connector Line */}
              {idx < PHASES.length - 1 && (
                <div className="absolute -bottom-8 left-6 hidden h-8 w-px bg-border lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="border-y border-border bg-muted/5 py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Technology Stack
            </h2>
            <p className="mt-2 text-sm text-foreground/70">
              Built with modern, accessible technology
            </p>
          </div>

          <div ref={techRef} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-3 border border-border bg-background p-3"
              >
                <div
                  className="h-8 w-8 shrink-0 rounded-sm"
                  style={{ backgroundColor: tech.color }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{tech.name}</p>
                  <p className="text-xs text-muted-foreground">{tech.purpose}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessibility Features */}
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:py-20">
        <div className="mb-8 text-center">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Designed for Everyone
          </h2>
          <p className="mt-2 text-sm text-foreground/70">Accessible on any device, anywhere</p>
        </div>

        <div ref={accessibilityRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACCESSIBILITY_FEATURES.map((feature) => (
            <div key={feature.label} className="border border-border bg-background p-5 text-center">
              <div className="mb-3 flex justify-center">
                <feature.icon className="h-6 w-6 text-primary/60" />
              </div>
              <h3 className="mb-1 text-sm font-medium text-foreground">{feature.label}</h3>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Final Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-sm border border-primary/20 bg-primary/5 px-4 py-2">
            <Shield className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary">
              Works offline · 2G · Hindi · Bengali · Nepali · English
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
