import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Img } from "@/components/common/Img";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealText } from "@/components/motion/RevealText";
import { giftCards } from "@/data/content";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Gift cards",
  description: "Give a Kahani gift card from £30 to £500, or a tasting or Dawat menu experience, with or without wine pairing.",
  path: "/gift-cards/",
  image: "chocolateDessert",
});

export default function GiftCards() {
  const [card, ...experiences] = giftCards;
  return (
    <>
      <PageHero image="chocolateDessert" height="short" kicker="Gift cards" title={["Give a story", "worth sharing."]} />

      <section className="gutter grid grid-cols-1 items-center gap-12 py-24 lg:grid-cols-12 lg:py-32">
        <ImageReveal direction="right" className="aspect-[4/3] lg:col-span-6">
          <Img id="cocktailsTable" />
        </ImageReveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="t-label text-brass">The Kahani gift card</p>
          <RevealText as="h2" className="t-display mt-5">
            {card.price}
          </RevealText>
          <p className="mt-6 text-ivory/75">Choose any amount, to be spent on food and drink at Kahani in Chelsea.</p>
          <a href={card.url} target="_blank" rel="noreferrer" className="btn btn-solid t-nav mt-10">
            Buy a gift card <ArrowUpRight aria-hidden className="arrow h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="gutter pb-28">
        <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
          <h2 className="t-headline">Experiences to give</h2>
          <p className="t-label hidden text-muted sm:block">Prices per voucher</p>
        </div>
        <ul>
          {experiences.map((g) => (
            <li key={g.url} className="border-b border-line">
              <a href={g.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-6 py-6">
                <span className="text-[clamp(1.15rem,2vw,1.6rem)] transition-transform duration-500 group-hover:translate-x-2" style={{ fontWeight: 320 }}>
                  {g.name}
                </span>
                <span className="flex items-center gap-6">
                  <span className="t-num text-lg text-ivory/80">{g.price}</span>
                  <ArrowUpRight aria-hidden className="h-4 w-4 text-muted transition-colors group-hover:text-brass" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          Purchases are completed securely on the existing Kahani shop. Questions? <a className="underline" href={`mailto:${site.email.reservations}`}>{site.email.reservations}</a>
        </p>
      </section>
    </>
  );
}
