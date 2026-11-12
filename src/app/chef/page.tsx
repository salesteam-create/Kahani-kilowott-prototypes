import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { Img } from "@/components/common/Img";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealText } from "@/components/motion/RevealText";
import { ClosingCTA } from "@/components/common/CTA";
import { copy } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Chef Peter Joseph",
  description: "Peter Joseph grew up in Chennai, learning at his mother's side, before combining that heritage with his experience in British kitchens at Kahani, Chelsea.",
  path: "/chef/",
  image: "chefPortrait",
});

const CHAPTERS = [
  { label: "Chennai", image: "chennai" as const },
  { label: "The markets", image: "spiceTable" as const },
  { label: "British kitchens", image: "wokToss" as const },
  { label: "Kahani", image: "plating" as const },
  { label: "At the table", image: "tikkaPlatter" as const },
];

export default function Chef() {
  return (
    <>
      <PageHero image="chefSeated" kicker="The chef" title={["Peter Joseph.", "The man behind the story."]} alt="Chef Peter Joseph seated in the Kahani dining room" />

      <section className="gutter grid grid-cols-1 gap-12 py-24 lg:grid-cols-12 lg:py-36">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <ImageReveal direction="up" className="aspect-[3/4]">
            <Img id="chefPortrait" alt="Chef Peter Joseph" />
          </ImageReveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="t-label text-brass">Peter's story</p>
          <RevealText as="h2" className="t-headline mt-5">
            A traditional take on Indian cooking, with a signature modern twist.
          </RevealText>
          <ol className="mt-14 space-y-14">
            {copy.chefFull.map((p, i) => (
              <li key={i} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line pt-8">
                <span className="t-label t-num text-brass">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="t-label text-muted">{CHAPTERS[i].label}</p>
                  <p className="mt-3 text-lg leading-relaxed text-ivory/85">{p}</p>
                  <ImageReveal direction={i % 2 ? "left" : "right"} className="mt-8 aspect-[16/10]">
                    <Img id={CHAPTERS[i].image} />
                  </ImageReveal>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-16 flex flex-wrap gap-6">
            <Link href="/menus/" className="btn t-nav">
              Explore the menus <span className="arrow">→</span>
            </Link>
            <Link href="/experiences/#journey" className="link-line t-nav self-center">
              Travel India with Peter <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <ClosingCTA title="Taste the story for yourself." />
    </>
  );
}
