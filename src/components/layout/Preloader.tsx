"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export const INTRO_EVENT = "kahani:intro";

/** Fire the intro immediately when there is no preloader. */
export function whenIntroReady(cb: () => void) {
  const w = window as unknown as { __kahaniIntro?: boolean };
  if (w.__kahaniIntro) {
    cb();
    return () => {};
  }
  const h = () => cb();
  window.addEventListener(INTRO_EVENT, h, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, h);
}

function release() {
  (window as unknown as { __kahaniIntro?: boolean }).__kahaniIntro = true;
  window.dispatchEvent(new Event(INTRO_EVENT));
}

/**
 * A short wordmark sequence on the first visit of a session (about 1.6s).
 * Skipped on repeat visits and for reduced-motion users. Never blocks for
 * longer than the sequence itself, and clicking skips it.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("kahani-intro") === "1";
      sessionStorage.setItem("kahani-intro", "1");
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce || !root.current) {
      setActive(false);
      release();
      return;
    }

    const q = gsap.utils.selector(root);
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => setActive(false),
    });
    tl.fromTo(q("[data-letter]"), { yPercent: 105 }, { yPercent: 0, duration: 1, stagger: 0.06, ease: "expo.out" })
      .to(counter, {
        v: 100,
        duration: 1.1,
        ease: "power2.inOut",
        onUpdate: () => {
          const el = q("[data-count]")[0];
          if (el) el.textContent = String(Math.round(counter.v)).padStart(3, "0");
        },
      }, 0)
      .fromTo(q("[data-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0)
      .to(q("[data-letter]"), { yPercent: -105, duration: 0.7, stagger: 0.035, ease: "expo.in" }, 1.25)
      .add(release, 1.55)
      .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, 1.5);

    const skip = () => tl.progress(1);
    root.current.addEventListener("click", skip);
    return () => {
      tl.kill();
      release();
    };
  }, []);

  if (!active) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-obsidian"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="flex overflow-hidden text-[clamp(2.5rem,9vw,6rem)] leading-none tracking-[0.32em]" style={{ fontWeight: 260, fontStretch: "120%" }}>
        {"KAHANI".split("").map((l, i) => (
          <span key={i} data-letter className="inline-block">
            {l}
          </span>
        ))}
      </div>
      <div className="absolute inset-x-[var(--gutter)] bottom-10 flex items-end justify-between gap-6">
        <span className="t-label text-muted">A story told through flavour</span>
        <span data-count className="t-label t-num text-brass">000</span>
      </div>
      <div data-bar className="absolute inset-x-0 bottom-0 h-px origin-left bg-brass/70" />
    </div>
  );
}
