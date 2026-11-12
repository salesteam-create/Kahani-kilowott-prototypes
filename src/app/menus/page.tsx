import { PageHero } from "@/components/common/PageHero";
import { MenuBook } from "@/components/menus/MenuBook";
import { ClosingCTA } from "@/components/common/CTA";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Menus",
  description: "Kahani's à la carte, tasting, Dawat, lunch & early evening, vegan, bottomless brunch, dessert, wine and drinks menus, plus seasonal menus.",
  path: "/menus/",
  image: "broccoli",
});

export default function Menus() {
  return (
    <>
      <PageHero
        image="crispyGreens"
        height="short"
        kicker="Menus"
        title={["An expression", "of flavour."]}
        intro="Every menu, current and seasonal. Dishes are listed from the official menus; the original document is always one tap away."
      />
      <MenuBook />
      <ClosingCTA title="Hungry for the next chapter?" />
    </>
  );
}
