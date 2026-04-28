import { Link } from "@tanstack/react-router";

const sdgs = [
  { n: 1, color: "#FF6B35", label: "No Poverty" },
  { n: 5, color: "#FF3A6E", label: "Gender Equality" },
  { n: 10, color: "#DD1367", label: "Reduced Inequalities" },
  { n: 16, color: "#00689D", label: "Peace & Justice" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground">S</span>
            <span className="text-lg">Sahara</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            AI-powered legal protection for rural widows across South Asia.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Quick links</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {[
              ["/about", "About"],
              ["/features", "Features"],
              ["/demo", "AI Demo"],
              ["/how-it-works", "How It Works"],
              ["/impact", "Impact"],
              
            ].map(([to, l]) => (
              <li key={to}>
                <Link to={to} className="hover:text-accent">{l}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Sustainable Development Goals</h4>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {sdgs.map((s) => (
              <div
                key={s.n}
                title={`SDG ${s.n}: ${s.label}`}
                className="grid h-12 place-items-center rounded-lg font-bold text-white"
                style={{ background: s.color }}
              >
                {s.n}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
        Built with Gemini AI · Firebase · Flutter · Google Maps · Google Solution Challenge 2026 · © 2026 Sahara
      </div>
    </footer>
  );
}
