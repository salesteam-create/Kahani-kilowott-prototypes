"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { Img } from "@/components/common/Img";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealText } from "@/components/motion/RevealText";

const BIO = [
  { k: "Chennai", t: "Having grown up in Chennai, India, Peter Joseph was heavily influenced by his surroundings." },
  { k: "His mother", t: "He would often join his mother in the kitchen, watching her cook, and absorbing all of her traditional cooking tips and tricks." },
  { k: "British kitchens", t: "Coupled with his experience in British kitchens, it was only natural that he would combine the two." },
  { k: "Today", t: "A traditional take on Indian cooking, with his signature modern twist." },
];

/**
 * CHAPTER 07 · THE CHEF
 * A magazine-cover moment. The portrait enters through a diagonal mask and
 * scales down into place; the name, set enormous, moves at its own pace;
 * the biography arrives in short editorial lines.
 */
export function Chef() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=170%", scrub: 0.9, pin: true, anticipatePin: 1 },
        });
        tl.fromTo(
          q("[data-ch-portrait]"),
          { clipPath: "polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.6, ease: "power2.inOut" },
        )
          .fromTo(q("[data-ch-portrait] img"), { scale: 1.3 }, { scale: 1, duration: 1.4 }, 0)
          .fromTo(q("[data-ch-name] [data-l]"), { yPercent: 110 }, { yPercent: 0, stagger: 0.1, duration: 0.4, ease: "power3.out" }, 0.25)
          .fromTo(q("[data-ch-name]"), { x: 80 }, { x: -40, duration: 1.6 }, 0)
          .fromTo(q("[data-ch-bio]"), { opacity: 0, y: 36 }, { opacity: 1, y: 0, stagger: 0.18, duration: 0.25, ease: "power2.out" }, 0.6)
          .fromTo(q("[data-ch-cta]"), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.35)
          .to({}, { duration: 0.15 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="chef" aria-labelledby="chef-title" className="relative overflow-hidden bg-espresso lg:h-[100svh]">
      {/* Desktop */}
      <div className="relative hidden h-full lg:grid lg:grid-cols-12">
        <div className="relative col-span-5 h-full">
          <div data-ch-portrait className="absolute inset-0 overflow-hidden">
            <Img id="chefPortrait" alt="Chef Peter Joseph" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-espresso/50" />
          </div>
        </div>

        <div className="relative col-span-7 flex flex-col justify-center gap-10 py-[calc(var(--nav-h)+1rem)] pl-14 pr-[var(--gutter)]">
          <p className="t-label text-brass">07 · The chef · The man behind the story</p>
          <h2 id="chef-title" data-ch-name className="relative z-10 -ml-[16vw] leading-[0.82] tracking-[-0.045em]" style={{ fontSize: "clamp(5rem, 11vw, 11.5rem)", fontWeight: 250, fontStretch: "108%" }}>
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-l className="block">Peter</span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-l className="block pl-[0.9em] text-brass/90">Joseph</span>
            </span>
          </h2>
          <dl className="grid max-w-2xl grid-cols-2 gap-x-10 gap-y-7">
            {BIO.map((b) => (
              <div key={b.k} data-ch-bio>
                <dt className="t-label text-muted">{b.k}</dt>
                <dd className="mt-2 text-ivory/80">{b.t}</dd>
              </div>
            ))}
          </dl>
          <Link data-ch-cta href="/chef/" className="link-line t-nav self-start" data-cursor="read">
            Read his story <span className="arrow">→</span>
          </Link>
        </div>
      </div>

      {/* Mobile & tablet */}
      <div className="py-24 lg:hidden">
        <div className="gutter">
          <p className="t-label mb-6 text-brass">07 · The chef</p>
          <RevealText as="h2" className="t-display">
            The man behind the story.
          </RevealText>
        </div>
        <ImageReveal direction="inset" className="mt-10 aspect-[4/5] sm:mx-[var(--gutter)] sm:aspect-[3/4]">
          <Img id="chefPortrait" alt="Chef Peter Joseph" />
        </ImageReveal>
        <div className="gutter">
          <p className="-mt-10 relative z-10 text-[clamp(3.5rem,17vw,6rem)] leading-[0.85] tracking-[-0.04em]" style={{ fontWeight: 260 }}>
            Peter <span className="text-brass/90">Joseph</span>
          </p>
          <dl className="mt-10 space-y-6">
            {BIO.map((b) => (
              <div key={b.k}>
                <dt className="t-label text-muted">{b.k}</dt>
                <dd className="mt-2 text-ivory/80">{b.t}</dd>
              </div>
            ))}
          </dl>
          <Link href="/chef/" className="btn t-nav mt-10">
            Read his story <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
