import { query } from "../../api/query";
import { ContactWidget } from "../../components/ContactWidget/ContactWidget";
import { PhotoGrid } from "../../components/PhotoGrid/PhotoGrid";
import { Markdown } from "../../design-system/Markdown/Markdown";
import { createGenerateMetadata, openGraph } from "../../lib/metadata";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } =
    await query.content.metadata("fotografie");

  return {
    title,
    description,
    openGraph: {
      ...(await openGraph(title, description, slug)),
    },
  };
});

const PhotographyPage = async () => {
  const text = await query.content.textSnippet("Photography");

  return (
    <>
      <Markdown>{text}</Markdown>
      <PhotoGrid />
      <ContactWidget />
    </>
  );
};

export default PhotographyPage;
