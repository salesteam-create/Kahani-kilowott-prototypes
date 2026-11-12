import { Opening } from "@/components/home/Opening";
import { Meaning } from "@/components/home/Meaning";
import { Origin } from "@/components/home/Origin";
import { Craft } from "@/components/home/Craft";
import { MenuJourney } from "@/components/home/MenuJourney";
import { Experience } from "@/components/home/Experience";
import { Chef } from "@/components/home/Chef";
import { PrivateDining } from "@/components/home/PrivateDining";
import { Invitation } from "@/components/home/Invitation";
import { ChapterIndicator } from "@/components/home/ChapterIndicator";

/**
 * The homepage is one continuous film in nine chapters.
 * Order matters: ScrollTriggers are created top to bottom so pin spacing is
 * measured correctly.
 */
export default function Home() {
  return (
    <>
      <Opening />
      <Meaning />
      <Origin />
      <Craft />
      <MenuJourney />
      <Experience />
      <Chef />
      <PrivateDining />
      <Invitation />
      <ChapterIndicator />
    </>
  );
}
