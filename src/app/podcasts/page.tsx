import { query } from "../../api/query";
import { Podcasts } from "../../components/Podcasts/Podcasts";
import { Recommendations } from "../../components/Recommendations/Recommendations";
import { Markdown } from "../../design-system/Markdown/Markdown";
import { createGenerateMetadata, openGraph } from "../../lib/metadata";
import { SearchParams } from "../../lib/types";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } = await query.content.metadata("podcasts");

  return {
    title,
    description,
    openGraph: {
      ...(await openGraph(title, description, slug)),
    },
  };
});

interface Props {
  searchParams: SearchParams;
}

const PodcastPage = async ({ searchParams }: Props) => {
  const text = await query.content.textSnippet("Podcasts");

  return (
    <>
      <Markdown>{text}</Markdown>
      <Podcasts searchParams={searchParams} />
      <Recommendations />
    </>
  );
};

export default PodcastPage;
