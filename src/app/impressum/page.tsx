import { query } from "../../api/query";
import { ContactWidget } from "../../components/ContactWidget/ContactWidget";
import { Markdown } from "../../design-system/Markdown/Markdown";
import { createGenerateMetadata, openGraph } from "../../lib/metadata";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } =
    await query.content.metadata("impressum");

  return {
    title,
    description,
    openGraph: {
      ...(await openGraph(title, description, slug)),
    },
  };
});

const LegalPage = async () => {
  const text = await query.content.textSnippet("Impressum & Datenschutz");
  return (
    <>
      <Markdown>{text}</Markdown>
      <ContactWidget />
    </>
  );
};

export default LegalPage;
