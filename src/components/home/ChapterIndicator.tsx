"use client";

import { useEffect, useRef, useState } from "react";
import { chapters } from "@/data/content";
import { useScroll } from "@/components/motion/ScrollProvider";

/**
 * Discreet story index on the right edge (desktop). The active chapter and
 * progress line follow the scroll; clicking a chapter travels to it.
 * Hidden over the opening frame and once the footer arrives.
 */
export function ChapterIndicator() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLSpanElement>(null);
  const { scrollTo } = useScroll();

  // Position check on scroll (rAF-throttled). Works through pinned chapters,
  // where each pinned section sits at top: 0 for the length of its pin.
  useEffect(() => {
    let raf = 0;
    const els = chapters.map((c) => document.getElementById(c.id));
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      let idx = 0;
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= vh * 0.55) idx = i;
      });
      setActive(idx);
      const meaning = els[1]?.getBoundingClientRect();
      const last = els[els.length - 1]?.getBoundingClientRect();
      // Hidden over the menu chapter, whose final panel uses the full width for the menu index.
      const menuIdx = chapters.findIndex((c) => c.id === "menu");
      setVisible(!!meaning && !!last && meaning.top <= vh * 0.6 && last.bottom > vh * 0.5 && idx !== menuIdx);
      const max = document.documentElement.scrollHeight - vh;
      if (bar.current) bar.current.style.transform = `scaleY(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      aria-label="Story chapters"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      className={`fixed right-[calc(var(--gutter)*0.6)] top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-700 lg:block ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex items-stretch gap-4">
        <ol className="flex flex-col items-end gap-2.5 py-1">
          {chapters.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => scrollTo(`#${c.id}`)}
                aria-current={active === i ? "step" : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className={`t-label whitespace-nowrap transition-[opacity,transform,color] duration-500 ${
                    open || active === i ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
                  } ${active === i ? "text-ivory" : "text-muted group-hover:text-ivory"}`}
                >
                  {c.label}
                </span>
                <span className={`t-label t-num w-5 text-right ${active === i ? "text-brass" : "text-ivory/35"}`}>{String(i + 1).padStart(2, "0")}</span>
              </button>
            </li>
          ))}
        </ol>
        <span className="relative w-px bg-line">
          <span ref={bar} className="absolute inset-0 origin-top scale-y-0 bg-brass" />
        </span>
      </div>
    </nav>
  );
}
