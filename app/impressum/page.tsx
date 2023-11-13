import { z } from "zod";
import { ContactWidget } from "../../components/ContactWidget";
import { TextBlock } from "../../components/TextBlock";
import { queryContent } from "../../lib/content";
import { markdownToHTML } from "../../lib/text";

const LegalPage = async () => {
  const legalSnippetData = await queryContent(
    `{
        textSnippetCollection(where: {title: "Impressum & Datenschutz"}, limit: 1, preview: false) {
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

  const legal = await markdownToHTML(
    legalSnippetData.data.textSnippetCollection.items[0].content,
  );
  return (
    <>
      <TextBlock text={legal} />
      <ContactWidget />
    </>
  );
};

export default LegalPage;
