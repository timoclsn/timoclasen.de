import { ContactWidget } from "../../components/ContactWidget";
import { Markdown } from "../../components/Markdown/Markdown";
import { getMetadata, getTextSnippet } from "../../data/content";
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
