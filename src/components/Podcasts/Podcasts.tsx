import { Suspense } from "react";
import { getCategories } from "../../data/podcasts/podcasts";
import { SearchParams } from "../../lib/types";
import { PodcastFilter } from "./PodcastFilter";
import { PodcastsList } from "./PodcastsList";
import { PodcastsSearch } from "./PodcastsSearch";

interface Props {
  searchParams: SearchParams;
}

export const Podcasts = async ({ searchParams }: Props) => {
  const categories = await getCategories();
  return (
    <div>
      <div className="mx-auto mb-6 max-w-prose">
        <Suspense>
          <PodcastsSearch />
        </Suspense>
      </div>
      <div className="mx-auto mb-16 max-w-prose">
        <Suspense>
          <PodcastFilter categories={categories} />
        </Suspense>
      </div>
      <PodcastsList searchParams={searchParams} />
    </div>
  );
};
