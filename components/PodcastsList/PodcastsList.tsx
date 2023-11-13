import { matchSorter } from "match-sorter";
import { User } from "react-feather";
import { getPodcasts } from "../../data/podcasts/podcasts";
import { MediaPreview } from "../MediaPreview";
import { PodcastFilter } from "./PodcastFilter";
import { PodcastsSearch } from "./PodcastsSearch";
import { Suspense } from "react";

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

  const categories = [
    ...Array.from(new Set(podcasts.flatMap((podcast) => podcast.categories))),
  ];

  const sortedCategories = categories.sort((a, b) => a.localeCompare(b));

  const filteredPodcast = matchSorter(podcasts, search, {
    keys: ["title", "hosts", "description"],
  }).filter((podcast) => {
    if (podcast.favorite !== favorites) {
      return false;
    }

    const showPodcast = filter.every((category) =>
      podcast.categories.includes(category),
    );

    return showPodcast;
  });

  return (
    <div>
      <div className="mx-auto mb-6 max-w-prose">
        <Suspense>
          <PodcastsSearch />
        </Suspense>
      </div>

      <div className="mx-auto mb-16 max-w-prose">
        <Suspense>
          <PodcastFilter categories={sortedCategories} />
        </Suspense>
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
