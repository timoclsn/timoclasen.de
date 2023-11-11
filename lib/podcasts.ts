import { readFileSync } from "fs";

export interface Podcast {
  title: string;
  favorite: boolean;
  feed: string;
  description: string;
  website: string;
  hosts: string;
  image: string;
  categories: string[];
}

export function getPodcasts(): Podcast[] {
  return JSON.parse(readFileSync("./data/podcasts.json", "utf-8"));
}

export function getFavoritePodcasts() {
  const podcasts = getPodcasts();
  return podcasts.filter((podcast) => podcast.favorite);
}
