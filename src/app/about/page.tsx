import { PageHero } from "@/components/common/PageHero";
import { Img } from "@/components/common/Img";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealText } from "@/components/motion/RevealText";
import { Parallax } from "@/components/motion/Parallax";
import { ClosingCTA } from "@/components/common/CTA";
import { copy } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our story",
  description: "Kahani means story. Contemporary Indian cooking by chef Peter Joseph in Chelsea, opposite Cadogan Hall: seasonal British produce, Indian spice, robata and tandoor.",
  path: "/about/",
  image: "spiceTable",
});

export default function About() {
  return (
    <>
      <PageHero image="spiceTable" kicker="Our story" title={["Kahani means story.", "This is ours."]} intro={copy.history} />

      <section className="gutter grid grid-cols-1 gap-12 py-24 lg:grid-cols-12 lg:py-36">
        <div className="lg:col-span-5">
          <p className="t-label text-brass">The latest chapter</p>
          <RevealText as="h2" className="t-headline mt-5">
            A fresh approach to Indian cuisine.
          </RevealText>
        </div>
        <div className="space-y-6 text-ivory/80 lg:col-span-6 lg:col-start-7">
          <p className="t-lead">{copy.meaning}</p>
          <p>{copy.restaurant}</p>
        </div>
      </section>

      <section className="relative">
        <ImageReveal direction="inset" className="h-[60svh] lg:h-[85svh]">
          <Img id="diningRoom" />
        </ImageReveal>
      </section>

      <section className="gutter grid grid-cols-1 items-center gap-14 py-24 lg:grid-cols-12 lg:py-36">
        <div className="relative lg:col-span-6">
          <ImageReveal direction="right" className="aspect-[4/5]">
            <Img id="flames" />
          </ImageReveal>
          <Parallax speed={-20} className="absolute -bottom-12 -right-4 w-1/2 lg:-right-16">
            <ImageReveal direction="up" className="aspect-square" delay={0.2}>
              <Img id="broccoli" />
            </ImageReveal>
          </Parallax>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="t-label text-brass">Our approach</p>
          <RevealText as="h2" className="t-headline mt-5">
            Robata, tandoor, and the best of the British seasons.
          </RevealText>
          <p className="mt-8 text-ivory/80">{copy.approach}</p>
          <p className="mt-5 text-muted">{copy.sharing}</p>
        </div>
      </section>

      <section className="border-y border-line">
        <dl className="gutter grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ["90", "Guests in the main restaurant"],
            ["14", "Guests in the Peacock Room"],
            ["1", "Wilbraham Place, opposite Cadogan Hall"],
          ].map(([n, l]) => (
            <div key={l} className="flex flex-col-reverse py-10 sm:px-8 sm:first:pl-0">
              <dt className="t-label mt-3 text-muted">{l}</dt>
              <dd className="t-num text-6xl" style={{ fontWeight: 250 }}>
                {n}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <ClosingCTA />
    </>
  );
}
