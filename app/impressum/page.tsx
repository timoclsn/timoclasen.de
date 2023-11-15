import { ContactWidget } from "../../components/ContactWidget";
import { MDXContent } from "../../components/MDXContent/MDXContent";
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
      <MDXContent>{text}</MDXContent>
      <ContactWidget />
    </>
  );
};

export default LegalPage;
