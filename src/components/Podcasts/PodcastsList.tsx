import { User } from "lucide-react";
import { matchSorter } from "match-sorter";
import { z } from "zod";
import { getPodcasts } from "../../data/podcasts/podcasts";
import { SearchParams } from "../../lib/types";
import { MediaPreview } from "../MediaPreview/MediaPreview";

const searchParamsSchema = z.object({
  search: z.coerce.string().optional().default(""),
  favorites: z.coerce.boolean().optional().default(false),
  filter: z.coerce
    .string()
    .optional()
    .transform((value) => (value ? value.split(";") : [])),
});

interface Props {
  searchParams: SearchParams;
}

export const PodcastsList = ({ searchParams }: Props) => {
  const { search, favorites, filter } = searchParamsSchema.parse(searchParams);
  const podcasts = getPodcasts();

  const filteredPodcast = matchSorter(podcasts, search, {
    keys: ["title", "hosts", "description"],
  }).filter((podcast) => {
    if (podcast.favorite !== favorites) {
      return false;
    }

    return filter.every((category) => podcast.categories.includes(category));
  });
  return (
    <>
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
    </>
  );
};
