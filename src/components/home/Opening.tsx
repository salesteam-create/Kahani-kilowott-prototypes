"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { Img } from "@/components/common/Img";
import { heroVideo, assetUrl } from "@/data/assets";
import { site } from "@/data/site";
import { useUI } from "@/components/layout/UIProvider";
import { whenIntroReady } from "@/components/layout/Preloader";
import { useScroll } from "@/components/motion/ScrollProvider";

const WORD = "KAHANI".split("");

/**
 * CHAPTER 01 · THE OPENING
 * Load: black → the photograph surfaces (scale 1.08 → 1) → KAHANI rises
 * through a letter mask → descriptor, location, scroll cue, reserve.
 * Scroll (desktop, pinned one viewport): the frame pushes in to 1.18, the
 * letters drift apart and are wiped away by a mask, the edges fall to black
 * and the definition of the word surfaces. The darkened frame becomes the
 * ground the next chapter is written on.
 */
export function Opening() {
  const root = useRef<HTMLElement>(null);
  const { openReserve } = useUI();
  const { scrollTo } = useScroll();

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // ---- Load sequence
      const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      intro
        .set(q("[data-intro]"), { visibility: "visible" })
        .fromTo(q("[data-shade]"), { opacity: 1 }, { opacity: 0, duration: 2.6, ease: "power2.inOut" })
        .fromTo(q("[data-media]"), { scale: 1.08 }, { scale: 1, duration: 3.4, ease: "power3.out" }, 0)
        .fromTo(q("[data-letter]"), { yPercent: 108 }, { yPercent: 0, duration: 1.5, stagger: 0.075 }, 0.55)
        .fromTo(q("[data-tagline] > span"), { yPercent: 110 }, { yPercent: 0, duration: 1.2 }, 1.25)
        .fromTo(q("[data-meta], [data-cue]"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 }, 1.45);

      if (reduce) {
        intro.progress(1);
      } else {
        const stop = whenIntroReady(() => intro.play());
        // Safety: never leave the hero hidden if something upstream fails.
        const failsafe = gsap.delayedCall(4, () => intro.progress() === 0 && intro.play());
        return () => {
          stop();
          failsafe.kill();
        };
      }
    },
    { scope: root },
  );

  // ---- Scroll choreography (separate so it is rebuilt per breakpoint)
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      // The "Kahani · story" mark dissolves like smoke: the SVG filter warps it
      // with turbulence and blur while it drifts up, swells and fades.
      const smoke = (tl: gsap.core.Timeline, d: number) => {
        const el = root.current!;
        tl.to(el.querySelector("#kahani-smoke-disp"), { attr: { scale: 40 }, duration: d, ease: "power1.in" }, 0)
          .to(el.querySelector("#kahani-smoke-blur"), { attr: { stdDeviation: 3 }, duration: d, ease: "power1.in" }, 0)
          .to(el.querySelector("#kahani-smoke-noise"), { attr: { baseFrequency: "0.018 0.07" }, duration: d, ease: "power1.in" }, 0)
          .to(q("[data-smoke]"), { opacity: 0, y: -40, scale: 1.1, duration: d, ease: "power2.in" }, 0);
      };

      mm.add(MQ.desktop, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=110%", scrub: 0.9, pin: true, anticipatePin: 1 },
        });
        tl.to(q("[data-media-wrap]"), { scale: 1.18 }, 0)
          .to(q("[data-letter-x]"), { x: (i: number) => (i - 2.5) * 34, duration: 0.6 }, 0)
          .to(q("[data-word]"), { clipPath: "inset(0% 0% 100% 0%)", yPercent: -12, duration: 0.55 }, 0.2)
          .to(q("[data-tagline], [data-fade-meta]"), { opacity: 0, y: -20, duration: 0.25 }, 0.05)
          .to(q("[data-edge]"), { opacity: 1, duration: 0.6 }, 0.15)
          .fromTo(q("[data-define] > *"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.35 }, 0.45)
          .fromTo(q("[data-shade-scroll]"), { opacity: 0 }, { opacity: 0.72, duration: 0.45 }, 0.55)
          .to(q("[data-define]"), { opacity: 0, y: -30, duration: 0.2 }, 0.88);
        smoke(tl, 0.35);
      });

      mm.add(MQ.mobile, () => {
        gsap.to(q("[data-media-wrap]"), {
          scale: 1.12,
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(q("[data-content]"), {
          opacity: 0,
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "60% top", scrub: true },
        });
        smoke(gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=38%", scrub: 0.6 } }), 1);
      });

    },
    { scope: root },
  );

  return (
    <section ref={root} id="opening" aria-label="Kahani" className="relative h-[100svh] min-h-[34rem] overflow-hidden bg-obsidian">
      {/* Media */}
      <div data-media-wrap className="absolute inset-0 will-change-transform">
        <div data-media className="vignette grain absolute inset-0">
          {heroVideo ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={assetUrl(heroVideo.poster)}
            >
              {heroVideo.webm ? <source src={heroVideo.webm} type="video/webm" /> : null}
              <source src={heroVideo.mp4} type="video/mp4" />
            </video>
          ) : (
            <Img id="saucePour" priority alt="A sauce poured over a plated dish at Kahani, in low warm light" />
          )}
        </div>
      </div>
      <div data-edge aria-hidden className="pointer-events-none absolute inset-0 opacity-0" style={{ background: "radial-gradient(70% 60% at 50% 50%, transparent 20%, rgb(16 16 15 / 0.96) 100%)" }} />
      <div aria-hidden className="scrim-center pointer-events-none absolute inset-0" />
      <div aria-hidden className="scrim-bottom pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-80" />
      <div data-shade aria-hidden className="pointer-events-none absolute inset-0 bg-obsidian" />
      <div data-shade-scroll aria-hidden className="pointer-events-none absolute inset-0 bg-obsidian opacity-0" />

      {/* Content */}
      <div data-content data-intro className="reveal-init relative z-10 flex h-full flex-col justify-end gutter pb-8 pt-[var(--nav-h)] sm:pb-10">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h1 aria-label="Kahani" className="t-hero select-none">
            <span data-word className="flex justify-center overflow-hidden pb-[0.04em]" aria-hidden>
              {WORD.map((l, i) => (
                <span key={i} data-letter-x className="inline-block will-change-transform">
                  <span data-letter className="inline-block will-change-transform" style={{ fontWeight: 230 }}>
                    {l}
                  </span>
                </span>
              ))}
            </span>
          </h1>
          <p data-tagline className="t-label mt-6 overflow-hidden text-ivory/85 sm:mt-8" style={{ letterSpacing: "0.42em" }}>
            <span className="inline-block">{site.tagline}</span>
          </p>
        </div>

        {/* Bottom row: descriptor · story mark · location + reserve, on one line */}
        <div data-bottom className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-end gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
          <div data-fade-meta>
            <div data-meta className="space-y-2">
              <p className="t-label text-ivory/70">{site.descriptor}</p>
              {/* On phones the location sits under the descriptor so the row fits */}
              <p className="t-label text-ivory/50 sm:hidden">{site.location}</p>
            </div>
          </div>
          <button
            type="button"
            data-cue
            onClick={() => scrollTo("#meaning")}
            className="group block justify-self-center"
            aria-label="Kahani means story. Begin the story"
          >
            <span data-smoke className="block origin-center will-change-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hq/kahani-story.png"
                alt=""
                width={833}
                height={91}
                draggable={false}
                className="h-auto w-[30vw] max-w-[15rem] transition-opacity duration-500 group-hover:opacity-85 sm:w-[min(15rem,20vw)]"
                style={{ filter: "url(#kahani-smoke)" }}
              />
            </span>
          </button>
          <div data-fade-meta className="justify-self-end">
            <div data-meta className="flex flex-col items-end gap-3 text-right">
              <p className="t-label hidden text-ivory/70 sm:block">{site.location}</p>
              <button type="button" onClick={openReserve} className="link-line t-nav text-ivory">
                Reserve <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Smoke filter for the story mark (identity at rest: scale 0, blur 0) */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <filter id="kahani-smoke" x="-30%" y="-160%" width="160%" height="420%" colorInterpolationFilters="sRGB">
          <feTurbulence id="kahani-smoke-noise" type="fractalNoise" baseFrequency="0.01 0.04" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap id="kahani-smoke-disp" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" result="warp" />
          <feGaussianBlur id="kahani-smoke-blur" in="warp" stdDeviation="0" />
        </filter>
      </svg>

      {/* Definition revealed while the frame pushes in */}
      <div data-define aria-hidden style={{ opacity: 0 }} className="pointer-events-none absolute inset-0 z-10 hidden flex-col items-center justify-center gap-5 text-center lg:flex">
        <p className="t-label text-brass">कहानी · Kahani · noun</p>
        <p className="t-display max-w-[14ch]">Story.</p>
        <p className="t-lead max-w-md text-ivory/75">In Hindi, kahani means story. Every dish here has one.</p>
      </div>
    </section>
  );
}
