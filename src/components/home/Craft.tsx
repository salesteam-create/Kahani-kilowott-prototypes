"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { Img } from "@/components/common/Img";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealText } from "@/components/motion/RevealText";
import { copy } from "@/data/content";
import type { AssetId } from "@/data/assets";

const STAGES: { word: string; image: AssetId; caption: string }[] = [
  { word: "Fire.", image: "flames", caption: "Robata grill & tandoor" },
  { word: "Flavour.", image: "platingChops", caption: "Heady spice, seasonal British produce" },
  { word: "Finesse.", image: "plating", caption: "Finished by hand at the pass" },
];

/**
 * CHAPTER 04 · THE CRAFT
 * Desktop: a narrow strip of fire rises from the bottom of the frame, opens
 * to the full viewport, and the three words arrive one by one as the image
 * beneath changes. FIRE stays; FLAVOUR and FINESSE join it. Finally the image
 * slides to the left half and the philosophy is set beside it.
 */
export function Craft() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const imgs = q("[data-c-img]");
        const words = q("[data-c-word]");
        const caps = q("[data-c-cap]");
        gsap.set(imgs.slice(1), { opacity: 0 });
        gsap.set(caps.slice(1), { opacity: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=360%", scrub: 1, pin: true, anticipatePin: 1 },
        });

        tl.fromTo(q("[data-c-stage]"), { clipPath: "inset(94% 6% 0% 6%)" }, { clipPath: "inset(44% 6% 44% 6%)", duration: 0.5, ease: "power2.out" })
          .to(q("[data-c-stage]"), { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power2.inOut" })
          .fromTo(imgs[0].querySelector("img"), { scale: 1.3 }, { scale: 1.05, duration: 1.6 }, 0)
          .fromTo(words[0], { yPercent: 110 }, { yPercent: 0, duration: 0.35, ease: "power3.out" }, 0.75)
          // FLAVOUR
          .to(imgs[1], { opacity: 1, duration: 0.4 }, 1.4)
          .fromTo(imgs[1].querySelector("img"), { scale: 1.15 }, { scale: 1.02, duration: 1.2 }, 1.4)
          .to(caps[0], { opacity: 0, duration: 0.2 }, 1.4)
          .to(caps[1], { opacity: 1, duration: 0.2 }, 1.55)
          .fromTo(words[1], { yPercent: 110 }, { yPercent: 0, duration: 0.35, ease: "power3.out" }, 1.5)
          // FINESSE
          .to(imgs[2], { opacity: 1, duration: 0.4 }, 2.3)
          .fromTo(imgs[2].querySelector("img"), { scale: 1.15 }, { scale: 1.02, duration: 1.2 }, 2.3)
          .to(caps[1], { opacity: 0, duration: 0.2 }, 2.3)
          .to(caps[2], { opacity: 1, duration: 0.2 }, 2.45)
          .fromTo(words[2], { yPercent: 110 }, { yPercent: 0, duration: 0.35, ease: "power3.out" }, 2.4)
          // Settle: image slides left, words leave, philosophy enters on the right.
          .to(q("[data-c-words]"), { yPercent: -30, opacity: 0, duration: 0.45, ease: "power2.in" }, 3.2)
          .to(caps[2], { opacity: 0, duration: 0.2 }, 3.2)
          .to(q("[data-c-stage]"), { clipPath: "inset(10% 48% 10% 0%)", duration: 0.7, ease: "power2.inOut" }, 3.3)
          .to(q("[data-c-shade]"), { opacity: 0, duration: 0.5 }, 3.3)
          .fromTo(q("[data-c-copy] > *"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power3.out" }, 3.6)
          .to({}, { duration: 0.4 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="craft" aria-labelledby="craft-title" className="relative bg-obsidian cine:h-[100svh] cine:overflow-hidden">
      {/* Desktop */}
      <div className="relative hidden h-full cine:block">
        <div data-c-stage className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(94% 6% 0% 6%)" }}>
          {STAGES.map((s) => (
            <div key={s.word} data-c-img className="absolute inset-0">
              <Img id={s.image} />
            </div>
          ))}
          <div data-c-shade className="absolute inset-0 bg-gradient-to-r from-obsidian/75 via-obsidian/25 to-transparent" />
          <div className="grain absolute inset-0" />
        </div>

        <h2 id="craft-title" data-c-words className="gutter t-hero pointer-events-none absolute inset-y-0 left-0 z-10 flex flex-col justify-center" style={{ fontSize: "clamp(4.5rem, 11.5vw, 12rem)", fontWeight: 260 }}>
          {STAGES.map((s, i) => (
            <span key={s.word} className="block overflow-hidden pb-[0.04em]">
              <span data-c-word className="block" style={{ paddingLeft: `${i * 0.6}em` }}>
                {s.word}
              </span>
            </span>
          ))}
        </h2>

        {STAGES.map((s) => (
          <p key={s.word} data-c-cap className="t-label absolute bottom-10 right-[var(--gutter)] z-10 text-ivory/80">
            04 · {s.caption}
          </p>
        ))}

        <div data-c-copy className="absolute inset-y-0 right-0 z-10 flex w-[48%] flex-col justify-center gap-6 pl-14 pr-[var(--gutter)]">
          <p className="t-label text-brass">04 · The craft</p>
          <p className="t-headline max-w-[16ch]">Light, grilled, and alive with spice.</p>
          <p className="max-w-[34rem] text-ivory/75">{copy.approach}</p>
          <p className="max-w-[34rem] text-muted">{copy.sharing}</p>
        </div>
      </div>

      {/* Mobile & tablet */}
      <div className="py-24 cine:hidden">
        <div className="gutter">
          <p className="t-label mb-6 text-brass">04 · The craft</p>
          <h2 className="t-display">
            {STAGES.map((s) => (
              <RevealText key={s.word} as="span" className="block">
                {s.word}
              </RevealText>
            ))}
          </h2>
        </div>
        <div className="mt-12 space-y-3">
          {STAGES.map((s, i) => (
            <figure key={s.word}>
              <ImageReveal direction={(["up", "inset", "left"] as const)[i]} className="aspect-[4/5] sm:aspect-[16/10]">
                <Img id={s.image} />
              </ImageReveal>
              <figcaption className="gutter t-label mt-3 text-muted">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="gutter mt-12 space-y-5">
          <p className="t-title">Light, grilled, and alive with spice.</p>
          <p className="text-ivory/75">{copy.approach}</p>
          <p className="text-muted">{copy.sharing}</p>
        </div>
      </div>
    </section>
  );
}
