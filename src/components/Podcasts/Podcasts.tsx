import { query } from "../../api/query";
import { SearchParams } from "../../lib/types";
import { PodcastFilter } from "./PodcastFilter";
import { PodcastsList } from "./PodcastsList";
import { PodcastsSearch } from "./PodcastsSearch";

interface Props {
  searchParams: SearchParams;
}

export const Podcasts = async ({ searchParams }: Props) => {
  const categories = await query.podcasts.categories();
  return (
    <div>
      <div className="mx-auto mb-6 max-w-prose">
        <PodcastsSearch />
      </div>
      <div className="mx-auto mb-16 max-w-prose">
        <PodcastFilter categories={categories} />
      </div>
      <PodcastsList searchParams={searchParams} />
    </div>
  );
};
