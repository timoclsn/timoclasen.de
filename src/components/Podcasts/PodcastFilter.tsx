"use client";

import { Filter, Loader2, XCircle } from "lucide-react";
import { useOptimistic, type ChangeEvent } from "react";
import { useSearchParams } from "../../hooks/useSearchParams";
import { track } from "../../lib/tracking";

interface Props {
  categories: Array<string>;
}

export const PodcastFilter = ({ categories }: Props) => {
  const {
    searchParamsString,
    getSearchParam,
    setSearchParam,
    deleteSearchParam,
    updateSearchParams,
    isPending,
  } = useSearchParams();

  const filterRaw = getSearchParam("filter");
  const filter = filterRaw ? filterRaw.split(";") : [];
  const favorites = Boolean(getSearchParam("favorites"));

  const [optimisticFilter, setOptimisticFilter] = useOptimistic(filter);
  const [optimisticFavourites, setOptimisticFavourites] =
    useOptimistic(favorites);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const checked = event.target.checked;

    if (name === "favorites") {
      if (checked) {
        setSearchParam("favorites", "true");
      } else {
        deleteSearchParam("favorites");
      }
    } else {
      if (checked) {
        filter.push(name);
      } else {
        filter.splice(filter.indexOf(name), 1);
      }

      if (filter.length) {
        setSearchParam("filter", filter.join(";"));
      } else {
        deleteSearchParam("filter");
      }
    }

    updateSearchParams({
      onStartTransition: () => {
        if (name === "favorites") {
          if (checked) {
            setOptimisticFavourites(() => true);
          } else {
            setOptimisticFavourites(() => false);
          }
        } else {
          if (checked) {
            setOptimisticFilter((filter) => [...filter, name]);
          } else {
            setOptimisticFilter((filter) =>
              filter.filter((item) => item !== name),
            );
          }
        }
      },
    });

    track("Podcast Filter", {
      name,
      checked,
    });
  };

  const clearFilter = () => {
    deleteSearchParam("search");
    deleteSearchParam("favorites");
    deleteSearchParam("filter");
    deleteSearchParam("limit");

    updateSearchParams({
      onStartTransition: () => {
        setOptimisticFavourites(false);
        setOptimisticFilter([]);
      },
    });

    track("Clear Podcast Filter");
  };

  return (
    <div className="flex gap-4">
      <div className="flex items-center justify-center gap-2 text-base opacity-60">
        <Filter size={16} />
        <span>Filter:</span>
      </div>
      <div className="-my-4 flex gap-4 overflow-x-auto px-1 py-4">
        <label
          className={`sflex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-lg px-2 py-0.5 text-base ring-2 ring-highlight focus-visible:outline-none dark:ring-highlight-dark ${
            optimisticFavourites
              ? "bg-highlight text-light focus-within:ring-dark dark:bg-highlight-dark dark:focus-within:ring-light"
              : "text-highlight focus-within:ring-dark dark:text-highlight-dark dark:focus-within:ring-light"
          }`}
        >
          <input
            key={String(optimisticFavourites)}
            name="favorites"
            type="checkbox"
            defaultChecked={optimisticFavourites}
            onChange={handleChange}
            disabled={isPending}
            className="h-0 w-0 opacity-0"
          />
          Meine Favoriten
        </label>
        {categories.map((category, index) => {
          const isActive = optimisticFilter.includes(category);
          return (
            <label
              key={index}
              className={`flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-lg px-2 py-0.5 text-base ring-2 ring-highlight focus-visible:outline-none dark:ring-highlight-dark ${
                isActive
                  ? "bg-highlight text-light focus-within:ring-dark dark:bg-highlight-dark dark:focus-within:ring-light"
                  : "text-highlight focus-within:ring-dark dark:text-highlight-dark dark:focus-within:ring-light"
              }`}
            >
              <input
                key={String(isActive)}
                name={category}
                type="checkbox"
                defaultChecked={isActive}
                onChange={handleChange}
                disabled={isPending}
                className="h-0 w-0 opacity-0"
              />
              {category}
            </label>
          );
        })}
      </div>
      {isPending ? (
        <Loader2 className="flex-none animate-spin text-highlight opacity-60 dark:text-highlight-dark" />
      ) : (
        <button
          title="Filter löschen"
          className="text-highlight disabled:opacity-60 dark:text-highlight-dark"
          onClick={clearFilter}
          disabled={!searchParamsString}
        >
          <XCircle size={24} />
          <span className="sr-only">Filter löschen</span>
        </button>
      )}
    </div>
  );
};
