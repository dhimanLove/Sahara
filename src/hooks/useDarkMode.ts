// hooks/useDarkMode.ts
import { useEffect, useState } from "react";

export function useDarkMode() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Safe check for browser environment
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("theme");
      if (saved === "dark") {
        setDark(true);
      } else if (saved === "light") {
        setDark(false);
      } else if (window.matchMedia) {
        setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    
    const root = document.documentElement;
    
    if (dark) {
      root.classList.remove("light");
      root.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      window.localStorage.setItem("theme", "light");
    }
  }, [dark, mounted]);

  const toggle = () => setDark(prev => !prev);

  return { dark, toggle };
}