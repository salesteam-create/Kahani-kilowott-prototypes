"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Mail, Phone, X } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useUI } from "@/components/layout/UIProvider";
import { site } from "@/data/site";
import { Img } from "@/components/common/Img";
import { useFocusTrap } from "@/hooks/useFocusTrap";

/**
 * Reservation sheet. Hands guests straight to the official OpenTable booking
 * page, or to phone / email. No invented booking API.
 */
export function ReserveOverlay() {
  const { panel, close } = useUI();
  const open = panel === "reserve";
  const root = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useFocusTrap(sheet, open);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      tl.current = gsap
        .timeline({ paused: true })
        .set(root.current, { visibility: "visible" })
        .fromTo(q("[data-scrim]"), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" })
        .fromTo(sheet.current, { xPercent: 100 }, { xPercent: 0, duration: 1, ease: "expo.out" }, 0)
        .fromTo(q("[data-fade]"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "power3.out" }, 0.3);
    },
    { scope: root },
  );

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) t.timeScale(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 20 : 1).play();
    else t.timeScale(1.8).reverse();
  }, [open]);

  return (
    <div ref={root} className="fixed inset-0 z-[70]" style={{ visibility: "hidden" }} aria-hidden={!open} inert={!open}>
      <button type="button" aria-label="Close reservations" data-scrim onClick={close} className="absolute inset-0 bg-obsidian/70 backdrop-blur-sm" />
      <div
        ref={sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reserve-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-[34rem] flex-col overflow-y-auto bg-ink"
      >
        <div className="relative h-48 shrink-0 sm:h-60">
          <Img id="diningRoom" decorative />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-ink" />
          <button type="button" onClick={close} className="t-nav absolute right-5 top-5 flex items-center gap-2 bg-obsidian/50 px-3 py-2 backdrop-blur">
            Close <X aria-hidden className="h-4 w-4" strokeWidth={1.3} />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-8 px-6 pb-10 pt-2 sm:px-10">
          <div data-fade>
            <p className="t-label text-brass">Reservations</p>
            <h2 id="reserve-title" className="t-headline mt-3">
              Your table at Kahani
            </h2>
            <p className="mt-3 text-muted">
              {site.address.street}, Chelsea. {site.address.landmark}.
            </p>
          </div>

          <a data-fade href={site.booking.url} target="_blank" rel="noreferrer" className="btn btn-solid t-nav w-full justify-between">
            Book online
            <ArrowUpRight aria-hidden className="arrow h-4 w-4" strokeWidth={1.4} />
          </a>
          <p data-fade className="-mt-5 text-xs text-muted">
            Opens the official booking page, powered by {site.booking.provider}.
          </p>

          <div data-fade className="grid grid-cols-1 gap-px bg-line xs:grid-cols-2">
            <a href={site.phone.href} className="group flex flex-col gap-3 bg-ink p-5 transition-colors hover:bg-surface">
              <Phone aria-hidden className="h-4 w-4 text-brass" strokeWidth={1.3} />
              <span className="t-label text-muted">Call to book</span>
              <span className="t-num">{site.phone.display}</span>
            </a>
            <a href={`mailto:${site.email.reservations}`} className="group flex flex-col gap-3 bg-ink p-5 transition-colors hover:bg-surface">
              <Mail aria-hidden className="h-4 w-4 text-brass" strokeWidth={1.3} />
              <span className="t-label text-muted">Email</span>
              <span className="break-all text-sm">{site.email.reservations}</span>
            </a>
          </div>

          <div data-fade>
            <p className="t-label text-muted">Opening times</p>
            <dl className="mt-3 divide-y divide-line border-y border-line">
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between py-3 text-sm">
                  <dt>{h.days}</dt>
                  <dd className="t-num text-muted">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-fade className="mt-auto border-t border-line pt-6">
            <p className="t-label text-muted">Groups, celebrations and private events</p>
            <Link href="/private-dining/#enquire" onClick={close} className="link-line mt-2 text-lg">
              Enquire about private dining <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
