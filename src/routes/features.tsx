import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, MessageCircle, Send, Mic, FileCheck, Shield, Zap, Globe } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features - Sahara" },
      { name: "description", content: "Document vault, AI rights assistant, legal letter generator." },
      { property: "og:title", content: "Features - Sahara" },
      { property: "og:description", content: "Powerful protection. Simple to use." },
    ],
  }),
  component: Features,
});

// Mock Components with cleaner design
function VaultMock() {
  const docs = [
    { name: "Land Deed.pdf", date: "12 Mar 2025", status: "verified" },
    { name: "Aadhaar.pdf", date: "01 Jan 2024", status: "verified" },
    { name: "Marriage Cert.pdf", date: "05 Jun 2010", status: "verified" },
  ];
  
  return (
    <div className="border border-border bg-background">
      <div className="border-b border-border bg-muted/5 px-5 py-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">Document Vault</h4>
          <span className="text-xs text-muted-foreground">{docs.length} documents</span>
        </div>
      </div>
      <div className="divide-y divide-border">
        {docs.map((d) => (
          <div key={d.name} className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-muted/10">
            <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-muted/20">
              <FileCheck className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.date}</p>
            </div>
            <span className="text-xs text-primary">✓ Verified</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatMock() {
  return (
    <div className="border border-border bg-background">
      <div className="border-b border-border bg-muted/5 px-5 py-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Legal Advisor</span>
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-sm bg-primary/5 px-3 py-2 text-sm text-foreground">
            मेरे देवर कह रहे हैं कि घर उनका है...
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[85%] border-l-2 border-primary bg-muted/5 px-3 py-2 text-sm text-foreground">
            आपका घर आपका है। हिंदू उत्तराधिकार अधिनियम धारा 14 के तहत आप पूर्ण मालिक हैं।
          </div>
        </div>
      </div>
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2">
          <input 
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground" 
            placeholder="Ask anything..." 
            disabled 
          />
          <button className="flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-muted/20 transition-colors hover:bg-muted/30">
            <Mic className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}

function LetterMock() {
  return (
    <div className="border border-border bg-background">
      <div className="border-b border-border bg-muted/5 px-5 py-3">
        <h4 className="text-sm font-medium text-foreground">Legal Letter Generator</h4>
      </div>
      <div className="p-5">
        <div className="space-y-2 rounded-sm border border-border bg-muted/10 p-4">
          <p className="text-xs font-medium text-muted-foreground">TO: The Tehsildar, District Patna</p>
          <p className="text-xs font-medium text-muted-foreground">SUBJECT: Complaint regarding forgery of land deed</p>
          <div className="h-px bg-border my-2" />
          <p className="text-sm leading-relaxed text-foreground/75">
            Respected Sir, I am writing to formally report the attempted forgery of my late husband's land records by relatives...
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 rounded-sm bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
            Share via WhatsApp
          </button>
          <button className="rounded-sm border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/10">
            Print
          </button>
        </div>
      </div>
    </div>
  );
}

// Core Values Section
function CoreValues() {
  const values = [
    { icon: Shield, title: "Security First", desc: "Bank-grade encryption with on-device verification" },
    { icon: Zap, title: "Instant Access", desc: "Legal protection available 24/7, no waiting periods" },
    { icon: Globe, title: "Multi-Language", desc: "Support for 12+ Indian languages & dialects" },
  ];
  
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.from(sectionRef.current?.children || [], {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
      },
    });
  }, []);
  
  return (
    <div ref={sectionRef} className="grid gap-6 sm:grid-cols-3">
      {values.map((value, idx) => (
        <div key={idx} className="border border-border bg-background p-6 text-center">
          <div className="mb-3 flex justify-center">
            <value.icon className="h-8 w-8 text-primary/60" />
          </div>
          <h3 className="mb-2 text-base font-medium text-foreground">{value.title}</h3>
          <p className="text-sm text-muted-foreground">{value.desc}</p>
        </div>
      ))}
    </div>
  );
}

function FeatureBlock({
  reverse,
  icon: Icon,
  title,
  subtitle,
  bullets,
  mock,
}: {
  reverse?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  bullets: string[];
  mock: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={sectionRef} className={`grid gap-10 lg:grid-cols-2 lg:gap-16 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div className="space-y-4">
        <div className="flex h-12 w-12 items-center justify-center border border-primary/20 bg-primary/5">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-light tracking-tight text-foreground sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <ul className="space-y-3 pt-2">
          {bullets.map((b, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-foreground/75">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary/60" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>{mock}</div>
    </div>
  );
}

function Features() {
  const heroRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
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
    });
    
    return () => ctx.revert();
  }, []);
  
  const techStack = [
    { name: "Firebase", color: "#FFA000", text: "#000" },
    { name: "Gemini AI", color: "#4285F4", text: "#fff" },
    { name: "Flutter", color: "#02569B", text: "#fff" },
    { name: "Google Maps", color: "#34A853", text: "#fff" },
    { name: "Google Translate", color: "#EA4335", text: "#fff" },
    { name: "TF Lite", color: "#FF6F00", text: "#fff" },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <PageMeta title="Features - Sahara" desc="Document vault, AI rights assistant, legal letter generator." />
      
      {/* Hero Section */}
      <div ref={heroRef} className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <h1 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Three pillars of protection
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
            Designed for low-literacy users on entry-level smartphones
          </p>
        </div>
      </div>
      
      {/* Features */}
      <div className="mx-auto max-w-6xl space-y-20 px-6 py-16 sm:px-8 lg:space-y-28 lg:py-24">
        <FeatureBlock
          icon={FileText}
          title="Document Vault"
          subtitle="Tamper-proof · Encrypted · Verifiable"
          bullets={[
            "SHA-256 hash on-device - proves no alteration",
            "Firebase AES-256 encryption - only you can access",
            "Offline cache - verifiable without internet",
          ]}
          mock={<VaultMock />}
        />
        
        <FeatureBlock
          reverse
          icon={MessageCircle}
          title="Legal Advisor"
          subtitle="Powered by Gemini AI · Voice-first"
          bullets={[
            "Plain language answers under 120 words",
            "Speak your question, hear the answer",
            "Knows Hindu, Muslim, Bangladeshi & Nepali law",
          ]}
          mock={<ChatMock />}
        />
        
        <FeatureBlock
          icon={Send}
          title="Legal Letters"
          subtitle="Generate official complaints in seconds"
          bullets={[
            "Voice description → AI classifies (forgery / coercion)",
            "Letters to Tehsildar, SHO, SDM, bank manager",
            "One-tap sharing on WhatsApp",
          ]}
          mock={<LetterMock />}
        />
      </div>
      
      {/* Core Values */}
      <div className="border-y border-border bg-muted/5 py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <h2 className="mb-8 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Core Principles
          </h2>
          <CoreValues />
        </div>
      </div>
      
      {/* Technology Stack */}
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:py-20">
        <div className="text-center">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Technology Stack
          </h2>
          <div ref={techRef} className="mt-6 flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className="rounded-sm px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                style={{ backgroundColor: tech.color, color: tech.text }}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}