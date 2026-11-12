"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Img } from "@/components/common/Img";
import { galleryGroups, assets, type AssetId } from "@/data/assets";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useScroll } from "@/components/motion/ScrollProvider";
import { gsap, useGSAP } from "@/lib/gsap";

// Asymmetric editorial rhythm: spans and offsets repeat every 7 frames.
const RHYTHM = [
  "lg:col-span-7 aspect-[4/3]",
  "lg:col-span-4 lg:col-start-9 aspect-[3/4] lg:mt-32",
  "lg:col-span-5 aspect-square",
  "lg:col-span-6 lg:col-start-7 aspect-[16/10] lg:-mt-24",
  "lg:col-span-4 lg:col-start-2 aspect-[4/5]",
  "lg:col-span-6 lg:col-start-7 aspect-[4/3] lg:mt-40",
  "lg:col-span-12 aspect-[21/9]",
];

/** Cinematic gallery: filters, an asymmetric layout and a keyboard-accessible lightbox. */
export function Gallery() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const { stop, start } = useScroll();

  const items: AssetId[] =
    filter === "all" ? galleryGroups.flatMap((g) => g.items) : galleryGroups.find((g) => g.key === filter)?.items ?? [];

  useFocusTrap(box, open !== null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>("[data-g-item]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(12% 0% 12% 0%)", opacity: 0 },
          { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } },
        );
      });
    },
    { scope: grid, dependencies: [filter], revertOnUpdate: true },
  );

  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) {
      start();
      return;
    }
    stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, step]);

  return (
    <>
      <div className="gutter sticky top-0 z-30 flex gap-6 overflow-x-auto border-y border-line bg-obsidian/90 backdrop-blur-md" role="toolbar" aria-label="Filter gallery">
        {[{ key: "all", label: "All" }, ...galleryGroups].map((g) => (
          <button
            key={g.key}
            type="button"
            aria-pressed={filter === g.key}
            onClick={() => setFilter(g.key)}
            className={`t-nav relative shrink-0 py-5 ${filter === g.key ? "text-ivory" : "text-muted hover:text-ivory"}`}
          >
            {g.label}
            <span className={`absolute inset-x-0 bottom-0 h-px origin-left bg-brass transition-transform duration-500 ${filter === g.key ? "scale-x-100" : "scale-x-0"}`} />
          </button>
        ))}
      </div>

      <div ref={grid} className="gutter grid grid-cols-2 gap-3 py-16 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-16 lg:py-28">
        {items.map((id, i) => (
          <button
            key={`${filter}-${id}`}
            type="button"
            data-g-item
            data-cursor="view"
            onClick={() => setOpen(i)}
            className={`frame hover-zoom group relative ${i % 3 === 0 ? "col-span-2" : "col-span-1"} ${RHYTHM[i % RHYTHM.length]}`}
            aria-label={`Open image: ${assets[id].subject}`}
          >
            <Img id={id} />
            <span className="t-label absolute bottom-4 left-4 z-10 translate-y-2 text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {assets[id].dish ?? assets[id].category.replace("-", " ")}
            </span>
            <span className="absolute inset-0 bg-gradient-to-t from-obsidian/0 to-transparent transition-colors duration-500 group-hover:from-obsidian/70" />
          </button>
        ))}
      </div>

      {open !== null ? (
        <div ref={box} role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-[80] flex flex-col bg-obsidian/97 backdrop-blur">
          <div className="gutter flex h-[var(--nav-h)] items-center justify-between">
            <span className="t-label t-num text-muted">
              {String(open + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => setOpen(null)} className="t-nav flex items-center gap-2">
              Close <X aria-hidden className="h-5 w-5" strokeWidth={1.2} />
            </button>
          </div>
          <figure className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-6 sm:px-20">
            <div key={items[open]} className="relative h-full w-full animate-[fadein_.6s_ease]">
              <Img id={items[open]} className="!object-contain" />
            </div>
            <figcaption className="mt-4 max-w-xl text-center text-sm text-muted">{assets[items[open]].subject}</figcaption>
            <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-line bg-obsidian/60 sm:left-6">
              <ChevronLeft aria-hidden className="h-5 w-5" strokeWidth={1.2} />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next image" className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-line bg-obsidian/60 sm:right-6">
              <ChevronRight aria-hidden className="h-5 w-5" strokeWidth={1.2} />
            </button>
          </figure>
        </div>
      ) : null}
    </>
  );
}
