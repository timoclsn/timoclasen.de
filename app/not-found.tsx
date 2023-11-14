import { ContactWidget } from "../components/ContactWidget";
import { TextBlock } from "../components/TextBlock";
import { getMetadata, getTextSnippet } from "../data/content";
import { createGenerateMetadata, openGraph } from "../lib/metadata";
import { markdownToHTML } from "../lib/text";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } = await getMetadata("404");

  return {
    title,
    description,
    openGraph: {
      ...openGraph(title, description, slug),
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
