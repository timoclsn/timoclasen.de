import { z } from "zod";
import { queryContent } from "../../lib/content";
import { markdownToHTML } from "../../lib/text";
import styles from "./Teaser.module.css";

export const Teaser = async () => {
  const headerSnippetData = await queryContent(
    `{
      textSnippetCollection(where: {title: "Frontpage Header"}, limit: 1, preview: false) {
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

  const headerText =
    headerSnippetData.data.textSnippetCollection.items[0].content;
  const text = await markdownToHTML(headerText);

  return (
    <section
      className={styles.textTeaser}
      data-cy="home-page-teaser"
      dangerouslySetInnerHTML={{ __html: text }}
    ></section>
  );
};
