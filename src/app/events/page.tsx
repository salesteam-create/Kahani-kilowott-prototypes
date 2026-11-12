import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { Img } from "@/components/common/Img";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealText } from "@/components/motion/RevealText";
import { SeasonalList } from "@/components/menus/SeasonalList";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Events & group dining",
  description: "Plan a private dinner, celebration or corporate event at Kahani London: the Peacock Room, exclusive hire and bespoke menus.",
  path: "/events/",
  image: "bar",
});

export default function Events() {
  return (
    <>
      <PageHero
        image="bar"
        kicker="Events"
        title={["Celebrations,", "dinners, gatherings."]}
        intro="Planning a private dinner, celebration or corporate event? Kahani offers exclusive private dining spaces and bespoke menus curated by Chef Peter Joseph."
      />
      <section className="gutter grid grid-cols-1 gap-14 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-5">
          <p className="t-label text-brass">This season</p>
          <RevealText as="h2" className="t-headline mt-5">
            Seasonal menus at Kahani.
          </RevealText>
          <SeasonalList />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ImageReveal direction="up" className="aspect-[4/5]">
            <Img id="cocktailOrange" />
          </ImageReveal>
        </div>
      </section>
      <section className="border-t border-line bg-espresso">
        <div className="gutter grid grid-cols-1 gap-10 py-20 md:grid-cols-3">
          <div>
            <p className="t-label text-muted">Events & reservations</p>
            <a className="mt-3 block break-all text-lg hover:text-brass" href={`mailto:${site.email.reservations}`}>{site.email.reservations}</a>
            <a className="t-num mt-1 block text-lg hover:text-brass" href={site.phone.href}>{site.phone.display}</a>
          </div>
          <div>
            <p className="t-label text-muted">Press enquiries</p>
            <a className="mt-3 block break-all text-lg hover:text-brass" href={`mailto:${site.email.press}`}>{site.email.press}</a>
          </div>
          <div className="flex items-start md:justify-end">
            <Link href="/private-dining/#enquire" className="btn btn-solid t-nav">
              Enquire about an event <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
