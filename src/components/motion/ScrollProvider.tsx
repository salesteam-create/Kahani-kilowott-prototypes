"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ScrollTo = (target: string | number | HTMLElement, opts?: { offset?: number; immediate?: boolean }) => void;

const ScrollCtx = createContext<{ scrollTo: ScrollTo; lenis: Lenis | null; stop: () => void; start: () => void }>({
  scrollTo: () => {},
  lenis: null,
  stop: () => {},
  start: () => {},
});

export const useScroll = () => useContext(ScrollCtx);

/**
 * One scroll system for the whole site: Lenis drives the scroll position,
 * GSAP's ticker drives Lenis, and every ScrollTrigger reads from it.
 * Disabled entirely for reduced-motion users and coarse pointers (touch devices
 * keep native momentum scrolling, which is faster and more familiar).
 */
export function ScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const instance = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true });
    lenisRef.current = instance;
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // New page: start at the top and re-measure every trigger once layout settles.
  useEffect(() => {
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  // Re-measure after web fonts load (headline heights change).
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  const scrollTo: ScrollTo = (target, opts = {}) => {
    const l = lenisRef.current;
    if (l) {
      l.scrollTo(target as never, { offset: opts.offset ?? 0, immediate: opts.immediate, duration: 1.6 });
      return;
    }
    let y = 0;
    if (typeof target === "number") y = target;
    else {
      const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
      if (!el) return;
      y = el.getBoundingClientRect().top + window.scrollY + (opts.offset ?? 0);
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: y, behavior: reduce || opts.immediate ? "auto" : "smooth" });
  };

  return (
    <ScrollCtx.Provider
      value={{
        scrollTo,
        lenis,
        stop: () => lenisRef.current?.stop(),
        start: () => lenisRef.current?.start(),
      }}
    >
      {children}
    </ScrollCtx.Provider>
  );
}
