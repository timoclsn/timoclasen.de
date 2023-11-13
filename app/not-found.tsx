import { z } from "zod";
import { ContactWidget } from "../components/ContactWidget";
import { TextBlock } from "../components/TextBlock";
import { queryContent } from "../lib/content";
import { markdownToHTML } from "../lib/text";

const NotFoundPage = async () => {
  const errorSnippetData = await queryContent(
    `{
    textSnippetCollection(where: {title: "Error 404"}, limit: 1, preview: false) {
      items {
        content
      }
    }
  }`,
    z.object({
      data: z.object({
        textSnippetCollection: z.object({
          items: z.array(
            z.object({
              content: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  const error = await markdownToHTML(
    errorSnippetData.data.textSnippetCollection.items[0].content,
  );
  return (
    <>
      <TextBlock text={error} />
      <ContactWidget />
    </>
  );
};

export default NotFoundPage;
