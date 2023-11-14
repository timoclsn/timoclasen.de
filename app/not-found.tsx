import { ContactWidget } from "../components/ContactWidget";
import { TextBlock } from "../components/TextBlock";
import { getMetadata, getTextSnippet } from "../data/content";
import { createGenerateMetadata, ogImage } from "../lib/metadata";
import { markdownToHTML } from "../lib/text";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } = await getMetadata("404");

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

const NotFoundPage = async () => {
  const textSnippet = await getTextSnippet("Error 404");
  const errorText = await markdownToHTML(textSnippet);

  return (
    <>
      <TextBlock text={errorText} />
      <ContactWidget />
    </>
  );
};

export default NotFoundPage;
