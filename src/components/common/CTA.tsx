"use client";

import Link from "next/link";
import { useUI } from "@/components/layout/UIProvider";
import { RevealText } from "@/components/motion/RevealText";

/** Closing call to action used on inner pages: booking is always the next step. */
export function ClosingCTA({ title = "Your story begins at Kahani." }: { title?: string }) {
  const { openReserve } = useUI();
  return (
    <section className="gutter relative overflow-hidden bg-wine/40 py-28 text-center lg:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 80% at 50% 100%, rgb(101 51 47 / 0.55), transparent 70%)" }} />
      <div className="relative">
        <p className="t-label text-brass">Reservations</p>
        <RevealText as="h2" className="t-display mx-auto mt-6 max-w-[16ch]">
          {title}
        </RevealText>
        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
          <button type="button" onClick={openReserve} className="btn btn-solid t-nav min-w-[15rem]">
            Reserve your table <span className="arrow">→</span>
          </button>
          <Link href="/private-dining/" className="link-line t-nav">
            Private dining <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
