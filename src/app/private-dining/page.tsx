import { PageHero } from "@/components/common/PageHero";
import { Img } from "@/components/common/Img";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealText } from "@/components/motion/RevealText";
import { Parallax } from "@/components/motion/Parallax";
import { SpendNote } from "@/components/common/SpendNote";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { copy } from "@/data/content";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import type { AssetId } from "@/data/assets";

export const metadata = pageMeta({
  title: "Private dining · The Peacock Room",
  description: "The Peacock Room at Kahani seats up to 14 guests in royal blue velvet, overlooking the restaurant. Private dinners, celebrations, corporate dining and exclusive hire.",
  path: "/private-dining/",
  image: "peacockRoom",
});

const OCCASIONS: { title: string; body: string; image: AssetId }[] = [
  { title: "Private celebrations", body: "Birthdays, anniversaries and special occasions in a room curtained off for complete privacy.", image: "chocolateDessert" },
  { title: "Corporate dining", body: "Business meetings and client dinners for up to fourteen, overlooking the restaurant floor.", image: "winePairing" },
  { title: "Exclusive hire", body: "Take the whole restaurant, up to ninety guests. Peter will devise a specially curated menu for the occasion.", image: "diningRoom" },
];

export default function PrivateDiningPage() {
  return (
    <>
      <PageHero image="booths" kicker="Private dining" title={["The Peacock Room.", "An intimate world of its own."]} alt="The Peacock Room at Kahani" />

      <section className="gutter grid grid-cols-1 gap-14 py-24 lg:grid-cols-12 lg:py-36">
        <div className="lg:col-span-6">
          <RevealText as="h2" className="t-headline">
            Fourteen seats, royal blue velvet, and the whole evening to yourselves.
          </RevealText>
          <p className="mt-8 text-ivory/80">{copy.privateDining}</p>
        </div>
        <dl className="grid grid-cols-2 self-end border-t border-line lg:col-span-5 lg:col-start-8">
          <div className="border-b border-r border-line py-6 pr-6">
            <dt className="t-label text-muted">Guests</dt>
            <dd className="t-num mt-2 text-5xl" style={{ fontWeight: 250 }}>
              {site.privateDining.capacity}
            </dd>
          </div>
          <div className="border-b border-line py-6 pl-6">
            <dt className="t-label text-muted">Exclusive hire</dt>
            <dd className="t-num mt-2 text-5xl" style={{ fontWeight: 250 }}>
              {site.privateDining.restaurantCapacity}
            </dd>
          </div>
          <div className="col-span-2 border-b border-line py-6">
            <dt className="t-label text-muted">Minimum spend</dt>
            <dd className="mt-3">
              <SpendNote />
            </dd>
          </div>
        </dl>
      </section>

      <section className="relative h-[70svh] overflow-hidden lg:h-[100svh]">
        <Parallax speed={20} className="absolute inset-x-0 -inset-y-[10%]">
          <Img id="diningRoom" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian" />
      </section>

      <section className="gutter py-24 lg:py-36">
        <p className="t-label text-brass">Occasions</p>
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          {OCCASIONS.map((o, i) => (
            <article key={o.title} className={i === 1 ? "md:mt-20" : ""}>
              <ImageReveal direction="up" className="aspect-[4/5]" delay={i * 0.1}>
                <Img id={o.image} />
              </ImageReveal>
              <h3 className="t-title mt-6">{o.title}</h3>
              <p className="mt-3 text-ivory/70">{o.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-espresso">
        <div className="gutter grid grid-cols-1 gap-12 py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-4">
            <p className="t-label text-brass">Special menus</p>
            <h2 className="t-headline mt-5">Tasting and Dawat.</h2>
            <p className="mt-6 text-ivory/75">Private dining guests can choose from the six-course tasting menu or the Dawat feast, designed to be shared by the whole table.</p>
            <div className="mt-8 flex flex-col gap-3">
              <a href="/menus/#tasting" className="link-line t-nav self-start">Tasting menu <span className="arrow">→</span></a>
              <a href="/menus/#dawat" className="link-line t-nav self-start">Dawat menu <span className="arrow">→</span></a>
            </div>
          </div>
          <div id="enquire" className="scroll-mt-28 lg:col-span-7 lg:col-start-6">
            <p className="t-label text-brass">Enquire</p>
            <h2 className="t-headline mt-5">Plan your event.</h2>
            <p className="mb-10 mt-4 text-ivory/70">Tell us about your occasion and the reservations team will be in touch.</p>
            <EnquiryForm />
            <p className="mt-8 text-sm text-muted">
              Prefer to talk? Call <a className="text-ivory underline-offset-4 hover:underline" href={site.phone.href}>{site.phone.display}</a> or email{" "}
              <a className="text-ivory underline-offset-4 hover:underline" href={`mailto:${site.email.reservations}`}>{site.email.reservations}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
