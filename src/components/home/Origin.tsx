"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { Img } from "@/components/common/Img";
import { RevealText } from "@/components/motion/RevealText";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { originChapters } from "@/data/content";

// Background tone for each chapter: dusk in Chennai → warm kitchen → spice → London night.
const TONES = ["#141210", "#1d1714", "#24171a", "#121214"];

/**
 * CHAPTER 03 · THE ORIGIN
 * Desktop: one master timeline on a pinned frame (~3 viewports). Text holds
 * the left third; a stack of photographs fills the right two-thirds and
 * crossfades chapter to chapter, each image settling from a slight zoom and
 * drifting as it lives on screen. Counter, progress and background tone update.
 */
export function Origin() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const images = q("[data-o-img]");
        const texts = q("[data-o-text]");
        const n = images.length;

        gsap.set(images.slice(1), { opacity: 0 });
        gsap.set(texts.slice(1), { opacity: 0, y: 40 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: `+=${n * 80}%`,
            scrub: 0.9,
            pin: true,
            anticipatePin: 1,
          },
        });

        // Opening: the stage widens from an inset frame.
        tl.fromTo(q("[data-o-stage]"), { clipPath: "inset(8% 8% 8% 18%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power2.inOut" }, 0)
          .fromTo(q("[data-o-heading] [data-l]"), { yPercent: 110 }, { yPercent: 0, stagger: 0.08, duration: 0.4, ease: "power3.out" }, 0);

        images.forEach((img, i) => {
          const at = 0.6 + i * 1;
          tl.fromTo(img.querySelector("img"), { scale: 1.14, xPercent: i % 2 ? -3 : 3 }, { scale: 1, xPercent: 0, duration: 1.1 }, at - 0.4);
          tl.to(q("[data-o-count]"), { textContent: String(i + 1).padStart(2, "0"), snap: { textContent: 1 }, duration: 0.01 }, at - 0.2);
          tl.to(q(`[data-o-bar="${i}"]`), { scaleX: 1, duration: 0.9 }, at - 0.3);
          tl.to(root.current, { backgroundColor: TONES[i], duration: 0.4 }, at - 0.4);
          if (i > 0) {
            tl.to(images[i - 1], { opacity: 0, duration: 0.4 }, at - 0.4)
              .to(images[i], { opacity: 1, duration: 0.4 }, at - 0.4)
              .to(texts[i - 1], { opacity: 0, y: -40, duration: 0.3 }, at - 0.4)
              .to(texts[i], { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, at - 0.15);
          }
        });
        tl.to({}, { duration: 0.3 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="origin" aria-labelledby="origin-title" className="relative bg-[#141210] cine:h-[100svh] cine:overflow-hidden">
      {/* Desktop */}
      <div className="relative hidden h-full cine:grid cine:grid-cols-12">
        <div className="gutter relative z-10 col-span-4 flex flex-col justify-between py-[calc(var(--nav-h)+2rem)] pr-8">
          <div data-o-heading>
            <p className="t-label mb-6 text-brass">03 · The origin</p>
            <h2 id="origin-title" className="t-headline">
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-l className="block">Rooted in heritage.</span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-l className="block text-ivory/60">Reimagined in London.</span>
              </span>
            </h2>
          </div>

          <div className="relative min-h-[16rem]">
            {originChapters.map((c) => (
              <div key={c.title} data-o-text className="absolute inset-x-0 bottom-0">
                <p className="t-label text-muted">
                  {c.kicker} <span className="mx-2 text-brass">·</span> {c.place}
                </p>
                <h3 className="t-title mt-4">{c.title}</h3>
                <p className="mt-4 max-w-[26rem] text-ivory/75">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <span className="t-label t-num text-ivory">
              <span data-o-count>01</span>
              <span className="text-muted"> / 0{originChapters.length}</span>
            </span>
            <div className="flex flex-1 gap-2">
              {originChapters.map((c, i) => (
                <span key={c.title} className="relative h-px flex-1 bg-line">
                  <span data-o-bar={i} className="absolute inset-0 origin-left scale-x-0 bg-brass" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div data-o-stage className="relative col-span-8 h-full overflow-hidden">
          {originChapters.map((c, i) => (
            <div key={c.title} data-o-img className="absolute inset-0">
              <Img id={c.image} />
              <div className="absolute inset-0 bg-gradient-to-r from-[#141210]/75 via-[#141210]/10 to-transparent" />
              <div className="scrim-bottom absolute inset-x-0 bottom-0 h-1/3" />
              <span className="t-label absolute bottom-8 right-8 text-ivory/70">
                {String(i + 1).padStart(2, "0")} · {c.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile & tablet */}
      <div className="gutter py-24 cine:hidden">
        <p className="t-label mb-6 text-brass">03 · The origin</p>
        <RevealText as="h2" className="t-display">
          Rooted in heritage. Reimagined in London.
        </RevealText>
        <ol className="mt-14 space-y-16">
          {originChapters.map((c, i) => (
            <li key={c.title}>
              <ImageReveal direction={i % 2 ? "left" : "right"} className={`aspect-[4/5] sm:aspect-[16/10] ${i % 2 ? "ml-8" : "mr-8"}`}>
                <Img id={c.image} />
              </ImageReveal>
              <p className="t-label mt-6 text-muted">
                {c.kicker} · {c.place}
              </p>
              <h3 className="t-title mt-3">{c.title}</h3>
              <p className="mt-3 text-ivory/75">{c.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
