"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Img } from "@/components/common/Img";
import { useActiveMenus } from "@/hooks/useActiveMenus";
import { useScroll } from "@/components/motion/ScrollProvider";
import { useUI } from "@/components/layout/UIProvider";
import type { Menu } from "@/data/menus";

const PREVIEW = 8;

/**
 * The menus page. Usability first: a sticky category bar with an active
 * indicator, readable dish lists transcribed from the official PDFs,
 * expandable long menus, and the original PDF one tap away.
 */
export function MenuBook() {
  const list = useActiveMenus();
  const [active, setActive] = useState(list[0]?.slug);
  const { scrollTo } = useScroll();
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = list.map((m) => document.getElementById(m.slug)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    // Deep link from the homepage (/menus/#tasting).
    const hash = window.location.hash.slice(1);
    if (hash && list.some((m) => m.slug === hash)) setTimeout(() => scrollTo(`#${hash}`, { offset: -140, immediate: true }), 300);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  // Keep the active tab visible in the scrollable bar.
  useEffect(() => {
    const tab = bar.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    tab?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  const food = list.filter((m) => m.kind !== "drinks");
  const drinks = list.filter((m) => m.kind === "drinks");

  return (
    <>
      <div className="sticky top-0 z-30 border-y border-line bg-obsidian/90 backdrop-blur-md">
        <div ref={bar} className="snap-x-rail gutter flex gap-6 overflow-x-auto" role="tablist" aria-label="Menus">
          {list.map((m) => (
            <button
              key={m.slug}
              type="button"
              role="tab"
              data-tab={m.slug}
              aria-selected={active === m.slug}
              onClick={() => scrollTo(`#${m.slug}`, { offset: -100 })}
              className={`t-nav relative shrink-0 whitespace-nowrap py-5 transition-colors ${active === m.slug ? "text-ivory" : "text-muted hover:text-ivory"}`}
            >
              {m.title}
              <span className={`absolute inset-x-0 bottom-0 h-px origin-left bg-brass transition-transform duration-500 ${active === m.slug ? "scale-x-100" : "scale-x-0"}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="gutter">
        <p className="t-label pt-16 text-brass">Food</p>
        {food.map((m) => (
          <MenuSection key={m.slug} menu={m} />
        ))}
        <p className="t-label pt-24 text-brass">Wine & drinks</p>
        {drinks.map((m) => (
          <MenuSection key={m.slug} menu={m} />
        ))}
      </div>
    </>
  );
}

function MenuSection({ menu }: { menu: Menu }) {
  const [expanded, setExpanded] = useState(false);
  const { openReserve } = useUI();
  const dishCount = menu.sections?.reduce((n, s) => n + s.dishes.length, 0) ?? 0;
  const long = dishCount > PREVIEW;
  let shown = 0;

  return (
    <section id={menu.slug} aria-labelledby={`${menu.slug}-title`} className="grid scroll-mt-28 grid-cols-1 gap-10 border-b border-line py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
      <header className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
        <div className="frame hover-zoom aspect-[4/3]">
          <Img id={menu.image} />
        </div>
        <div className="mt-6 flex items-center gap-3">
          {menu.kind === "seasonal" ? <span className="t-label border border-brass/50 px-2 py-1 text-brass">Seasonal</span> : null}
          {menu.meta ? <span className="t-label text-muted">{menu.meta}</span> : null}
        </div>
        <h2 id={`${menu.slug}-title`} className="t-title mt-4">
          {menu.title}
        </h2>
        <p className="mt-3 text-ivory/70">{menu.summary}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <a href={menu.pdf} target="_blank" rel="noreferrer" className="link-line t-nav">
            View full menu (PDF) <ArrowUpRight aria-hidden className="arrow h-3.5 w-3.5" />
          </a>
          <button type="button" onClick={openReserve} className="link-line t-nav text-brass">
            Book <span className="arrow">→</span>
          </button>
        </div>
      </header>

      <div className="lg:col-span-7 lg:col-start-6">
        {menu.sections ? (
          <>
            <div className={`relative overflow-hidden transition-[max-height] duration-700 ${long && !expanded ? "max-h-[46rem]" : "max-h-none"}`}>
              {menu.sections.map((s) => (
                <div key={s.title} className="mb-12 last:mb-0">
                  <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                    <h3 className="t-label text-ivory">{s.title}</h3>
                    {s.note ? <span className="t-label text-muted">{s.note}</span> : null}
                  </div>
                  <ul className="divide-y divide-line/60">
                    {s.dishes.map((d) => {
                      shown++;
                      return (
                        <li key={d.name + shown} className="grid grid-cols-[1fr_auto] gap-x-6 py-4">
                          <p className="text-[1.05rem] text-ivory" style={{ fontWeight: 400 }}>
                            {d.name}
                          </p>
                          {d.price ? <p className="t-num text-ivory/80">{d.price}</p> : <span />}
                          {d.description ? <p className="col-span-2 mt-1 text-sm text-muted">{d.description}</p> : null}
                          {d.pairing ? <p className="col-span-2 mt-1 text-xs italic text-brass/80">Paired with {d.pairing}</p> : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              {long && !expanded ? <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent" /> : null}
            </div>
            {long ? (
              <button type="button" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded} className="btn t-nav mt-8">
                {expanded ? "Show less" : `Show all ${dishCount} dishes`}
                <ChevronDown aria-hidden className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} strokeWidth={1.4} />
              </button>
            ) : null}
            {menu.footnote ? <p className="mt-8 text-xs text-muted">{menu.footnote} Prices in £.</p> : null}
          </>
        ) : (
          <div className="flex h-full min-h-56 flex-col justify-center border border-line p-8 lg:p-12">
            <p className="t-label text-muted">Full details</p>
            <p className="t-lead mt-4 max-w-md text-ivory/85">The complete {menu.title.toLowerCase()} is available as the official document.</p>
            <a href={menu.pdf} target="_blank" rel="noreferrer" className="btn btn-solid t-nav mt-8 self-start">
              Open the menu <ArrowUpRight aria-hidden className="arrow h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
