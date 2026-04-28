import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Star, 
  Users, 
  TrendingUp, 
  Clock, 
  Languages,
  Globe,
  Target,
  Heart,
  Shield,
  BookOpen,
  Award,
  BarChart3,
  ArrowUp
} from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { useCounter } from "@/hooks/useCounter";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact - Sahara" },
      { name: "description", content: "The numbers behind our mission to protect 300M widows in South Asia." },
    ],
  }),
  component: Impact,
});

function Counter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { value, ref } = useCounter(target);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-light text-foreground sm:text-4xl">
        {value.toLocaleString()}{suffix}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

// Accurate South Asia Map
const SouthAsiaMap = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative">
      <svg viewBox="0 0 500 500" className="w-full">
        {/* Pakistan */}
        <path
          d="M 100 100 L 150 80 L 180 110 L 190 140 L 185 175 L 170 200 L 145 195 L 115 210 L 90 195 L 75 170 L 70 140 Z"
          fill={hovered === "Pakistan" ? "#E8F3EF" : "#F5F9F7"}
          stroke="#2D6A4F"
          strokeWidth="1.5"
          onMouseEnter={() => setHovered("Pakistan")}
          onMouseLeave={() => setHovered(null)}
          className="cursor-pointer transition-all duration-200"
        />
        
        {/* India */}
        <path
          d="M 195 100 L 250 85 L 310 90 L 360 110 L 385 150 L 390 195 L 375 240 L 350 280 L 310 320 L 275 355 L 245 375 L 215 360 L 195 330 L 180 290 L 170 250 L 165 210 L 170 170 L 180 140 Z"
          fill={hovered === "India" ? "#E8F3EF" : "#F5F9F7"}
          stroke="#2D6A4F"
          strokeWidth="1.5"
          onMouseEnter={() => setHovered("India")}
          onMouseLeave={() => setHovered(null)}
          className="cursor-pointer transition-all duration-200"
        />
        
        {/* Nepal */}
        <path
          d="M 275 135 L 310 130 L 325 150 L 315 175 L 290 180 L 265 170 Z"
          fill={hovered === "Nepal" ? "#FFF8E7" : "#FFFBEB"}
          stroke="#D4A373"
          strokeWidth="1.5"
          onMouseEnter={() => setHovered("Nepal")}
          onMouseLeave={() => setHovered(null)}
          className="cursor-pointer transition-all duration-200"
        />
        
        {/* Bangladesh */}
        <path
          d="M 370 210 L 410 200 L 435 225 L 440 260 L 420 280 L 390 270 L 370 250 Z"
          fill={hovered === "Bangladesh" ? "#E8F3EF" : "#F5F9F7"}
          stroke="#2D6A4F"
          strokeWidth="1.5"
          onMouseEnter={() => setHovered("Bangladesh")}
          onMouseLeave={() => setHovered(null)}
          className="cursor-pointer transition-all duration-200"
        />
        
        {/* Sri Lanka */}
        <path
          d="M 295 400 Q 315 390 325 410 Q 330 435 310 450 Q 290 445 285 425 Q 280 410 295 400 Z"
          fill={hovered === "Sri Lanka" ? "#E8F3EF" : "#F5F9F7"}
          stroke="#2D6A4F"
          strokeWidth="1.2"
          onMouseEnter={() => setHovered("Sri Lanka")}
          onMouseLeave={() => setHovered(null)}
          className="cursor-pointer transition-all duration-200"
        />
        
        {/* Cities */}
        <circle cx="130" cy="130" r="3.5" fill="#E63946" stroke="white" strokeWidth="1.5" />
        <text x="100" y="125" fontSize="9" fill="#333" fontWeight="500">Islamabad</text>
        
        <circle cx="275" cy="215" r="4" fill="#E63946" stroke="white" strokeWidth="1.5" />
        <text x="250" y="210" fontSize="9" fill="#333" fontWeight="600">New Delhi</text>
        
        <circle cx="295" cy="160" r="3.5" fill="#E63946" stroke="white" strokeWidth="1.5" />
        <text x="275" y="155" fontSize="9" fill="#333" fontWeight="500">Kathmandu</text>
        
        <circle cx="410" cy="245" r="3.5" fill="#E63946" stroke="white" strokeWidth="1.5" />
        <text x="390" y="240" fontSize="9" fill="#333" fontWeight="500">Dhaka</text>
        
        <circle cx="310" cy="430" r="3" fill="#E63946" stroke="white" strokeWidth="1.5" />
        <text x="285" y="435" fontSize="9" fill="#333" fontWeight="500">Colombo</text>
      </svg>
      
      {hovered && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-sm border border-border bg-background px-3 py-2 shadow-lg whitespace-nowrap">
          <p className="text-xs font-medium text-foreground">{hovered}</p>
          <p className="text-xs text-muted-foreground">
            {hovered === "India" && "Hindu Succession Act 1956"}
            {hovered === "Pakistan" && "Muslim Personal Law 1962"}
            {hovered === "Bangladesh" && "Muslim Family Laws 1961"}
            {hovered === "Nepal" && "Civil Code 2017"}
            {hovered === "Sri Lanka" && "Muslim Marriage Act"}
          </p>
        </div>
      )}
    </div>
  );
};

