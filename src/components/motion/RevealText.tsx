"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface Props {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Tie the reveal to scroll position instead of triggering once. */
  scrub?: boolean;
  start?: string;
  id?: string;
}

/**
 * Line-by-line masked reveal. Each line rises from translateY(110%) inside an
 * overflow-clipped wrapper. Lines are re-split on resize by SplitText autoSplit,
 * so wrapping stays correct at every breakpoint.
 */
export function RevealText({ as: Tag = "div", children, className, delay = 0, stagger = 0.09, scrub, start = "top 85%", id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      // Skip elements that are not rendered at this breakpoint (display: none).
      if (!el || el.getClientRects().length === 0) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, scrollTrigger: { trigger: el, start, once: true } });
        return;
      }
      let st: ScrollTrigger | undefined;
      let done = false;
      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          st?.kill();
          if (done && !scrub) {
            gsap.set(self.lines, { yPercent: 0, opacity: 1 });
            return;
          }
          const tween = gsap.fromTo(
            self.lines,
            { yPercent: 110, opacity: 0.001 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.05,
              stagger,
              delay: scrub ? 0 : delay,
              ease: "expo.out",
              paused: true,
            },
          );
          st = scrub
            ? ScrollTrigger.create({ trigger: el, start, end: "top 35%", scrub: 0.6, animation: tween })
            : ScrollTrigger.create({
                trigger: el,
                start,
                once: true,
                onEnter: () => {
                  done = true;
                  tween.play();
                },
              });
          return tween;
        },
      });
      return () => {
        st?.kill();
        split.revert();
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
