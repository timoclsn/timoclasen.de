"use client";

import { ChangeEvent } from "react";
import { Loader, Search as SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "../../hooks/useSearchParams";
import { track } from "../../lib/tracking";

export const PodcastsSearch = () => {
  const { searchParams, updateUrlLWithSearchParams, isPending } =
    useSearchParams();
  const search = searchParams.get("search") ?? "";

  const handleChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;
      searchParams.set("search", search);
      updateUrlLWithSearchParams();
      track("Podcast Search", {
        search,
      });
    },
    500,
  );

  return (
    <div className="relative flex w-full items-center">
      <label htmlFor="search" className="sr-only">
        Search Podcasts:
      </label>
      <input
        key={search}
        name="search"
        type="text"
        defaultValue={search}
        placeholder="Podcasts durchsuchen"
        onChange={handleChange}
        autoComplete="off"
        className="w-full rounded-xl bg-dark bg-opacity-10 px-4 py-2 text-base placeholder-dark placeholder-opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight dark:bg-light dark:bg-opacity-10 dark:placeholder-light dark:placeholder-opacity-60 dark:focus-visible:ring-highlight-dark"
      />
      <div className="absolute right-0 top-0 flex h-full items-center justify-center px-4">
        {isPending ? (
          <Loader className="animate-spin opacity-60" size="16" />
        ) : (
          <SearchIcon className="opacity-60" size="16" />
        )}
      </div>
    </div>
  );
};
