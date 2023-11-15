import { Podcasts } from "../../components/Podcasts/Podcasts";
import { Recommendations } from "../../components/Recommendations/Recommendations";
import { getMetadata, getTextSnippet } from "../../data/content";
import { Markdown } from "../../design-system/Markdown/Markdown";
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

interface Props {
  searchParams: SearchParams;
}

const PodcastPage = async ({ searchParams }: Props) => {
  const text = await getTextSnippet("Podcasts");

  return (
    <>
      <Markdown>{text}</Markdown>
      <Podcasts searchParams={searchParams} />
      <Recommendations />
    </>
  );
};

export default PodcastPage;
