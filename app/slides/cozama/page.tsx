import Deck from "@/components/slides/Deck";
import Slide01 from "@/content/slides/cozama/01-agenda.mdx";
import Slide02 from "@/content/slides/cozama/02-oekosysteme.mdx";
import Slide03 from "@/content/slides/cozama/03-lifecycle.mdx";
import Slide04 from "@/content/slides/cozama/04-journey.mdx";
import Slide05 from "@/content/slides/cozama/05-quality-layer.mdx";
import Slide06 from "@/content/slides/cozama/06-startplatz.mdx";
import Slide07 from "@/content/slides/cozama/07-next-steps.mdx";

export default function CozamaDeck() {
  return (
    <Deck title="cozama × MaCh2.Cloud">
      <Slide01 />
      <Slide02 />
      <Slide03 />
      <Slide04 />
      <Slide05 />
      <Slide06 />
      <Slide07 />
    </Deck>
  );
}
