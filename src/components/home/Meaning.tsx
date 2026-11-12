"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { Img } from "@/components/common/Img";
import { RevealText } from "@/components/motion/RevealText";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { copy } from "@/data/content";

/**
 * CHAPTER 02 · THE MEANING
 * Desktop: pinned. The headline is written line by line by the scroll while an
 * ingredient photograph emerges from the right edge and widens from ~35% to
 * ~70% of the frame, sliding under the type. Asymmetric, never centred.
 */
export function Meaning() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=140%", scrub: 0.8, pin: true, anticipatePin: 1 },
        });
        tl.fromTo(q("[data-line]"), { yPercent: 110 }, { yPercent: 0, stagger: 0.12, duration: 0.3, ease: "power2.out" }, 0)
          .fromTo(q("[data-word]"), { opacity: 0.15 }, { opacity: 1, stagger: 0.04, duration: 0.15 }, 0.15)
          .fromTo(q("[data-plate]"), { clipPath: "inset(14% 0% 14% 64%)" }, { clipPath: "inset(0% 0% 0% 30%)", duration: 0.8, ease: "power1.inOut" }, 0.05)
          .fromTo(q("[data-plate] img"), { scale: 1.25, xPercent: 6 }, { scale: 1.02, xPercent: 0, duration: 0.95 }, 0.05)
          .fromTo(q("[data-body]"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25 }, 0.42)
          .fromTo(q("[data-define]"), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.2 }, 0.55)
          .to(q("[data-shift]"), { yPercent: -6, duration: 0.4 }, 0.6);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="meaning" aria-labelledby="meaning-title" className="relative overflow-hidden bg-obsidian lg:h-[100svh]">
      {/* Desktop composition */}
      <div className="relative hidden h-full lg:block">
        <div data-plate className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(14% 0% 14% 64%)" }}>
          <Img id="spices" alt="Whole spices and dried chillies arranged on a dark plate" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-obsidian/10 to-transparent" />
        </div>

        <div data-shift className="gutter relative z-10 flex h-full flex-col justify-center">
          <p className="t-label mb-8 text-brass">02 · The meaning</p>
          <h2 id="meaning-title" className="t-display max-w-[11ch]" style={{ fontSize: "clamp(4rem, 8.6vw, 8.75rem)" }}>
            <span className="block overflow-hidden pb-[0.05em]">
              <span data-line className="block">
                {"Every dish".split(" ").map((w, i) => (
                  <span key={i} data-word className="mr-[0.22em] inline-block">
                    {w}
                  </span>
                ))}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <span data-line className="block text-ivory/90">
                {"has a story.".split(" ").map((w, i) => (
                  <span key={i} data-word className="mr-[0.22em] inline-block">
                    {w}
                  </span>
                ))}
              </span>
            </span>
          </h2>
          <div data-body className="mt-10 max-w-[30rem]">
            <p className="t-lead text-ivory/85">
              Kahani means story. A story shaped by heritage, imagination and the art of bringing people together.
            </p>
            <p className="mt-6 text-muted">{copy.meaning}</p>
          </div>
        </div>

        <p data-define className="t-label absolute bottom-10 right-[var(--gutter)] z-10 text-ivory/70">
          कहानी <span className="mx-2 text-brass">/</span> noun <span className="mx-2 text-brass">/</span> story
        </p>
      </div>

      {/* Mobile & tablet composition: natural vertical storytelling */}
      <div className="gutter py-24 lg:hidden">
        <p className="t-label mb-6 text-brass">02 · The meaning</p>
        <RevealText as="h2" className="t-display">
          Every dish has a story.
        </RevealText>
        <ImageReveal direction="left" className="-mx-[var(--gutter)] mt-12 aspect-[4/5] sm:aspect-[16/11]">
          <Img id="spices" alt="Whole spices and dried chillies arranged on a dark plate" />
        </ImageReveal>
        <RevealText as="p" className="t-lead mt-10 text-ivory/85">
          Kahani means story. A story shaped by heritage, imagination and the art of bringing people together.
        </RevealText>
        <p className="mt-6 text-muted">{copy.meaning}</p>
      </div>
    </section>
  );
}
