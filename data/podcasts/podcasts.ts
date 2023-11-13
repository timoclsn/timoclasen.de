import "server-only";

import { readFileSync } from "fs";
import { z } from "zod";

const podcastSchema = z.object({
  title: z.string(),
  favorite: z.boolean(),
  feed: z.string(),
  description: z.string(),
  website: z.string(),
  hosts: z.string(),
  image: z.string(),
  categories: z.array(z.string()),
});

export const getPodcasts = () => {
  const podcasts = JSON.parse(
    readFileSync("./data/podcasts/podcasts.json", "utf-8"),
  );
  return z.array(podcastSchema).parse(podcasts);
};

export const getFavoritePodcasts = () => {
  const podcasts = getPodcasts();
  return podcasts.filter((podcast) => podcast.favorite);
};
