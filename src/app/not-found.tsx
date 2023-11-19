import { query } from "../api/query";
import { ContactWidget } from "../components/ContactWidget/ContactWidget";
import { Markdown } from "../design-system/Markdown/Markdown";
import { createGenerateMetadata, openGraph } from "../lib/metadata";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } = await query.content.getMetadata("404");

  return {
    title,
    description,
    openGraph: {
      ...(await openGraph(title, description, slug)),
    },
  };
});

const NotFoundPage = async () => {
  const text = await query.content.getTextSnippet("Error 404");
  return (
    <>
      <Markdown>{text}</Markdown>
      <ContactWidget />
    </>
  );
};

export default NotFoundPage;
