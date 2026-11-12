"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useUI } from "@/components/layout/UIProvider";
import { navigation, secondaryNav } from "@/data/content";
import { site } from "@/data/site";
import { Img } from "@/components/common/Img";
import { useFocusTrap } from "@/hooks/useFocusTrap";

/**
 * Full-screen editorial navigation. Hovering an item crossfades a related
 * official photograph that drifts gently with the pointer.
 */
export function MenuOverlay() {
  const { panel, close, openReserve } = useUI();
  const open = panel === "menu";
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [active, setActive] = useState(0);
  const pathname = usePathname();

  useFocusTrap(root, open);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
        .set(root.current, { visibility: "visible" })
        .fromTo(root.current, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 })
        .fromTo(q("[data-nav-item]"), { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.045, ease: "expo.out" }, 0.35)
        .fromTo(q("[data-nav-fade]"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: "power2.out" }, 0.6)
        .fromTo(preview.current, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.4, ease: "expo.out" }, 0.45);
    },
    { scope: root },
  );

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      t.timeScale(reduce ? 20 : 1).play();
    } else t.timeScale(1.6).reverse();
  }, [open]);

  // Close when the route changes.
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Pointer drift for the preview image.
  useEffect(() => {
    if (!open || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = preview.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      xTo((e.clientX / window.innerWidth - 0.5) * 36);
      yTo((e.clientY / window.innerHeight - 0.5) * 28);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [open]);

  return (
    <div
      ref={root}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
      inert={!open}
      className="fixed inset-0 z-[60] overflow-y-auto bg-ink"
      style={{ visibility: "hidden" }}
    >
      {/* Tonal background that warms with the active item */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-[background] duration-1000"
        style={{
          background: `radial-gradient(80% 70% at ${70 - active * 3}% ${30 + active * 5}%, rgb(101 51 47 / 0.38), transparent 70%)`,
        }}
      />

      <div className="gutter relative flex h-[var(--nav-h)] items-center justify-between">
        <span className="t-nav text-[0.95rem] tracking-[0.42em]" style={{ fontWeight: 420 }}>
          KAHANI
        </span>
        <button type="button" onClick={close} className="t-nav group flex h-10 items-center gap-3 text-ivory">
          Close
          <X aria-hidden className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" strokeWidth={1.2} />
        </button>
      </div>

      <div className="gutter relative grid min-h-[calc(100svh-var(--nav-h))] grid-cols-1 gap-10 pb-10 pt-6 lg:grid-cols-12 lg:pb-14">
        <nav aria-label="Site" className="lg:col-span-7">
          <ol className="flex flex-col">
            {navigation.map((item, i) => {
              const current = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
              return (
                <li key={item.href} className="overflow-hidden">
                  <Link
                    href={item.href}
                    data-nav-item
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={current ? "page" : undefined}
                    className="group flex items-baseline gap-4 py-[0.18em] text-[clamp(2.25rem,6.4vw,5.25rem)] leading-[1] tracking-[-0.03em] transition-colors duration-500"
                    style={{ fontWeight: 280, fontStretch: "105%" }}
                  >
                    <span className="t-label t-num w-8 shrink-0 text-muted transition-colors group-hover:text-brass">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`inline-block transition-[transform,color,font-weight] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-3 ${
                        active === i ? "text-ivory" : "text-ivory/45"
                      }"}`}
                    >
                      {item.label}
                    </span>
                    {current ? <span aria-hidden className="h-1.5 w-1.5 shrink-0 self-center rounded-full bg-brass" /> : null}
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="flex flex-col justify-between gap-10 lg:col-span-5">
          <div ref={preview} className="relative hidden aspect-[4/5] w-full max-w-[26rem] self-end overflow-hidden lg:block">
            {navigation.map((item, i) => (
              <div
                key={item.href}
                className="absolute inset-0 transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ opacity: active === i ? 1 : 0, transform: active === i ? "scale(1)" : "scale(1.06)" }}
              >
                {open || active === i ? <Img id={item.image} decorative /> : null}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm text-muted">
            <div data-nav-fade className="space-y-2">
              <p className="t-label text-brass">Visit</p>
              <p>
                {site.address.street}
                <br />
                {site.address.city} {site.address.postcode}
              </p>
              <a className="link-line text-ivory" href={site.address.mapUrl} target="_blank" rel="noreferrer">
                Directions <span className="arrow">→</span>
              </a>
            </div>
            <div data-nav-fade className="space-y-2">
              <p className="t-label text-brass">Book</p>
              <a className="block hover:text-ivory" href={site.phone.href}>
                {site.phone.display}
              </a>
              <a className="block break-all hover:text-ivory" href={`mailto:${site.email.reservations}`}>
                {site.email.reservations}
              </a>
              <button type="button" onClick={openReserve} className="link-line text-ivory">
                Reserve a table <span className="arrow">→</span>
              </button>
            </div>
            <div data-nav-fade className="col-span-2 flex flex-wrap gap-x-8 gap-y-2">
              {secondaryNav.map((l) => (
                <Link key={l.href} href={l.href} className="link-line t-nav text-ivory/80">
                  {l.label}
                </Link>
              ))}
              <a href={site.social.instagram} target="_blank" rel="noreferrer" className="link-line t-nav text-ivory/80">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
