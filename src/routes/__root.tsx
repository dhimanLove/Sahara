import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SOSButton } from "@/components/SOSButton";
import { ScrollProgress } from "@/components/ScrollProgress";

function NotFoundComponent() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4">
      <div className="max-w-md text-center">
        <svg viewBox="0 0 120 120" className="mx-auto h-28 w-28">
          <path d="M60 10 L20 28 V60 C20 84 60 110 60 110 L60 60 Z" fill="none" stroke="#1D9E75" strokeWidth="3" />
          <path d="M60 10 L100 28 V60 C100 84 60 110 60 110 L60 60 Z" fill="none" stroke="#1D9E75" strokeWidth="3" strokeDasharray="6 4" />
        </svg>
        <h1 className="mt-6 text-4xl font-bold">404 - Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          The page you're looking for doesn't exist - but your rights always do.
        </p>
        <Link to="/" className="mt-6 inline-flex rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90">
          Go back home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "index, follow" },
      { title: "Sahara Legal Access — AI Legal Protection for Rural Widows" },
      {
        name: "description",
        content: "Sahara Legal Access protects rural widows from inheritance fraud and legal intimidation with AI-backed verification, secure documents, and trusted-contact alerts.",
      },
      { property: "og:site_name", content: "Sahara Legal Access" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", href: "/things.ico", type: "image/x-icon" },
      { rel: "shortcut icon", href: "/things.ico", type: "image/x-icon" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key="route"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <SOSButton />
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}
