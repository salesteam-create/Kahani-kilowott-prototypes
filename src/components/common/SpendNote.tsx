"use client";

import { useEffect, useState } from "react";
import { isFestiveSeason, site } from "@/data/site";

const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

/** Minimum spends from the official private dining page; the festive rate is highlighted in season. */
export function SpendNote({ className = "" }: { className?: string }) {
  const { standard, festive } = site.privateDining.minimumSpend;
  const [festiveNow, setFestiveNow] = useState(false);
  useEffect(() => setFestiveNow(isFestiveSeason()), []);

  return (
    <div className={`space-y-2 ${className}`}>
      <p className={festiveNow ? "text-muted" : ""}>
        {gbp(standard.dinner)} dinner <span className="text-muted">·</span> {gbp(standard.lunch)} lunch
      </p>
      <p className={festiveNow ? "" : "text-muted"}>
        {festiveNow ? <span className="t-label mr-2 text-brass">Now</span> : null}
        Festive season ({festive.period}): {gbp(festive.dinner)} dinner · {gbp(festive.lunch)} lunch
      </p>
    </div>
  );
}
