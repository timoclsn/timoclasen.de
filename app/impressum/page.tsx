import { ContactWidget } from "../../components/ContactWidget";
import { TextBlock } from "../../components/TextBlock";
import { getMetadata, getTextSnippet } from "../../data/content";
import { createGenerateMetadata, openGraph } from "../../lib/metadata";
import { markdownToHTML } from "../../lib/text";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } = await getMetadata("impressum");

  return {
    title,
    description,
    openGraph: {
      ...openGraph(title, description, slug),
    },
  };
});

const LegalPage = async () => {
  const textSnippet = await getTextSnippet("Impressum & Datenschutz");
  const legalText = await markdownToHTML(textSnippet);

  return (
    <>
      <TextBlock text={legalText} />
      <ContactWidget />
    </>
  );
};

export default LegalPage;
