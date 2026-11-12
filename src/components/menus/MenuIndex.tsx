"use client";

import Link from "next/link";
import { useState } from "react";
import { Img } from "@/components/common/Img";
import { menus } from "@/data/menus";
import { useActiveMenus } from "@/hooks/useActiveMenus";

/**
 * Interactive menu index: hovering a menu reveals its photograph,
 * clicking goes straight to that menu on the menus page.
 */
export function MenuIndex() {
  const list = useActiveMenus();
  const [active, setActive] = useState(0);
  const current = list[active] ?? list[0];

  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-12">
      <div className="relative hidden overflow-hidden lg:col-span-5 lg:block">
        {menus.map((m) => (
          <div
            key={m.slug}
            aria-hidden
            className="absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ opacity: current?.slug === m.slug ? 1 : 0, transform: current?.slug === m.slug ? "scale(1)" : "scale(1.05)" }}
          >
            <Img id={m.image} decorative />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-espresso/90" />
        <div className="scrim-bottom absolute inset-x-0 bottom-0 h-1/2" />
        {current ? (
          <p className="t-label absolute bottom-20 left-10 max-w-xs text-ivory/85">
            {current.meta ?? current.summary}
          </p>
        ) : null}
      </div>

      <div className="gutter flex flex-col justify-center py-16 lg:col-span-7 lg:py-0 lg:pl-16">
        <p className="t-label text-brass">Every menu</p>
        <h3 className="t-headline mt-4">Choose your story.</h3>
        <ul className="mt-8 border-t border-line lg:mt-10 lg:grid lg:grid-cols-2 lg:gap-x-10">
          {list.map((m, i) => (
            <li key={m.slug} className="border-b border-line">
              <Link
                href={`/menus/#${m.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group flex items-baseline justify-between gap-6 py-3 lg:py-[0.85rem]"
              >
                <span className="flex items-baseline gap-5">
                  <span className="t-label t-num w-6 text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`text-[clamp(1.3rem,1.75vw,1.85rem)] leading-tight tracking-[-0.02em] transition-[color,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2 ${
                      active === i ? "text-ivory" : "text-ivory/55"
                    }`}
                    style={{ fontWeight: 320 }}
                  >
                    {m.title}
                  </span>
                  {m.kind === "seasonal" ? <span className="t-label hidden text-brass sm:inline">Seasonal</span> : null}
                </span>
                <span className="t-nav text-muted transition-[transform,color] duration-500 group-hover:translate-x-1 group-hover:text-brass">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/menus/" className="link-line t-nav mt-8 self-start">
          All menus <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
}
