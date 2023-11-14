import { ContactWidget } from "../../components/ContactWidget";
import { TextBlock } from "../../components/TextBlock";
import { getMetadata, getTextSnippet } from "../../data/content";
import { createGenerateMetadata, ogImage } from "../../lib/metadata";
import { markdownToHTML } from "../../lib/text";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } = await getMetadata("impressum");

  return {
    title,
    description,
    openGraph: {
      siteName: "Timo Clasen",
      type: "website",
      url: `https://timoclasen.de/${slug}`,
      title,
      description,
      images: {
        url: ogImage({
          name: `${title} • Timo Clasen`,
        }),
        alt: `Teasertext der Seite "${title}" und Profilfoto von Timo Clasen`,
        width: 1200,
        height: 630,
      },
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
