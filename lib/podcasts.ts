import { Podcasts } from "../data/podcasts/podcasts";

/**
 * Returns an array of unique categories sorted alphabetically from the given array of podcasts.
 * @param podcasts - The array of podcasts to extract categories from.
 * @returns An array of unique categories sorted alphabetically.
 */
export const getCategories = (podcasts: Podcasts) =>
  [
    ...Array.from(new Set(podcasts.flatMap((podcast) => podcast.categories))),
  ].sort((a, b) => a.localeCompare(b));
