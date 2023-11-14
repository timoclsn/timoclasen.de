import { z } from "zod";
import { PodcastsList } from "../../components/PodcastsList/PodcastsList";
import { Recommendations } from "../../components/Recommendations";
import { TextBlock } from "../../components/TextBlock";
import { queryContent } from "../../lib/content";
import { markdownToHTML } from "../../lib/text";

const searchParamsSchema = z.object({
  search: z.coerce.string().optional(),
  favorites: z.coerce.boolean().optional(),
  filter: z.coerce.string().optional(),
});

interface Props {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

const PodcastPage = async ({ searchParams }: Props) => {
  const { search, favorites, filter } = searchParamsSchema.parse(searchParams);

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

  return (
    <>
      <TextBlock text={podcastsText} />
      <PodcastsList
        search={search}
        favorites={favorites}
        filter={filter?.split(";")}
      />
      <Recommendations />
    </>
  );
};

export default PodcastPage;
