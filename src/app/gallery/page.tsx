import { PageHero } from "@/components/common/PageHero";
import { Gallery } from "@/components/gallery/Gallery";
import { ClosingCTA } from "@/components/common/CTA";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Gallery",
  description: "Food, kitchen, restaurant, bar and private dining at Kahani, Chelsea. Official photography.",
  path: "/gallery/",
  image: "flames",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero image="chocolatePour" height="short" kicker="Gallery" title={["The archive.", "Every frame, Kahani."]} />
      <Gallery />
      <ClosingCTA />
    </>
  );
}
