import { ContactWidget } from "../components/ContactWidget";
import { MDXContent } from "../components/MDXContent/MDXContent";
import { getMetadata, getTextSnippet } from "../data/content";
import { createGenerateMetadata, openGraph } from "../lib/metadata";

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
  const text = await getTextSnippet("Error 404");
  return (
    <>
      <MDXContent>{text}</MDXContent>
      <ContactWidget />
    </>
  );
};

export default NotFoundPage;
