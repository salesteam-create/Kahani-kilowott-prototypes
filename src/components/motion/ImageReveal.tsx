"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Direction = "up" | "down" | "left" | "right" | "inset" | "circle";

const FROM: Record<Direction, string> = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 0% 0% 100%)",
  right: "inset(0% 100% 0% 0%)",
  inset: "inset(18% 18% 18% 18%)",
  circle: "circle(0% at 50% 50%)",
};
const TO: Record<Direction, string> = {
  up: "inset(0% 0% 0% 0%)",
  down: "inset(0% 0% 0% 0%)",
  left: "inset(0% 0% 0% 0%)",
  right: "inset(0% 0% 0% 0%)",
  inset: "inset(0% 0% 0% 0%)",
  circle: "circle(75% at 50% 50%)",
};

/**
 * Clip-path reveal with a counter-scale on the inner image so the photograph
 * appears to settle into its frame. Different chapters use different directions.
 */
export function ImageReveal({
  children,
  className = "",
  direction = "up",
  duration = 1.4,
  delay = 0,
  scale = 1.18,
  start = "top 82%",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  duration?: number;
  delay?: number;
  scale?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || el.getClientRects().length === 0) return;
      const inner = el.querySelector("img, [data-reveal-inner]");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, scrollTrigger: { trigger: el, start, once: true } });
        return;
      }
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start, once: true }, delay });
      tl.fromTo(el, { clipPath: FROM[direction] }, { clipPath: TO[direction], duration, ease: "expo.inOut" });
      if (inner) tl.fromTo(inner, { scale }, { scale: 1, duration: duration + 0.6, ease: "expo.out" }, 0);
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`frame ${className}`}>
      {children}
    </div>
  );
}
