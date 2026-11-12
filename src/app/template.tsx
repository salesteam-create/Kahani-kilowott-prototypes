"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

let firstRender = true;

/** Restrained page transition on client-side navigation: each route rises out of the dark. */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (firstRender) {
      firstRender = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "power2.out", clearProps: "opacity" });
  });
  return <div ref={ref}>{children}</div>;
}