// Growth Graph Component
const GrowthGraph = () => {
  const years = ["2024", "2025", "2026", "2027", "2028"];
  const users = [25000, 150000, 500000, 1500000, 5000000];
  const maxUsers = 5000000;
  
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-foreground">User Growth Projection</h3>
          <p className="text-xs text-muted-foreground">Expected reach across South Asia</p>
        </div>
        <div className="flex items-center gap-1 rounded-sm bg-primary/5 px-2 py-1">
          <ArrowUp className="h-3 w-3 text-primary" />
          <span className="text-xs font-medium text-primary">+200% YoY</span>
        </div>
      </div>
      
      <div className="relative">
        <svg viewBox="0 0 400 280" className="w-full">
          {/* Background grid */}
          <line x1="50" y1="240" x2="370" y2="240" stroke="#E5E7EB" strokeWidth="1" />
          <line x1="50" y1="180" x2="370" y2="180" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="50" y1="120" x2="370" y2="120" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="50" y1="60" x2="370" y2="60" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="4" />
          
          {/* Y-axis labels */}
          <text x="45" y="244" fontSize="8" fill="#9CA3AF" textAnchor="end">0</text>
          <text x="45" y="184" fontSize="8" fill="#9CA3AF" textAnchor="end">1.25M</text>
          <text x="45" y="124" fontSize="8" fill="#9CA3AF" textAnchor="end">2.5M</text>
          <text x="45" y="64" fontSize="8" fill="#9CA3AF" textAnchor="end">5M</text>
          
          {/* Area under curve */}
          <polygon
            points={users.map((val, i) => {
              const x = 70 + (i * 280 / 4);
              const y = 240 - (val / maxUsers) * 180;
              return `${x},${y}`;
            }).join(" ") + ` 370,240 50,240`}
            fill="#2D6A4F"
            fillOpacity="0.1"
          />
          
          {/* Line chart */}
          <polyline
            points={users.map((val, i) => {
              const x = 70 + (i * 280 / 4);
              const y = 240 - (val / maxUsers) * 180;
              return `${x},${y}`;
            }).join(" ")}
            fill="none"
            stroke="#2D6A4F"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0 1000"
              to="1000 0"
              dur="1.5s"
              fill="freeze"
            />
          </polyline>
          
          {/* Data points */}
          {users.map((val, i) => {
            const x = 70 + (i * 280 / 4);
            const y = 240 - (val / maxUsers) * 180;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="4" fill="#2D6A4F" stroke="white" strokeWidth="2">
                  <animate attributeName="r" from="0" to="4" dur="0.3s" begin={`${i * 0.1}s`} fill="freeze" />
                </circle>
                <text x={x} y={y - 8} fontSize="9" fill="#2D6A4F" textAnchor="middle" fontWeight="500">
                  {val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : `${(val / 1000).toFixed(0)}K`}
                </text>
              </g>
            );
          })}
          
          {/* X-axis labels */}
          {years.map((year, i) => {
            const x = 70 + (i * 280 / 4);
            return (
              <text key={i} x={x} y="260" fontSize="9" fill="#6B7280" textAnchor="middle">
                {year}
              </text>
            );
          })}
        </svg>
      </div>
      
      {/* Stats below graph */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="border border-border bg-muted/5 p-3 text-center">
          <p className="text-2xl font-light text-foreground">5M+</p>
          <p className="text-xs text-muted-foreground">Projected users by 2028</p>
        </div>
        <div className="border border-border bg-muted/5 p-3 text-center">
          <p className="text-2xl font-light text-foreground">7</p>
          <p className="text-xs text-muted-foreground">Countries covered</p>
        </div>
      </div>
    </div>
  );
};

