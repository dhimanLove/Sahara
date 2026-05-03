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
          <path
            d="M60 10 L20 28 V60 C60 84 60 110 60 110 L60 60 Z"
            fill="none"
            stroke="#1D9E75"
            strokeWidth="3"
          />
          <path
            d="M60 10 L100 28 V60 C100 84 60 110 60 110 L60 60 Z"
            fill="none"
            stroke="#1D9E75"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
        </svg>
        <h1 className="mt-6 text-4xl font-bold">404 - Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          The page you're looking for doesn't exist - but your rights always do.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: "stylesheet", href: appCss }],
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
