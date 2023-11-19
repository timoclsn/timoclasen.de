import { User } from "lucide-react";
import { matchSorter } from "match-sorter";
import { z } from "zod";
import { query } from "../../api/query";
import { SearchParams } from "../../lib/types";
import { AutoAnimate } from "../AutoAnimate/AutoAnimate";
import { MediaPreview } from "../MediaPreview/MediaPreview";
import { ShowMoreButton } from "./ShowMoreButton";

const searchParamsSchema = z.object({
  search: z.coerce.string().optional().default(""),
  favorites: z.coerce.boolean().optional().default(false),
  filter: z.coerce
    .string()
    .optional()
    .transform((value) => (value ? value.split(";") : [])),
  limit: z.coerce.number().optional().default(10),
});

interface Props {
  searchParams: SearchParams;
}

export const PodcastsList = async ({ searchParams }: Props) => {
  const { search, favorites, filter, limit } =
    searchParamsSchema.parse(searchParams);
  const podcasts = await query.podcasts.allPodcasts();

  const filteredPodcast = matchSorter(podcasts, search, {
    keys: ["title", "hosts", "description"],
  }).filter((podcast) => {
    if (podcast.favorite !== favorites) {
      return false;
    }

    return filter.every((category) => podcast.categories.includes(category));
  });

  const podcastsToDisplay = filteredPodcast.slice(0, limit);
  const noPodcastsFound = !podcastsToDisplay.length;
  const showShowMoreBtn = filteredPodcast.length > limit;

  return (
    <>
      <AutoAnimate as="ul" className="space-y-20">
        {podcastsToDisplay.map((podcast) => (
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
      </AutoAnimate>
      {noPodcastsFound && (
        <p className="mx-auto max-w-prose">Keinen Podcast gefunden…</p>
      )}
      {showShowMoreBtn && (
        <div className="my-12 flex items-center justify-center">
          <ShowMoreButton />
        </div>
      )}
    </>
  );
};
