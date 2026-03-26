import Deck from "@/components/slides/Deck";
import Slide01 from "@/content/slides/fairup/01-problem.mdx";
import Slide02 from "@/content/slides/fairup/02-insight.mdx";
import Slide03 from "@/content/slides/fairup/03-solution.mdx";
import Slide04 from "@/content/slides/fairup/04-how-it-works.mdx";
import Slide05 from "@/content/slides/fairup/05-features.mdx";
import Slide06 from "@/content/slides/fairup/06-value.mdx";
import Slide07 from "@/content/slides/fairup/07-customers.mdx";
import Slide08 from "@/content/slides/fairup/08-model.mdx";
import Slide09 from "@/content/slides/fairup/09-vision.mdx";

// MDX slides are rendered on the server and passed as children (JSX) to the
// client Deck component — no function references cross the server/client boundary.
export default function FairUpDeck() {
  return (
    <Deck title="FairUp">
      <Slide01 />
      <Slide02 />
      <Slide03 />
      <Slide04 />
      <Slide05 />
      <Slide06 />
      <Slide07 />
      <Slide08 />
      <Slide09 />
    </Deck>
  );
}
