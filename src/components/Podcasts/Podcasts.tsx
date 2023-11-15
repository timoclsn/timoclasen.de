import { getCategories } from "../../data/podcasts/podcasts";
import { PodcastFilter } from "./PodcastFilter";
import { PodcastsList } from "./PodcastsList";
import { PodcastsSearch } from "./PodcastsSearch";

interface Props {
  search?: string;
  favorites?: boolean;
  filter?: Array<string>;
}

export const Podcasts = ({
  search = "",
  favorites = false,
  filter = [],
}: Props) => {
  const categories = getCategories();
  return (
    <div>
      <div className="mx-auto mb-6 max-w-prose">
        <PodcastsSearch />
      </div>

      <div className="mx-auto mb-16 max-w-prose">
        <PodcastFilter categories={categories} />
      </div>
      <PodcastsList search={search} favorites={favorites} filter={filter} />
    </div>
  );
};
