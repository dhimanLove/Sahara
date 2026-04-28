import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? scrolled / max : 0;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${pct})`;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[60] h-[3px] w-full overflow-hidden">
      <div
        ref={barRef}
        className="
          h-full w-full origin-left
          bg-accent
          will-change-transform
          transition-transform duration-150 ease-out
        "
      />
    </div>
  );
}