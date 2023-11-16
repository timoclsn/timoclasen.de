import { ContactWidget } from "../../components/ContactWidget/ContactWidget";
import { getMetadata, getTextSnippet } from "../../data/content";
import { Markdown } from "../../design-system/Markdown/Markdown";
import { createGenerateMetadata, openGraph } from "../../lib/metadata";

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
  const text = await getTextSnippet("Impressum & Datenschutz");
  return (
    <>
      <Markdown>{text}</Markdown>
      <ContactWidget />
    </>
  );
};

export default LegalPage;
