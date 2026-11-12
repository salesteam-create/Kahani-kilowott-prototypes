import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { Img } from "@/components/common/Img";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealText } from "@/components/motion/RevealText";
import { Parallax } from "@/components/motion/Parallax";
import { ClosingCTA } from "@/components/common/CTA";
import { copy } from "@/data/content";
import { pageMeta } from "@/lib/seo";
import type { AssetId } from "@/data/assets";

export const metadata = pageMeta({
  title: "The experience",
  description: "The restaurant, the bar and its wall of wine, group dining and exclusive hire at Kahani, Chelsea. Plus Chef Peter Joseph's culinary journey through India.",
  path: "/experiences/",
  image: "diningRoom",
});

const ROOMS: { kicker: string; title: string; body: string; image: AssetId; detail: AssetId }[] = [
  { kicker: "The restaurant", title: "Luxe, seductively lit.", body: copy.restaurant, image: "diningRoom", detail: "booths" },
  { kicker: "The bar", title: "A wall dedicated to wine.", body: copy.bar, image: "bar", detail: "cocktails" },
  { kicker: "The occasion", title: "The whole room, yours.", body: copy.occasion, image: "velvetChairs", detail: "wineWall" },
];

const STOPS: { place: string; days: string; image: AssetId }[] = [
  { place: "Chennai", days: "Days 1–2", image: "chennai" },
  { place: "Chettinad", days: "Days 3–4", image: "sadhya" },
  { place: "Agra", days: "Days 8–9", image: "agra" },
  { place: "Jaipur", days: "Days 9–11", image: "jaipur" },
];

export default function Experiences() {
  return (
    <>
      <PageHero image="diningRoom" kicker="The experience" title={["More than a meal.", "A place to belong."]} intro={copy.restaurant} />

      {ROOMS.map((r, i) => (
        <section key={r.kicker} className="gutter grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-12 lg:py-32">
          <div className={`relative lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`}>
            <ImageReveal direction={i % 2 ? "left" : "right"} className="aspect-[4/3]">
              <Img id={r.image} />
            </ImageReveal>
            <Parallax speed={-22} className={`absolute -bottom-10 w-[38%] ${i % 2 ? "-left-4 lg:-left-12" : "-right-4 lg:-right-12"}`}>
              <ImageReveal direction="up" className="aspect-[4/5]" delay={0.2}>
                <Img id={r.detail} />
              </ImageReveal>
            </Parallax>
          </div>
          <div className={`lg:col-span-4 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
            <p className="t-label text-brass">
              {String.fromCharCode(65 + i)} · {r.kicker}
            </p>
            <RevealText as="h2" className="t-headline mt-5">
              {r.title}
            </RevealText>
            <p className="mt-6 text-ivory/75">{r.body}</p>
          </div>
        </section>
      ))}

      <section id="journey" className="mt-10 scroll-mt-24 bg-espresso py-24 lg:py-36">
        <div className="gutter grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="t-label text-brass">An exclusive journey · 7 – 20 November 2027</p>
            <RevealText as="h2" className="t-display mt-5">
              Culinary & cultural soul of India.
            </RevealText>
            <p className="mt-8 text-ivory/80">
              A 14-day journey personally led by Chef Peter Joseph: royal kitchens, home cooking, street food and cultural traditions, from the temples of Tamil Nadu to Rajasthan, Lucknow and Delhi.
            </p>
            <dl className="mt-10 grid grid-cols-2 border-t border-line">
              <div className="border-r border-line py-6 pr-6">
                <dt className="t-label text-muted">Per person sharing</dt>
                <dd className="t-num mt-2 text-3xl" style={{ fontWeight: 280 }}>£4,495</dd>
              </div>
              <div className="py-6 pl-6">
                <dt className="t-label text-muted">Single supplement</dt>
                <dd className="t-num mt-2 text-3xl" style={{ fontWeight: 280 }}>£1,195</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-muted">Flights and visa fees are not included. Limited places.</p>
            <div className="mt-10 flex flex-wrap gap-6">
              <a href="https://bestway.com/tours/pvt/culinary-and-cultural-soul-of-india/" target="_blank" rel="noreferrer" className="btn btn-solid t-nav">
                Book the journey <span className="arrow">→</span>
              </a>
              <a href="https://www.kahanilondon.com/wp-content/uploads/2026/11/Culinary-and-Cultural-Soul-of-India-2027-Final.pdf" target="_blank" rel="noreferrer" className="link-line t-nav self-center">
                Detailed itinerary (PDF) <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:col-span-6 lg:col-start-7">
            {STOPS.map((s, i) => (
              <figure key={s.place} className={i % 2 ? "mt-12" : ""}>
                <ImageReveal direction="up" className="aspect-[3/4]" delay={i * 0.08}>
                  <Img id={s.image} />
                </ImageReveal>
                <figcaption className="mt-3 flex justify-between">
                  <span className="t-label">{s.place}</span>
                  <span className="t-label text-muted">{s.days}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="gutter mt-16">
          <Link href="/chef/" className="link-line t-nav">
            Meet Chef Peter Joseph <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
