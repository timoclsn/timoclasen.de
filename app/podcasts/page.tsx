import { z } from "zod";
import { PodcastsList } from "../../components/PodcastsList/PodcastsList";
import { Recommendations } from "../../components/Recommendations/Recommendations";
import { TextBlock } from "../../components/TextBlock";
import { getMetadata, getTextSnippet } from "../../data/content";
import { createGenerateMetadata, ogImage } from "../../lib/metadata";
import { markdownToHTML } from "../../lib/text";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } = await getMetadata("podcasts");

  return {
    title,
    description,
    openGraph: {
      siteName: "Timo Clasen",
      type: "website",
      url: `https://timoclasen.de/${slug}`,
      title,
      description,
      images: {
        url: ogImage({
          name: `${title} • Timo Clasen`,
        }),
        alt: `Teasertext der Seite "${title}" und Profilfoto von Timo Clasen`,
        width: 1200,
        height: 630,
      },
    },
  };
});

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

  const textSnippet = await getTextSnippet("Podcasts");
  const podcastsText = await markdownToHTML(textSnippet);

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
