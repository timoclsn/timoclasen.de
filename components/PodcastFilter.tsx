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
      <div className="flex px-1 py-4 -my-4 space-x-4 overflow-x-auto">
        <label
          className={`whitespace-nowrap sflex items-center justify-center cursor-pointer select-none px-2 py-0.5 text-base rounded-lg focus:outline-none ring-2 ring-highlight dark:ring-highlight-dark ${
            filter.favorites
              ? 'text-light bg-highlight dark:bg-highlight-dark focus-within:ring-dark dark:focus-within:ring-light'
              : 'text-highlight dark:text-highlight-dark focus-within:ring-dark dark:focus-within:ring-light'
          }`}
        >
          <input
            className="w-0 h-0 opacity-0"
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
            className={`whitespace-nowrap sflex items-center justify-center cursor-pointer select-none px-2 py-0.5 text-base rounded-lg focus:outline-none ring-2 ring-highlight dark:ring-highlight-dark ${
              filter.categories[category]
                ? 'text-light bg-highlight dark:bg-highlight-dark focus-within:ring-dark dark:focus-within:ring-light'
                : 'text-highlight dark:text-highlight-dark focus-within:ring-dark dark:focus-within:ring-light'
            }`}
          >
            <input
              className="w-0 h-0 opacity-0"
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
        className="text-highlight dark:text-highlight-dark disabled:opacity-60"
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
