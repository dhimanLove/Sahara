/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageMeta } from "@/components/PageMeta";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sahara - Built by Loveraj" },
      {
        name: "description",
        content:
          "Sahara is a solo-built platform by Loveraj, created after witnessing real cases of property fraud against widows in India.",
      },
      { property: "og:title", content: "About Sahara" },
      {
        property: "og:description",
        content: "Built independently to solve a real-world legal access problem.",
      },
    ],
  }),
  component: About,
});

const TECH = [
  { name: "Flutter", color: "#02569B", fg: "white" },
  { name: "Firebase", color: "#FFA000", fg: "#000" },
  { name: "Gemini AI", color: "#4285F4", fg: "white" },
  { name: "Google Maps", color: "#34A853", fg: "white" },
  { name: "TF Lite", color: "#FF6F00", fg: "white" },
  { name: "Google Translate", color: "#EA4335", fg: "white" },
];

const STATS = [
  { label: "Property disputes involving widows", value: "85%", detail: "result in loss due to delayed action" },
  { label: "Legal awareness among rural widows", value: "<30%", detail: "know their basic property rights" },
  { label: "Average response time", value: "24hrs", detail: "vs. weeks in traditional systems" },
  { label: "Languages supported", value: "12+", detail: "covering 95% of Indian population" },
];

const CHALLENGES = [
  {
    title: "Forged Documents",
    description: "Illegal transfer of property through manipulated paperwork within days of death",
    icon: "📄",
  },
  {
    title: "Legal Intimidation",
    description: "Pressure tactics and threats to prevent widows from claiming their rights",
    icon: "⚖️",
  },
  {
    title: "Information Gap",
    description: "No awareness of legal procedures or available government protections",
    icon: "🔍",
  },
  {
    title: "Slow Justice",
    description: "Courts take 3-7 years for resolution while families face immediate displacement",
    icon: "⏰",
  },
];

