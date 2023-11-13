import { z } from "zod";
import { queryContent } from "../../lib/content";
import { markdownToHTML } from "../../lib/text";
import { Dashboard } from "./Dashboard/Dashboard";
import { BalconyControl } from "./BalconyControl/BalconyControl";

export const SmartHomeWidget = async () => {
  const [textData, footnoteData] = await Promise.all([
    queryContent(
      `{
        textSnippetCollection(where: {title: "Smart Home Widget"}, limit: 1, preview: false) {
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
    ),
    queryContent(
      `{
        textSnippetCollection(where: {title: "Smart Home Widget Footnote"}, limit: 1, preview: false) {
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
    ),
  ]);

  const text = await markdownToHTML(
    textData.data.textSnippetCollection.items[0].content,
  );
  const footnote = await markdownToHTML(
    footnoteData.data.textSnippetCollection.items[0].content,
  );

  return (
    <section id="smarthome">
      <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
        Smart Home
      </h2>
      <div className="mb-8" dangerouslySetInnerHTML={{ __html: text }} />
      <Dashboard />
      <div
        className="my-8 text-sm opacity-60"
        dangerouslySetInnerHTML={{ __html: footnote }}
      />
      <BalconyControl />
    </section>
  );
};
