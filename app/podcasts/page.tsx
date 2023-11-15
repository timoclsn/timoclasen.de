import { z } from "zod";
import { Markdown } from "../../components/Markdown/Markdown";
import { PodcastsList } from "../../components/PodcastsList/PodcastsList";
import { Recommendations } from "../../components/Recommendations/Recommendations";
import { getMetadata, getTextSnippet } from "../../data/content";
import { createGenerateMetadata, openGraph } from "../../lib/metadata";
import { SearchParams } from "../../lib/types";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } = await getMetadata("podcasts");

  return {
    title,
    description,
    openGraph: {
      ...openGraph(title, description, slug),
    },
  };
});

const searchParamsSchema = z.object({
  search: z.coerce.string().optional(),
  favorites: z.coerce.boolean().optional(),
  filter: z.coerce.string().optional(),
});

interface Props {
  searchParams?: SearchParams;
}

const PodcastPage = async ({ searchParams }: Props) => {
  const { search, favorites, filter } = searchParamsSchema.parse(searchParams);

  const text = await getTextSnippet("Podcasts");

  return (
    <>
      <Markdown>{text}</Markdown>
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
