import type { ChangeEvent } from 'react';
import { Filter, XCircle } from 'react-feather';

interface Filter {
  favorites: boolean;
  categories: { [key: string]: boolean };
}

interface Props {
  filter: Filter;
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
  clearFilter(): void;
}

export function PodcastFilter({ filter, handleChange, clearFilter }: Props) {
  const filteredCategories = [];

  for (const category in filter.categories) {
    if (filter.categories[category]) {
      filteredCategories.push(category);
    }
  }

  return (
    <div className="flex space-x-4">
      <div className="flex items-center justify-center space-x-2 text-base opacity-60">
        <Filter size={16} />
        <span>Filter:</span>
      </div>
      <div className="-my-4 flex space-x-4 overflow-x-auto px-1 py-4">
        <label
          className={`sflex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-lg px-2 py-0.5 text-base ring-2 ring-highlight focus:outline-none dark:ring-highlight-dark ${
            filter.favorites
              ? 'bg-highlight text-light focus-within:ring-dark dark:bg-highlight-dark dark:focus-within:ring-light'
              : 'text-highlight focus-within:ring-dark dark:text-highlight-dark dark:focus-within:ring-light'
          }`}
        >
          <input
            className="h-0 w-0 opacity-0"
            type="checkbox"
            checked={filter.favorites}
            onChange={handleChange}
            name="Meine Favoriten"
          />
          Meine Favoriten
        </label>
        {Object.keys(filter.categories).map((category, index) => (
          <label
            key={index}
            className={`sflex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-lg px-2 py-0.5 text-base ring-2 ring-highlight focus:outline-none dark:ring-highlight-dark ${
              filter.categories[category]
                ? 'bg-highlight text-light focus-within:ring-dark dark:bg-highlight-dark dark:focus-within:ring-light'
                : 'text-highlight focus-within:ring-dark dark:text-highlight-dark dark:focus-within:ring-light'
            }`}
          >
            <input
              className="h-0 w-0 opacity-0"
              type="checkbox"
              checked={filter.categories[category]}
              onChange={handleChange}
              name={category}
            />
            {category}
          </label>
        ))}
      </div>
      <button
        title="Filter löschen"
        className="text-highlight disabled:opacity-60 dark:text-highlight-dark"
        onClick={() => {
          clearFilter();
        }}
        disabled={!filter.favorites && !filteredCategories.length}
      >
        <XCircle size={24} />
        <span className="sr-only">Filter löschen</span>
      </button>
    </div>
  );
}
