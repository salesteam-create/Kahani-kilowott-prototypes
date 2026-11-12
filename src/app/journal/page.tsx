import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { RevealText } from "@/components/motion/RevealText";
import { press } from "@/data/content";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Journal · Press",
  description: "Kahani London in the press: SquareMeal, Luxury Lifestyle Magazine, Country & Town House, Quintessentially, Red and more.",
  path: "/journal/",
  image: "wineWall",
});

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function Journal() {
  const [lead, ...rest] = press;
  return (
    <>
      <PageHero image="wineWall" height="short" kicker="Journal" title={["In the press."]} />
      <section className="gutter py-20 lg:py-28">
        <a href={lead.url} target="_blank" rel="noreferrer" className="group block border-b border-line pb-14">
          <p className="t-label text-brass">
            {lead.outlet} · {fmt(lead.date)}
          </p>
          <RevealText as="h2" className="t-display mt-5 max-w-[18ch] transition-colors group-hover:text-brass">
            {lead.title}
          </RevealText>
          <span className="link-line t-nav mt-8">Read the article <span className="arrow">→</span></span>
        </a>
        <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
          {rest.map((p) => (
            <li key={p.url} className="border-b border-line">
              <a href={p.url} target="_blank" rel="noreferrer" className="group flex items-start justify-between gap-6 py-8">
                <span>
                  <span className="t-label text-muted">
                    {p.outlet} · {fmt(p.date)}
                  </span>
                  <span className="mt-3 block text-[clamp(1.15rem,1.6vw,1.45rem)] leading-snug transition-colors group-hover:text-ivory" style={{ fontWeight: 330 }}>
                    {p.title}
                  </span>
                </span>
                <ArrowUpRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-muted transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-sm text-muted">
          Press enquiries: <a className="text-ivory underline-offset-4 hover:underline" href={`mailto:${site.email.press}`}>{site.email.press}</a>
        </p>
      </section>
    </>
  );
}
