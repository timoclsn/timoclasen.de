import { readFile } from "fs/promises";
import { join as pathJoin } from "path";
import { cache } from "react";
import "server-only";
import { z } from "zod";

const podcastsPath = pathJoin(
  process.cwd() + "/src/data/podcasts/podcasts.json",
);
console.log(podcastsPath);

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

export type Podcasts = Awaited<ReturnType<typeof getPodcasts>>;

export const getPodcasts = cache(async () => {
  const data = await readFile(podcastsPath, "utf-8");
  const podcasts = JSON.parse(data);
  return z.array(podcastSchema).parse(podcasts);
});

export const getFavoritePodcasts = async () => {
  const podcasts = await getPodcasts();
  return podcasts.filter((podcast) => podcast.favorite);
};

export const getCategories = async () => {
  const podcasts = await getPodcasts();
  return [
    ...Array.from(new Set(podcasts.flatMap((podcast) => podcast.categories))),
  ].sort((a, b) => a.localeCompare(b));
};
