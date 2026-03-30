import Deck from "@/components/slides/Deck";
import Slide01 from "@/content/slides/cozamamach2cloud/01-agenda.mdx";
import Slide02 from "@/content/slides/cozamamach2cloud/02-chris.mdx";
import Slide03 from "@/content/slides/cozamamach2cloud/03-probleme.mdx";
import Slide04 from "@/content/slides/cozamamach2cloud/04-lifecycle.mdx";
import Slide05 from "@/content/slides/cozamamach2cloud/05-engagement-ladder.mdx";
import Slide06 from "@/content/slides/cozamamach2cloud/06-quality-layer.mdx";
import Slide07 from "@/content/slides/cozamamach2cloud/07-next-steps.mdx";

export default function CozamaMach2Deck() {
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
