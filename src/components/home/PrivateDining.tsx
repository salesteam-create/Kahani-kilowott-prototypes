"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { Img } from "@/components/common/Img";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealText } from "@/components/motion/RevealText";
import { Parallax } from "@/components/motion/Parallax";
import { site } from "@/data/site";
import { copy } from "@/data/content";
import { SpendNote } from "@/components/common/SpendNote";

/**
 * CHAPTER 08 · PRIVATE DINING
 * A dark, narrow vertical slit of the Peacock Room opens out to ~80% of the
 * viewport like curtains parting, the room's name settles over it, then the
 * facts and the enquiry arrive. The room is a conversion moment.
 */
export function PrivateDining() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: q("[data-pd-stage]")[0], start: "top top", end: "+=150%", scrub: 0.9, pin: true, anticipatePin: 1 },
        });
        tl.fromTo(q("[data-pd-room]"), { clipPath: "inset(6% 44% 6% 44%)" }, { clipPath: "inset(8% 10% 8% 10%)", duration: 1, ease: "power2.inOut" })
          .fromTo(q("[data-pd-room] img"), { scale: 1.4, filter: "brightness(0.45)" }, { scale: 1.05, filter: "brightness(0.85)", duration: 1.3 }, 0)
          .fromTo(q("[data-pd-title] [data-l]"), { yPercent: 110 }, { yPercent: 0, stagger: 0.1, duration: 0.35, ease: "power3.out" }, 0.55)
          .fromTo(q("[data-pd-kicker]"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.5)
          .to({}, { duration: 0.35 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="private-dining" aria-labelledby="pd-title" className="relative bg-obsidian">
      <div data-pd-stage className="relative h-[100svh] overflow-hidden">
        <div data-pd-room className="absolute inset-0 overflow-hidden cine:[clip-path:inset(6%_44%_6%_44%)]">
          <Img id="booths" alt="Royal blue velvet banquettes and brass wall lamps at Kahani" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-obsidian/40" />
          <div className="scrim-center absolute inset-0" />
        </div>
        <div className="gutter relative z-10 flex h-full flex-col items-center justify-center text-center">
          <p data-pd-kicker className="t-label text-ivory/80">
            08 · Private dining · An intimate world of its own
          </p>
          <h2 id="pd-title" data-pd-title className="t-hero mt-6" style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)", fontWeight: 260 }}>
            <span className="block overflow-hidden pb-[0.05em]">
              <span data-l className="block">The Peacock</span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <span data-l className="block">Room</span>
            </span>
          </h2>
        </div>
      </div>

      <div className="gutter grid grid-cols-1 gap-14 py-24 cine:grid-cols-12 cine:gap-8 cine:py-36">
        <div className="cine:col-span-5">
          <RevealText as="p" className="t-headline">
            Up to fourteen guests, curtained off from the world.
          </RevealText>
          <p className="mt-8 max-w-lg text-ivory/75">{copy.privateDining}</p>

          <dl className="mt-12 grid grid-cols-2 border-t border-line">
            <div className="border-b border-r border-line py-6 pr-6">
              <dt className="t-label text-muted">Seats</dt>
              <dd className="t-num mt-2 text-4xl" style={{ fontWeight: 280 }}>
                {site.privateDining.capacity}
              </dd>
            </div>
            <div className="border-b border-line py-6 pl-6">
              <dt className="t-label text-muted">Finish</dt>
              <dd className="mt-2 text-lg">Royal blue velvet</dd>
            </div>
            <div className="col-span-2 border-b border-line py-6">
              <dt className="t-label text-muted">Minimum spend</dt>
              <dd className="mt-2">
                <SpendNote />
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/private-dining/#enquire" className="btn btn-solid t-nav">
              Enquire about private dining <span className="arrow">→</span>
            </Link>
            <Link href="/private-dining/" className="link-line t-nav">
              Explore the room <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        <div className="relative cine:col-span-6 cine:col-start-7">
          <ImageReveal direction="up" className="aspect-[4/5]">
            <Img id="privateFood" />
          </ImageReveal>
          <Parallax speed={-22} className="absolute -bottom-10 -left-6 w-[45%] sm:-left-16">
            <ImageReveal direction="right" className="aspect-square" delay={0.2}>
              <Img id="tikkaPlatter" />
            </ImageReveal>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
