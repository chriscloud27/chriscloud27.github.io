import Deck from "@/components/slides/Deck";
import Slide01 from "@/content/slides/mach2/01-hero.mdx";
import Slide02 from "@/content/slides/mach2/02-problem.mdx";
import Slide03 from "@/content/slides/mach2/03-stats.mdx";
import Slide04 from "@/content/slides/mach2/04-diagnosis.mdx";
import Slide05 from "@/content/slides/mach2/05-journey.mdx";
import Slide06 from "@/content/slides/mach2/06-why-different.mdx";
import Slide07 from "@/content/slides/mach2/07-track-record.mdx";
import Slide08 from "@/content/slides/mach2/08-cta.mdx";
import Slide09 from "@/content/slides/mach2/09-compass.mdx";

export default function MaCh2Deck() {
  return (
    <Deck title="MaCh2.Cloud">
      <Slide01 />
      <Slide02 />
      <Slide03 />
      <Slide04 />
      <Slide05 />
      <Slide06 />
      <Slide07 />
      <Slide09 />
      <Slide08 />
    </Deck>
  );
}
