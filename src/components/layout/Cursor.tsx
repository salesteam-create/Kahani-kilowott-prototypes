"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Desktop-only cursor. A small ivory dot that grows into a labelled disc over
 * elements carrying data-cursor="view" | "explore" | "drag" | "read".
 * Native cursor is restored over form fields; disabled on touch devices.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [state, setState] = useState<"default" | "link" | "label" | "hide">("default");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !dot.current) return;
    document.documentElement.classList.add("has-cursor");

    const xTo = gsap.quickTo(dot.current, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(dot.current, "y", { duration: 0.45, ease: "power3.out" });
    let visible = false;

    const onMove = (e: PointerEvent) => {
      if (!visible) {
        gsap.set(dot.current, { x: e.clientX, y: e.clientY });
        gsap.to(dot.current, { opacity: 1, duration: 0.3 });
        visible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
      const t = e.target as HTMLElement | null;
      const tagged = t?.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        const v = tagged.dataset.cursor ?? "";
        if (v === "hide") {
          setState("hide");
          setLabel("");
        } else {
          setState("label");
          setLabel(v);
        }
      } else if (t?.closest("input, textarea, select")) {
        setState("hide");
      } else if (t?.closest("a, button, [role=button], label")) {
        setState("link");
      } else setState("default");
    };
    const onLeave = () => {
      gsap.to(dot.current, { opacity: 0, duration: 0.3 });
      visible = false;
    };
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  const size = state === "label" ? 88 : state === "link" ? 40 : state === "hide" ? 0 : 8;

  return (
    <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] hidden opacity-0 [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{
          width: size,
          height: size,
          backgroundColor: state === "label" ? "rgb(233 225 212 / 0.94)" : state === "link" ? "transparent" : "#e9e1d4",
          border: state === "link" ? "1px solid rgb(233 225 212 / 0.6)" : "1px solid transparent",
          mixBlendMode: state === "default" ? "difference" : "normal",
        }}
      >
        <span className="t-label text-[0.6rem] text-obsidian" style={{ opacity: state === "label" ? 1 : 0, transition: "opacity .3s" }}>
          {label}
        </span>
      </div>
    </div>
  );
}
