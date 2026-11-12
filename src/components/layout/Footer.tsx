"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { site } from "@/data/site";
import { navigation, secondaryNav } from "@/data/content";
import { useUI } from "./UIProvider";

/** The footer rises out of the dark: wordmark letters lift as it enters. */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { openReserve } = useUI();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        gsap.fromTo(
          "[data-foot-letter]",
          { yPercent: 70, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
          },
        );
        gsap.fromTo("[data-foot-inner]", { yPercent: -18 }, {
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} className="relative overflow-hidden bg-obsidian pb-24 sm:pb-0" aria-labelledby="footer-title">
      <div className="hairline" />
      <div data-foot-inner className="gutter pt-16 lg:pt-24">
        <h2 id="footer-title" className="sr-only">
          Kahani London
        </h2>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <p className="t-label text-brass">Find us</p>
            <address className="not-italic leading-relaxed text-ivory/85">
              {site.address.street}
              <br />
              {site.address.city} {site.address.postcode}
              <br />
              <span className="text-muted">{site.address.landmark}</span>
            </address>
            <a href={site.address.mapUrl} target="_blank" rel="noreferrer" className="link-line t-nav">
              Get directions <span className="arrow">→</span>
            </a>
          </div>
          <div className="space-y-4 lg:col-span-3">
            <p className="t-label text-brass">Opening times</p>
            <dl className="space-y-2 text-ivory/85">
              {site.hours.map((h) => (
                <div key={h.days}>
                  <dt className="text-muted">{h.days}</dt>
                  <dd className="t-num">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-4 lg:col-span-2">
            <p className="t-label text-brass">Explore</p>
            <ul className="space-y-1.5">
              {[...navigation.slice(1), ...secondaryNav].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="group inline-flex items-center gap-2 text-ivory/75 transition-colors hover:text-ivory">
                    <span className="h-px w-0 bg-brass transition-[width] duration-500 group-hover:w-4" />
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 lg:col-span-3">
            <p className="t-label text-brass">Reservations</p>
            <a href={site.phone.href} className="block t-num text-lg hover:text-brass">
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email.reservations}`} className="block break-all text-ivory/75 hover:text-ivory">
              {site.email.reservations}
            </a>
            <button type="button" onClick={openReserve} className="btn t-nav mt-2">
              Reserve a table <span className="arrow">→</span>
            </button>
          </div>
        </div>

        <div aria-hidden className="mt-16 flex select-none justify-between overflow-hidden leading-[0.78] text-ivory/[0.08] lg:mt-24">
          {"KAHANI".split("").map((l, i) => (
            <span
              key={i}
              data-foot-letter
              className="inline-block text-[clamp(4rem,18.5vw,19rem)]"
              style={{ fontWeight: 300, fontStretch: "125%" }}
            >
              {l}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kahani London. Contemporary Indian dining, Chelsea.</p>
          <div className="flex gap-6">
            <a href={site.social.instagram} target="_blank" rel="noreferrer" className="hover:text-ivory">
              Instagram
            </a>
            <a href={site.social.facebook} target="_blank" rel="noreferrer" className="hover:text-ivory">
              Facebook
            </a>
            <a href={site.legal.privacy} target="_blank" rel="noreferrer" className="hover:text-ivory">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
