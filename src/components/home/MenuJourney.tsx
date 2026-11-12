"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { Img } from "@/components/common/Img";
import { RevealText } from "@/components/motion/RevealText";
import { featuredDishes } from "@/data/content";
import { MenuIndex } from "@/components/menus/MenuIndex";

/**
 * CHAPTER 05 · THE MENU
 * Desktop: the chapter pins and vertical scroll drives a horizontal film of
 * oversized dish photographs, each an editorial cover with its verified name
 * and description. Images drift inside their frames as they cross the screen.
 * The film ends on an interactive index of every current menu.
 * Mobile: a native, touch-friendly snap rail; no scroll hijacking.
 */
export function MenuJourney() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const scroller = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.9,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(q("[data-m-progress]"), { scaleX: self.progress });
              // The final panel is the menu index; the progress rail steps aside for it.
              gsap.to(q("[data-m-rail]"), { autoAlpha: self.progress > 0.88 ? 0 : 1, duration: 0.4, overwrite: true });
            },
          },
        });

        q("[data-m-panel]").forEach((panel) => {
          const img = panel.querySelector("img");
          if (img)
            gsap.fromTo(img, { xPercent: 8, scale: 1.12 }, {
              xPercent: -8,
              scale: 1.02,
              ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: scroller, start: "left right", end: "right left", scrub: true },
            });
          const text = panel.querySelectorAll("[data-m-text]");
          gsap.fromTo(text, { opacity: 0, y: 30 }, {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: panel, containerAnimation: scroller, start: "left 70%", toggleActions: "play none none reverse" },
          });
        });

        // Final panel grows towards full bleed as it arrives.
        gsap.fromTo(q("[data-m-final]"), { clipPath: "inset(8% 10% 8% 0%)" }, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: q("[data-m-final]")[0], containerAnimation: scroller, start: "left 90%", end: "left left", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="menu" aria-labelledby="menu-title" className="relative overflow-hidden bg-obsidian cine:h-[100svh]">
      {/* Desktop film */}
      <div className="hidden h-full cine:block">
        <div ref={track} className="flex h-full w-max items-stretch">
          {/* Intro panel */}
          <div className="gutter flex w-[44vw] shrink-0 flex-col justify-center pr-16">
            <p className="t-label mb-8 text-brass">05 · The menu</p>
            <h2 id="menu-title" className="t-display">
              An expression
              <br />
              <span className="text-ivory/60">of flavour.</span>
            </h2>
            <p className="mt-8 max-w-sm text-muted">Small plates, the Kahani Klaasik grill and tandoor, curries and desserts. Four dishes from the current menus.</p>
            <p className="t-label mt-12 flex items-center gap-4 text-ivory/60">
              Scroll to explore <span className="h-px w-16 bg-ivory/30" />
            </p>
          </div>

          {featuredDishes.map((d, i) => (
            <article key={d.name} data-m-panel className="relative flex w-[64vw] shrink-0 items-center pr-[4vw]" data-cursor="view">
              <Link href={`/menus/#${d.menu}`} className="group relative block h-[78svh] w-full overflow-hidden" aria-label={`${d.name}: view the menu`}>
                <div className="absolute inset-0">
                  <Img id={d.image} alt={d.name} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/35 to-obsidian/5 transition-opacity duration-700 group-hover:opacity-80" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-10 p-10">
                  <div className="max-w-xl">
                    <p data-m-text className="t-label text-brass">
                      {String(i + 1).padStart(2, "0")} · {d.category}
                    </p>
                    <h3 data-m-text className="t-headline mt-4">
                      {d.name}
                    </h3>
                    <p data-m-text className="mt-4 max-w-md text-ivory/75">
                      {d.description}
                    </p>
                  </div>
                  <span data-m-text className="link-line t-nav shrink-0">
                    View menu <span className="arrow">→</span>
                  </span>
                </div>
              </Link>
            </article>
          ))}

          {/* Final panel: menu index */}
          <div data-m-final className="relative w-screen shrink-0 overflow-hidden bg-espresso">
            <MenuIndex />
          </div>
        </div>

        <div data-m-rail className="gutter pointer-events-none absolute inset-x-0 bottom-6 z-10 flex items-center gap-6">
          <span className="t-label text-ivory/50">The menu</span>
          <span className="relative h-px flex-1 bg-line">
            <span data-m-progress className="absolute inset-0 origin-left scale-x-0 bg-brass" />
          </span>
          <span className="t-label t-num text-ivory/50">0{featuredDishes.length} dishes</span>
        </div>
      </div>

      {/* Mobile & tablet: native snap rail */}
      <div className="py-24 cine:hidden">
        <div className="gutter">
          <p className="t-label mb-6 text-brass">05 · The menu</p>
          <RevealText as="h2" className="t-display">
            An expression of flavour.
          </RevealText>
          <p className="mt-6 text-muted">Four dishes from the current menus. Swipe to explore.</p>
        </div>
        <div className="snap-x-rail mt-10 flex gap-3 overflow-x-auto px-[var(--gutter)] pb-2" style={{ scrollPaddingInline: "var(--gutter)" }}>
          {featuredDishes.map((d, i) => (
            <Link key={d.name} href={`/menus/#${d.menu}`} className="relative block w-[82vw] shrink-0 sm:w-[60vw]">
              <div className="frame aspect-[4/5]">
                <Img id={d.image} alt={d.name} />
              </div>
              <p className="t-label mt-4 text-brass">
                {String(i + 1).padStart(2, "0")} · {d.category}
              </p>
              <h3 className="t-title mt-2">{d.name}</h3>
              <p className="mt-2 text-sm text-ivory/70">{d.description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-16 bg-espresso">
          <MenuIndex />
        </div>
      </div>
    </section>
  );
}
