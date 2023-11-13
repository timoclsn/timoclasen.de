import { z } from "zod";
import { queryContent } from "../../lib/content";
import { TextBlock } from "../../components/TextBlock";
import { ContactWidget } from "../../components/ContactWidget";
import { NowPlaying } from "../../components/NowPlaying";
import { TopMusic } from "../../components/TopMusic";
import { markdownToHTML } from "../../lib/text";

const MusicPage = async () => {
  const musicSnippetData = await queryContent(
    `{
    textSnippetCollection(where: {title: "Music"}, limit: 1, preview: false) {
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

  const musicText = await markdownToHTML(
    musicSnippetData.data.textSnippetCollection.items[0].content,
  );
  return (
    <>
      <TextBlock text={musicText} />
      <TopMusic />
      <NowPlaying />
      <ContactWidget />
    </>
  );
};

export default MusicPage;
