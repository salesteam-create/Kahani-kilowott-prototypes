"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUI } from "@/components/layout/UIProvider";
import { LocalTime } from "./LocalTime";

/**
 * Minimal header: wordmark left, reservation + menu trigger right.
 * Transparent over the opening film; a restrained dark surface once scrolled.
 * Hides on scroll down, returns on scroll up so it never competes with the story.
 */
export function Header() {
  const { openMenu, openReserve, panel } = useUI();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        setHidden(y > 240 && y > last + 2);
        if (y < last - 2) setHidden(false);
        last = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter,border-color] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
        hidden && !panel ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled && !panel
          ? "border-b border-line bg-obsidian/75 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="gutter relative flex h-[var(--nav-h)] items-center justify-between gap-6">
        {/* Location and live London time; links to the contact page */}
        <Link href="/contact/" aria-label="Kahani, Chelsea, London: find us and opening times" className="relative z-10 transition-opacity hover:opacity-80">
          <LocalTime />
        </Link>

        {/* Brand mark, centred in the header */}
        <Link
          href="/"
          aria-label="Kahani, home"
          data-cursor="hide"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 hover:opacity-80"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hq/kahani-mark.png" alt="" width={607} height={202} className="h-5 w-auto xs:h-7 sm:h-9" draggable={false} />
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-2 sm:gap-6">
          <a href={`tel:+442077307634`} className="t-nav hidden text-muted transition-colors hover:text-ivory lg:inline">
            020 7730 7634
          </a>
          <button
            type="button"
            onClick={openReserve}
            className="t-nav hidden h-10 items-center border border-ivory/30 px-5 text-ivory transition-colors duration-500 hover:border-brass hover:text-brass sm:inline-flex"
          >
            Reserve
          </button>
          <button
            type="button"
            onClick={openMenu}
            aria-expanded={panel === "menu"}
            aria-controls="site-menu"
            aria-label="Open menu"
            className="group t-nav flex h-10 items-center gap-3 pl-3 text-ivory"
          >
            <span className="hidden xs:inline">Menu</span>
            <span aria-hidden className="relative flex h-3 w-7 flex-col justify-between">
              <span className="h-px w-full bg-current transition-transform duration-500 group-hover:translate-x-1" />
              <span className="h-px w-2/3 self-end bg-current transition-[width] duration-500 group-hover:w-full" />
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
