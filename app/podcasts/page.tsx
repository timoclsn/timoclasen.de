import { z } from "zod";
import { PodcastsList } from "../../components/PodcastsList";
import { Recommendations } from "../../components/Recommendations";
import { TextBlock } from "../../components/TextBlock";
import { getPodcasts } from "../../data/podcasts/podcasts";
import { queryContent } from "../../lib/content";
import { markdownToHTML } from "../../lib/text";

const PodcastPage = async () => {
  const podcastsSnippetData = await queryContent(
    `{
        textSnippetCollection(where: {title: "Podcasts"}, limit: 1, preview: false) {
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

  const podcastsText = await markdownToHTML(
    podcastsSnippetData.data.textSnippetCollection.items[0].content,
  );

  const podcasts = getPodcasts();

  return (
    <>
      <TextBlock text={podcastsText} />
      <PodcastsList podcasts={podcasts} />
      <Recommendations />
    </>
  );
};

export default PodcastPage;
