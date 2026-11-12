"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Img } from "./Img";
import type { AssetId } from "@/data/assets";

/**
 * Shared hero for inner pages: the photograph opens from an inset frame,
 * the title rises line by line, and the image drifts as the page scrolls.
 */
export function PageHero({
  image,
  kicker,
  title,
  intro,
  children,
  height = "tall",
  alt,
}: {
  image: AssetId;
  kicker: string;
  title: string[];
  intro?: string;
  children?: ReactNode;
  height?: "tall" | "short";
  alt?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(q("[data-ph-frame]"), { clipPath: "inset(12% 12% 12% 12%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" })
        .fromTo(q("[data-ph-frame] img"), { scale: 1.25 }, { scale: 1, duration: 2.2 }, 0)
        .fromTo(q("[data-l]"), { yPercent: 110 }, { yPercent: 0, duration: 1.3, stagger: 0.1 }, 0.7)
        .fromTo(q("[data-ph-fade]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 1);
      gsap.to(q("[data-ph-drift]"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={`relative overflow-hidden bg-obsidian ${height === "tall" ? "h-[92svh] min-h-[36rem]" : "h-[72svh] min-h-[30rem]"}`}>
      <div data-ph-frame className="absolute inset-0 overflow-hidden">
        <div data-ph-drift className="absolute inset-0">
          <Img id={image} priority alt={alt} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/35 to-obsidian/50" />
        <div className="grain absolute inset-0" />
      </div>
      <div className="gutter relative z-10 flex h-full flex-col justify-end pb-14 lg:pb-20">
        <p data-ph-fade className="t-label mb-6 text-brass">
          {kicker}
        </p>
        <h1 className="t-display max-w-[16ch]">
          {title.map((t, i) => (
            <span key={i} className="block overflow-hidden pb-[0.05em]">
              <span data-l className={`block ${i > 0 ? "text-ivory/65" : ""}`}>
                {t}
              </span>
            </span>
          ))}
        </h1>
        {intro ? (
          <p data-ph-fade className="t-lead mt-8 max-w-2xl text-ivory/80">
            {intro}
          </p>
        ) : null}
        {children ? <div data-ph-fade className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
