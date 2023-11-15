"use client";

import { type ChangeEvent } from "react";
import { Filter, Loader, XCircle } from "lucide-react";
import { useSearchParams } from "../../hooks/useSearchParams";
import { track } from "../../lib/tracking";

interface Props {
  categories: Array<string>;
}

export const PodcastFilter = ({ categories }: Props) => {
  const { searchParams, updateUrlLWithSearchParams, isPending } =
    useSearchParams();

  const filterRaw = searchParams.get("filter");
  const filter = filterRaw ? filterRaw.split(";") : [];
  const favorites = Boolean(searchParams.get("favorites"));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const checked = event.target.checked;

    if (name === "favorites") {
      if (checked) {
        searchParams.set("favorites", "true");
      } else {
        searchParams.delete("favorites");
      }
    } else {
      if (checked) {
        filter.push(name);
      } else {
        filter.splice(filter.indexOf(name), 1);
      }

      if (filter.length) {
        searchParams.set("filter", filter.join(";"));
      } else {
        searchParams.delete("filter");
      }
    }

    updateUrlLWithSearchParams();

    track("Podcast Filter", {
      name,
      checked,
    });
  };

  const clearFilter = () => {
    searchParams.delete("search");
    searchParams.delete("favorites");
    searchParams.delete("filter");
    updateUrlLWithSearchParams();
    track("Clear Podcast Filter");
  };

  return (
    <div className="flex space-x-4">
      <div className="flex items-center justify-center space-x-2 text-base opacity-60">
        <Filter size={16} />
        <span>Filter:</span>
      </div>
      <div className="-my-4 flex space-x-4 overflow-x-auto px-1 py-4">
        <label
          className={`sflex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-lg px-2 py-0.5 text-base ring-2 ring-highlight focus-visible:outline-none dark:ring-highlight-dark ${
            favorites
              ? "bg-highlight text-light focus-within:ring-dark dark:bg-highlight-dark dark:focus-within:ring-light"
              : "text-highlight focus-within:ring-dark dark:text-highlight-dark dark:focus-within:ring-light"
          }`}
        >
          <input
            key={String(favorites)}
            name="favorites"
            type="checkbox"
            defaultChecked={favorites}
            onChange={handleChange}
            disabled={isPending}
            className="h-0 w-0 opacity-0"
          />
          Meine Favoriten
        </label>
        {categories.map((category, index) => {
          const isActive = filter.includes(category);
          return (
            <label
              key={index}
              className={`sflex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-lg px-2 py-0.5 text-base ring-2 ring-highlight focus-visible:outline-none dark:ring-highlight-dark ${
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
        <Loader className="flex-none animate-spin text-highlight opacity-60 dark:text-highlight-dark" />
      ) : (
        <button
          title="Filter löschen"
          className="text-highlight disabled:opacity-60 dark:text-highlight-dark"
          onClick={clearFilter}
          disabled={searchParams.toString() === ""}
        >
          <XCircle size={24} />
          <span className="sr-only">Filter löschen</span>
        </button>
      )}
    </div>
  );
};
