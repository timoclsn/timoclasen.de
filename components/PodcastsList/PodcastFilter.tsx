"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, type ChangeEvent } from "react";
import { Filter, XCircle } from "react-feather";

interface Props {
  categories: Array<string>;
}

export const PodcastFilter = ({ categories }: Props) => {
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const nextSearchParams = useSearchParams();
  const searchParams = new URLSearchParams(nextSearchParams.toString());

  const filterSearchParam = searchParams.get("filter");
  const filter = filterSearchParam ? filterSearchParam.split(";") : [];
  const favorites = searchParams.get("favorites") || "";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.checked;

    if (name === "favorites") {
      if (value) {
        searchParams.set("favorites", "true");
      } else {
        searchParams.delete("favorites");
      }
    } else {
      if (value) {
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

    startTransition(() => {
      const searchParamsString = searchParams.toString();
      replace(
        `${pathname}${searchParamsString ? "?" : ""}${searchParamsString}`,
        {
          scroll: false,
        },
      );
    });
  };

  const clearFilter = () => {
    searchParams.delete("filter");
    searchParams.delete("favorites");

    startTransition(() => {
      const searchParamsString = searchParams.toString();
      replace(
        `${pathname}${searchParamsString ? "?" : ""}${searchParamsString}`,
        {
          scroll: false,
        },
      );
    });
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
            favorites === "true"
              ? "bg-highlight text-light focus-within:ring-dark dark:bg-highlight-dark dark:focus-within:ring-light"
              : "text-highlight focus-within:ring-dark dark:text-highlight-dark dark:focus-within:ring-light"
          }`}
        >
          <input
            key={String(favorites === "true")}
            className="h-0 w-0 opacity-0"
            type="checkbox"
            defaultChecked={favorites === "true"}
            onChange={handleChange}
            name="favorites"
            disabled={isPending}
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
                key={String(filter.includes(category))}
                className="h-0 w-0 opacity-0"
                type="checkbox"
                defaultChecked={isActive}
                onChange={handleChange}
                name={category}
                disabled={isPending}
              />
              {category}
            </label>
          );
        })}
      </div>
      <button
        title="Filter löschen"
        className="text-highlight disabled:opacity-60 dark:text-highlight-dark"
        onClick={() => {
          clearFilter();
        }}
        disabled={nextSearchParams.toString() === "" || isPending}
      >
        <XCircle size={24} />
        <span className="sr-only">Filter löschen</span>
      </button>
    </div>
  );
};
