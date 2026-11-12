"use client";

import Link from "next/link";
import { useActiveMenus } from "@/hooks/useActiveMenus";

export function SeasonalList() {
  const list = useActiveMenus().filter((m) => m.kind === "seasonal");
  if (!list.length)
    return <p className="mt-8 text-ivory/70">No seasonal menus are running right now. Explore the full menu or ask about a bespoke menu for your event.</p>;
  return (
    <ul className="mt-10 border-t border-line">
      {list.map((m) => (
        <li key={m.slug} className="border-b border-line">
          <Link href={`/menus/#${m.slug}`} className="group flex items-center justify-between py-5">
            <span className="text-xl transition-transform duration-500 group-hover:translate-x-2" style={{ fontWeight: 320 }}>{m.title}</span>
            <span className="t-nav text-muted group-hover:text-brass">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

