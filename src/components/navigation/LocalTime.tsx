"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const TZ = "Europe/London";
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

/** Current wall-clock time in London, independent of the visitor's own time zone. */
function londonNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { time: `${get("hour")}:${get("minute")}:${get("second")}`, day: dayIndex, minutes: +get("hour") * 60 + +get("minute") };
}

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const hoursFor = (day: number) => site.hours.find((h) => (h.schema as readonly string[]).includes(DAYS[day]));

/** "Open until 21:15", "Opens 17:00", or "Opens tomorrow 12:30", from the official opening times. */
function status(day: number, minutes: number) {
  const today = hoursFor(day);
  if (today) {
    if (minutes < toMin(today.opens)) return { open: false, label: `Opens ${today.opens}` };
    if (minutes < toMin(today.closes)) return { open: true, label: `Open until ${today.closes}` };
  }
  const next = hoursFor((day + 1) % 7);
  return { open: false, label: next ? `Opens tomorrow ${next.opens}` : "Closed" };
}

/**
 * Header location line: CHELSEA · LONDON with the live London time (seconds
 * ticking) and whether Kahani is open right now. Renders after mount so the
 * static HTML never shows a stale time.
 */
export function LocalTime() {
  const [now, setNow] = useState<ReturnType<typeof londonNow> | null>(null);

  useEffect(() => {
    const tick = () => setNow(londonNow());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const st = now ? status(now.day, now.minutes) : null;

  return (
    <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-4">
      <span className="t-nav whitespace-nowrap text-[0.6rem] tracking-[0.1em] text-ivory/85 xs:text-[0.625rem] xs:tracking-[0.14em] sm:text-[0.75rem] sm:tracking-[0.18em]">Chelsea · London</span>
      <span aria-hidden className="hidden h-3 w-px bg-ivory/25 lg:block" />
      <span className="t-label flex items-center gap-2 whitespace-nowrap text-ivory/60" aria-live="off">
        <time className="t-num text-ivory/85" suppressHydrationWarning>
          {now?.time ?? "--:--:--"}
        </time>
        {st ? (
          <>
            <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${st.open ? "bg-[#8fbf8a]" : "bg-brass/70"}`} />
            <span className="sr-only lg:not-sr-only">{st.label}</span>
          </>
        ) : null}
      </span>
    </div>
  );
}
