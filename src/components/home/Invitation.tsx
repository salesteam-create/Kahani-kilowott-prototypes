"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Img } from "@/components/common/Img";
import { useUI } from "@/components/layout/UIProvider";

/**
 * CHAPTER 09 · THE INVITATION
 * The room darkens around a single line, a brass rule draws itself across the
 * frame and the reservation appears beneath it. Quiet, then the footer rises.
 */
export function Invitation() {
  const root = useRef<HTMLElement>(null);
  const { openReserve } = useUI();

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top 75%", end: "center center", scrub: 0.8 },
      });
      tl.fromTo(q("[data-i-img]"), { scale: 1.2 }, { scale: 1, duration: 1 }, 0)
        .fromTo(q("[data-i-shade]"), { opacity: 0.25 }, { opacity: 0.72, duration: 1 }, 0)
        .fromTo(q("[data-i-head] [data-l]"), { yPercent: 110 }, { yPercent: 0, stagger: 0.12, duration: 0.45, ease: "power3.out" }, 0.25)
        .fromTo(q("[data-i-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, 0.55)
        .fromTo(q("[data-i-cta] > *"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.3 }, 0.7);
    },
    { scope: root },
  );

  return (
    <section ref={root} id="invitation" aria-labelledby="invitation-title" className="relative h-[100svh] min-h-[38rem] overflow-hidden bg-obsidian">
      <div data-i-img className="absolute inset-0">
        <Img id="velvetChairs" alt="A laid table with coral velvet chairs and flowers at Kahani" />
      </div>
      <div data-i-shade className="absolute inset-0 bg-obsidian" style={{ opacity: 0.6 }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(60% 55% at 50% 50%, transparent, rgb(16 16 15 / 0.85))" }} />

      <div className="gutter relative z-10 flex h-full flex-col items-center justify-center text-center">
        <p className="t-label text-brass">09 · The invitation</p>
        <h2 id="invitation-title" data-i-head className="t-display mt-6">
          <span className="block overflow-hidden pb-[0.05em]">
            <span data-l className="block">Your story</span>
          </span>
          <span className="block overflow-hidden pb-[0.05em]">
            <span data-l className="block">begins at Kahani.</span>
          </span>
        </h2>
        <span data-i-rule aria-hidden className="mt-10 block h-px w-[min(28rem,70vw)] origin-center bg-brass" />
        <div data-i-cta className="mt-10 flex flex-col items-center gap-6">
          <p className="max-w-md text-ivory/80">Join us in Chelsea for an experience shaped by flavour, heritage and the joy of sharing.</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            <button type="button" onClick={openReserve} className="btn btn-solid t-nav min-w-[15rem]">
              Reserve your table <span className="arrow">→</span>
            </button>
            <Link href="/private-dining/" className="link-line t-nav">
              Explore private dining <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
