import { User } from "lucide-react";
import { matchSorter } from "match-sorter";
import { getCategories, getPodcasts } from "../../data/podcasts/podcasts";
import { MediaPreview } from "../MediaPreview";
import { PodcastFilter } from "./PodcastFilter";
import { PodcastsSearch } from "./PodcastsSearch";

interface Props {
  search?: string;
  favorites?: boolean;
  filter?: Array<string>;
}

export function PodcastsList({
  search = "",
  favorites = false,
  filter = [],
}: Props) {
  const podcasts = getPodcasts();
  const categories = getCategories();

  const filteredPodcast = matchSorter(podcasts, search, {
    keys: ["title", "hosts", "description"],
  }).filter((podcast) => {
    if (podcast.favorite !== favorites) {
      return false;
    }

    return filter.every((category) => podcast.categories.includes(category));
  });

  return (
    <div>
      <div className="mx-auto mb-6 max-w-prose">
        <PodcastsSearch />
      </div>

      <div className="mx-auto mb-16 max-w-prose">
        <PodcastFilter categories={categories} />
      </div>
      <ul className="space-y-20">
        {filteredPodcast.map((podcast) => (
          <li key={podcast.title}>
            <MediaPreview
              title={podcast.title}
              image={`/podcasts/${podcast.image}`}
              BylineIcon={User}
              byline={podcast.hosts}
              subline={podcast.description}
              url={podcast.website}
              favorite={podcast.favorite}
            />
          </li>
        ))}
      </ul>
      {!filteredPodcast.length && (
        <p className="mx-auto max-w-prose">Keinen Podcast gefunden…</p>
      )}
    </div>
  );
}