const SDGS = [
  { n: 1, title: "No Poverty", color: "#E63946", how: "Protecting widows' assets keeps families above poverty line" },
  { n: 5, title: "Gender Equality", color: "#F4A261", how: "Equal legal access for the most marginalised women" },
  { n: 10, title: "Reduced Inequalities", color: "#2A9D8F", how: "Bridging the legal knowledge gap between rural and urban" },
  { n: 16, title: "Peace & Justice", color: "#264653", how: "Making justice institutions accessible to the last mile" },
];

const TESTIMONIALS = [
  { quote: "For the first time, I understood what the law said about my land.", name: "Meera Devi", location: "Bihar, India" },
  { quote: "Sahara helped us draft a letter to the tehsildar the same day.", name: "Anita Begum", location: "Khulna, Bangladesh" },
  { quote: "I was told I had no rights. Sahara told me exactly which law protected me.", name: "Kamala Tamang", location: "Pokhara, Nepal" },
];

function Impact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const sdgsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, { opacity: 0, y: 30, duration: 0.8 });
      gsap.from(statsRef.current?.children || [], { opacity: 0, y: 20, stagger: 0.1, duration: 0.6, scrollTrigger: { trigger: statsRef.current, start: "top 85%" } });
      gsap.from(splitRef.current, { opacity: 0, y: 30, duration: 0.7, scrollTrigger: { trigger: splitRef.current, start: "top 85%" } });
      gsap.from(sdgsRef.current?.children || [], { opacity: 0, y: 30, stagger: 0.1, duration: 0.6, scrollTrigger: { trigger: sdgsRef.current, start: "top 85%" } });
      gsap.from(testimonialsRef.current?.children || [], { opacity: 0, y: 20, stagger: 0.08, duration: 0.5, scrollTrigger: { trigger: testimonialsRef.current, start: "top 85%" } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title="Impact - Sahara" desc="The numbers behind our mission." />

      {/* Hero */}
      <div ref={heroRef} className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <div className="inline-flex items-center gap-2 rounded-sm border border-primary/20 bg-primary/5 px-3 py-1">
            <Globe className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary">South Asia Initiative</span>
          </div>
          <h1 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl">The scale of the problem</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">300 million widows. 7 countries. One mission.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div ref={statsRef} className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Counter target={300} suffix="M+" label="Widows in South Asia" />
          <Counter target={40} suffix="%" label="Face Property Theft" />
          <Counter target={72} suffix="" label="Hours to First Fraud" />
          <Counter target={4} suffix="" label="Languages Supported" />
        </div>
      </div>

      {/* Split Section: Map + Graph */}
      <div className="border-y border-border bg-muted/5 py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <h2 className="mb-8 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Where we work & our growth</h2>
          
          <div ref={splitRef} className="grid gap-8 lg:grid-cols-2">
            {/* Left: Map */}
            <div className="border border-border bg-background p-4">
              <div className="mb-3 flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary/60" />
                <h3 className="text-sm font-medium text-foreground">Geographic Coverage</h3>
              </div>
              <SouthAsiaMap />
              <div className="mt-4 flex justify-center gap-4 text-center">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#2D6A4F]" />
                  <span className="text-xs text-muted-foreground">Active regions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#E63946]" />
                  <span className="text-xs text-muted-foreground">Major cities</span>
                </div>
              </div>
            </div>
            
            {/* Right: Graph */}
            <div className="border border-border bg-background p-4">
              <GrowthGraph />
            </div>
          </div>
        </div>
      </div>

      {/* SDGs */}
      <div ref={sdgsRef} className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:py-20">
        <h2 className="mb-8 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">SDG Alignment</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SDGS.map((sdg) => (
            <div key={sdg.n} className="border-l-2 p-4" style={{ borderColor: sdg.color }}>
              <div className="text-2xl font-light" style={{ color: sdg.color }}>{sdg.n}</div>
              <h3 className="mt-1 text-sm font-medium text-foreground">{sdg.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{sdg.how}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="border-y border-border bg-muted/5 py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <h2 className="mb-8 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Voices from the field</h2>
          <div ref={testimonialsRef} className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="border border-border bg-background p-5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="h-3 w-3 fill-primary/20 text-primary/20" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-2 border-t border-border/50 pt-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-xs font-medium text-primary">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mx-auto max-w-6xl px-6 py-12 text-center sm:px-8">
        <div className="inline-flex items-center gap-2 rounded-sm border border-primary/20 bg-primary/5 px-4 py-2">
          <Award className="h-3 w-3 text-primary" />
          <span className="text-xs font-medium text-primary">Building measurable impact · Aligned with UN SDGs</span>
        </div>
      </div>
    </div>
  );
}

export default Impact;