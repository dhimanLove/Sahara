import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X, Download, Shield, Zap, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/features", label: "Features" },
  { to: "/demo", label: "Demo" },
  { to: "/voice-chat", label: "Voice" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/impact", label: "Impact" },
];

function NavLink({ to, label, exact }: { to: string; label: string; exact?: boolean }) {
  return (
    <li className="list-none">
      <Link
        to={to}
        activeOptions={{ exact }}
        className="relative py-1 text-[13px] font-medium text-foreground/50 transition-colors duration-150 hover:text-foreground [&.active]:text-foreground"
        activeProps={{ className: "active" }}
      >
        {({ isActive }: { isActive: boolean }) => (
          <>
            {label}
            {isActive && (
              <motion.span
                layoutId="nav-underline"
                className="absolute -bottom-px left-0 h-px w-full bg-foreground"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </>
        )}
      </Link>
    </li>
  );
}

function DownloadTooltip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute right-0 top-[calc(100%+12px)] z-50 w-[240px] rounded-lg border border-border bg-background shadow-lg"
    >
      {/* Arrow */}
      <div className="absolute -top-[5px] right-4 h-2.5 w-2.5 rotate-45 border-l border-t border-border bg-background" />
      
      <div className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Smartphone className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Mobile App</p>
            <p className="text-xs text-muted-foreground">Coming to Android & iOS</p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-3">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-medium text-muted-foreground">Launch Progress</span>
            <span className="text-[11px] font-semibold text-foreground">68%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
          </div>
        </div>
        
        {/* Status list */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-foreground/70">Web Platform - Live</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-foreground/70">Backend API - Live</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span className="text-xs text-foreground/70">Android App - Q3 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
            <span className="text-xs text-muted-foreground/60">iOS App - TBD</span>
          </div>
        </div>
        
        {/* Notice */}
        <div className="mt-3 rounded-md bg-muted/30 px-2 py-1.5">
          <p className="text-center text-[10px] text-muted-foreground">
            Beta access available for early testers
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { dark, toggle } = useDarkMode();
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 40], [0, 1]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md">
      {/* Scroll-reactive bottom border */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border"
        style={{ opacity: borderOpacity }}
      />

      <nav className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Logo */}
        <Link to="/" aria-label="Sahara home" className="flex items-center gap-2.5 outline-none">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[15px] font-semibold tracking-tight text-foreground">Sahara</span>
            <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground/50">
              Legal Access
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-5 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} label={l.label} exact={l.to === "/"} />
          ))}
        </ul>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={dark ? "sun" : "moon"}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                className="absolute"
              >
                {dark ? <Sun className="h-[15px] w-[15px]" /> : <Moon className="h-[15px] w-[15px]" />}
              </motion.span>
            </AnimatePresence>
          </button>

          <span className="mx-0.5 hidden h-4 w-px bg-border sm:block" />

          {/* Download Button with Tooltip */}
          <div
            className="relative hidden sm:block"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <button
              disabled
              className="inline-flex cursor-default items-center gap-1.5 rounded-md border border-border bg-muted/30 px-3 py-1.5 text-xs font-medium text-foreground/60"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <Download className="h-3 w-3" />
              Download
            </button>

            <AnimatePresence>
              {showTooltip && <DownloadTooltip />}
            </AnimatePresence>
          </div>

          {/* Mobile menu button */}
          <button
            className="relative ml-1 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 20 }}
                transition={{ duration: 0.15 }}
                className="absolute"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden border-t border-border bg-background/98 backdrop-blur-lg lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-6 pb-5 pt-2">
              <ul className="flex flex-col gap-px">
                {links.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.2 }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                      activeOptions={{ exact: l.to === "/" }}
                      activeProps={{
                        className: "flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium bg-muted/30 text-foreground",
                      }}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile download section */}
              <div className="mt-3 rounded-md border border-border bg-muted/20 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background">
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground/70">Mobile App</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                      <span className="text-xs text-primary/80">Coming Q3 2026</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xs font-medium text-muted-foreground">68%</p>
                    <p className="text-2xs text-muted-foreground/60">ready</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 