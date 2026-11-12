"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { useUI } from "./UIProvider";
import { site } from "@/data/site";

/**
 * Persistent booking bar on small screens. Appears after the opening frame so
 * the hero stays clean, and is always one tap away from a table.
 */
export function MobileDock() {
  const { openReserve, panel } = useUI();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-obsidian/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:hidden ${
        show && !panel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex h-16 items-stretch">
        <a href={site.phone.href} className="t-nav flex flex-1 items-center justify-center gap-2 border-r border-line text-ivory/85" aria-label={`Call ${site.phone.display}`}>
          <Phone aria-hidden className="h-4 w-4 text-brass" strokeWidth={1.3} /> Call
        </a>
        <button type="button" onClick={openReserve} className="t-nav flex flex-[2] items-center justify-center bg-ivory text-obsidian">
          Reserve a table
        </button>
      </div>
    </div>
  );
}