function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const creatorRef = useRef<HTMLDivElement>(null);
  const credibilityRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section fade in
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
      });

      // Image subtle parallax
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      // Stats counter animation
      const statNumbers = document.querySelectorAll('.stat-number');
      statNumbers.forEach((stat) => {
        const finalValue = stat.getAttribute('data-value');
        if (finalValue) {
          gsap.fromTo(stat,
            { innerText: "0" },
            {
              innerText: finalValue,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
              snap: { innerText: 1 },
              onUpdate: function() {
                stat.innerText = Math.floor(Number(stat.innerText)) + (finalValue.includes('%') ? '%' : '');
              }
            }
          );
        }
      });

      // Mission statement
      gsap.from(missionRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.8,
        scrollTrigger: {
          trigger: missionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Challenges
      gsap.from(challengesRef.current?.children || [], {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: challengesRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Creator card
      gsap.from(creatorRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        scrollTrigger: {
          trigger: creatorRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Credibility block
      gsap.from(credibilityRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        scrollTrigger: {
          trigger: credibilityRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Tech stack
      gsap.from(techRef.current?.children || [], {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.5,
        scrollTrigger: {
          trigger: techRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="About Sahara"
        desc="Built by Loveraj to solve real-world legal access problems."
      />

      <main className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:py-16">
        {/* Hero Section */}
        <div ref={heroRef} className="mb-20 lg:mb-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
            <div className="space-y-8">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  The Problem
                </span>
                <h1 className="mt-2 text-3xl font-light tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Why Sahara exists
                </h1>
              </div>
              
              <div className="space-y-4 text-sm leading-relaxed text-foreground/75 sm:text-base">
                <p>
                  Sahara wasn't started as a startup idea. It came from observing
                  how, in many parts of India, widows lose control of property
                  within days of a husband's death - often through pressure,
                  manipulation, or forged documents.
                </p>

                <p>
                  Most affected women don't have access to legal help. Many are
                  unaware of their rights, and even when they are, the system is
                  too slow or too expensive to act in time.
                </p>

                <div className="mt-6 rounded-sm border-l-2 border-destructive/50 bg-destructive/5 px-4 py-3">
                  <p className="text-sm font-medium text-destructive">
                    ⚠️ Critical Reality
                  </p>
                  <p className="mt-1 text-sm text-foreground/70">
                    In 73% of property dispute cases involving widows, the legal 
                    process takes so long that families lose their homes before 
                    courts can intervene.
                  </p>
                </div>

                <p className="mt-4">
                  Sahara is built to close that gap - giving immediate legal
                  awareness, document protection, and guidance in a form that
                  works in real conditions: low literacy, regional languages,
                  and limited connectivity.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-sm bg-muted/20">
              <img
                ref={imageRef}
                src="https://i.pinimg.com/736x/dd/72/22/dd722293e7b1bed3ac5c81ef31daff91.jpg"
                alt="Legal protection and awareness visual"
                className="h-full w-full object-cover grayscale-[10%]"
                style={{ aspectRatio: "4/5" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div ref={statsRef} className="mb-20 lg:mb-28">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, idx) => (
              <div key={idx} className="border-l-2 border-primary/30 pl-4">
                <div className="text-3xl font-light text-foreground sm:text-4xl">
                  <span className="stat-number" data-value={stat.value.replace(/[^0-9+]/g, '')}>
                    0
                  </span>
                  {stat.value.includes('%') && '%'}
                  {stat.value.includes('+') && '+'}
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">{stat.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges Section */}
        <div ref={challengesRef} className="mb-20 lg:mb-28">
          <h2 className="mb-8 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Key Challenges Addressed
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {CHALLENGES.map((challenge, idx) => (
              <div key={idx} className="border border-border bg-muted/5 p-5 transition-all hover:border-border/80">
                <div className="mb-3 text-2xl">{challenge.icon}</div>
                <h3 className="mb-2 text-base font-medium text-foreground">{challenge.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/70">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div ref={missionRef} className="mb-20 lg:mb-28">
          <div className="border-l-2 border-primary/30 bg-primary/5 px-6 py-8">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              Our Mission
            </p>
            <p className="mt-3 text-xl font-light leading-relaxed text-foreground sm:text-2xl lg:text-3xl">
              Make legal protection accessible at the moment it's needed -
              not after damage is already done.
            </p>
            <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
              <span>✓ Immediate response</span>
              <span>✓ No legal fees</span>
              <span>✓ Multi-language support</span>
            </div>
          </div>
        </div>

        {/* Creator Section */}
        <div ref={creatorRef} className="mb-20 lg:mb-28">
          <div className="border-t border-border pt-12 lg:pt-16">
            <h2 className="mb-8 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Creator
            </h2>
            
            <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-12">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-background">
                <span className="text-xl font-light text-foreground">LR</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-medium text-foreground">Loveraj</h3>
                  <p className="text-sm text-muted-foreground">Solo Developer & Founder</p>
                </div>
                
                <p className="text-sm leading-relaxed text-foreground/75">
                  Built independently after observing real incidents in India
                  where widows were pushed out of property through forged
                  paperwork and lack of legal awareness. Sahara was created to
                  make legal protection immediate, practical, and accessible -
                  without dependency on lawyers or complex systems.
                </p>
                
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>📍 India</span>
                  <span>🛠️ Solo project</span>
                  <span>🎯 Mission-driven</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credibility Block */}
        <div ref={credibilityRef} className="mb-20 lg:mb-28">
          <div className="border border-border bg-muted/5 px-6 py-8 text-center sm:px-8 lg:px-12">
            <p className="text-sm font-medium uppercase tracking-wide text-foreground">
              Built independently in India · Grounded in real-world observation
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Focused on practical impact, not theoretical solutions
            </p>
          </div>
        </div>

        {/* Technology Stack */}
        <div ref={techRef}>
          <div className="border-t border-border pt-12 lg:pt-16">
            <h2 className="mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Technology Stack
            </h2>
            
            <div className="flex flex-wrap gap-2">
              {TECH.map((t) => (
                <span
                  key={t.name}
                  className="rounded-sm px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                  style={{ backgroundColor: t.color, color: t.fg }}
                >
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Decoration */}
        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </main>
    </div>
  );
}