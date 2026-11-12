"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { Img } from "@/components/common/Img";
import { Parallax } from "@/components/motion/Parallax";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealText } from "@/components/motion/RevealText";
import { copy } from "@/data/content";

/**
 * CHAPTER 06 · THE EXPERIENCE
 * The dining room opens out of an inset mask as the chapter arrives (scrubbed),
 * then three distinct compositions: A. the restaurant (overlapping frames),
 * B. the bar (full-bleed with a floating detail), C. the occasion (type-led).
 */
export function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: q("[data-x-open]")[0], start: "top top", end: "+=130%", scrub: 0.8, pin: true, anticipatePin: 1 },
        });
        tl.fromTo(q("[data-x-mask]"), { clipPath: "inset(22% 30% 22% 30%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" })
          .fromTo(q("[data-x-mask] img"), { scale: 1.35 }, { scale: 1, duration: 1.2 }, 0)
          .fromTo(q("[data-x-head] [data-l]"), { yPercent: 110 }, { yPercent: 0, stagger: 0.12, duration: 0.4, ease: "power3.out" }, 0.7)
          .fromTo(q("[data-x-lead]"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, 0.95)
          .to({}, { duration: 0.2 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" aria-labelledby="experience-title" className="relative bg-obsidian">
      {/* Opening: the room revealed */}
      <div data-x-open className="relative h-[100svh] overflow-hidden">
        <div data-x-mask className="absolute inset-0 overflow-hidden">
          <Img id="diningRoom" alt="The Kahani dining room with globe chandeliers" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/45 to-obsidian/40" />
          <div className="scrim-left absolute inset-0 opacity-70" />
        </div>
        <div className="gutter relative z-10 flex h-full flex-col justify-end pb-16 lg:pb-20">
          <p className="t-label mb-6 text-brass">06 · The experience</p>
          <h2 id="experience-title" data-x-head className="t-display max-w-[14ch]">
            <span className="block overflow-hidden pb-[0.05em]">
              <span data-l className="block">More than a meal.</span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <span data-l className="block text-ivory/65">A place to belong.</span>
            </span>
          </h2>
          <p data-x-lead className="t-lead mt-8 max-w-xl text-ivory/80">
            {copy.restaurant}
          </p>
        </div>
      </div>

      {/* A · The restaurant */}
      <div className="gutter grid grid-cols-1 gap-10 py-24 lg:grid-cols-12 lg:gap-6 lg:py-40">
        <div className="lg:col-span-7">
          <ImageReveal direction="right" className="aspect-[4/3]">
            <Img id="booths" />
          </ImageReveal>
        </div>
        <div className="flex flex-col justify-between gap-10 lg:col-span-4 lg:col-start-9">
          <div>
            <p className="t-label text-muted">A · The restaurant</p>
            <RevealText as="h3" className="t-headline mt-4">
              Luxe, seductively lit, and made for sharing.
            </RevealText>
            <p className="mt-6 text-ivory/70">
              The main restaurant seats up to ninety guests at 1 Wilbraham Place, opposite Cadogan Hall. Velvet, low light and a room built around the table.
            </p>
          </div>
          <Parallax speed={-18} className="relative ml-auto w-3/4 lg:-ml-24 lg:w-[115%]">
            <ImageReveal direction="up" className="aspect-[3/4]" delay={0.15}>
              <Img id="velvetChairs" />
            </ImageReveal>
          </Parallax>
        </div>
      </div>

      {/* B · The bar */}
      <div className="relative">
        <div className="relative h-[80svh] overflow-hidden lg:h-[110svh]">
          <Parallax speed={18} className="absolute inset-x-0 -inset-y-[10%]">
            <Img id="bar" alt="The Kahani bar, backlit shelves and stools" />
          </Parallax>
          <div className="scrim-right absolute inset-0" />
          <div className="absolute inset-0 bg-obsidian/35" />
          <div className="gutter relative z-10 flex h-full flex-col items-end justify-center text-right">
            <p className="t-label text-brass">B · The bar</p>
            <RevealText as="h3" className="t-display mt-4 max-w-[10ch]">
              A wall of wine.
            </RevealText>
            <p className="mt-6 max-w-md text-ivory/80">{copy.bar}</p>
          </div>
        </div>
        <div className="gutter relative z-10 -mt-24 flex justify-start sm:-mt-40">
          <Parallax speed={-24} className="w-[62%] sm:w-[38%] lg:w-[24%]">
            <ImageReveal direction="circle" className="aspect-[4/5]">
              <Img id="cocktailsBar" />
            </ImageReveal>
          </Parallax>
        </div>
      </div>

      {/* C · The occasion */}
      <div className="gutter grid grid-cols-1 items-end gap-12 py-24 lg:grid-cols-12 lg:py-40">
        <div className="lg:col-span-6">
          <p className="t-label text-muted">C · The occasion</p>
          <RevealText as="h3" className="t-display mt-4">
            Gatherings, celebrations, the whole room.
          </RevealText>
          <p className="mt-8 max-w-lg text-ivory/75">{copy.occasion}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/experiences/" className="btn t-nav">
              The experience <span className="arrow">→</span>
            </Link>
            <Link href="/events/" className="link-line t-nav self-center">
              Events & group dining <span className="arrow">→</span>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3 lg:col-span-6">
          <ImageReveal direction="down" className="col-span-3 aspect-[3/4]">
            <Img id="wineWall" />
          </ImageReveal>
          <div className="col-span-2 flex flex-col justify-end gap-3">
            <ImageReveal direction="left" className="aspect-square" delay={0.1}>
              <Img id="cocktails" />
            </ImageReveal>
            <ImageReveal direction="left" className="aspect-[4/5]" delay={0.2}>
              <Img id="bartender" />
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
