"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useTransition } from "react";
import { Loader, Search as SearchIcon } from "react-feather";
import { useDebouncedCallback } from "use-debounce";

export const PodcastsSearch = () => {
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const nextSearchParams = useSearchParams();
  const searchParams = new URLSearchParams(nextSearchParams.toString());
  const search = searchParams.get("search");

  const handleChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;

      if (!search) {
        startTransition(() => {
          replace(pathname, {
            scroll: false,
          });
        });
        return;
      }

      searchParams.set("search", search);

      startTransition(() => {
        replace(`${pathname}?${searchParams}`, {
          scroll: false,
        });
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
        defaultValue={search ?? ""}
        name="search"
        type="text"
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
