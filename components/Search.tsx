import type { ChangeEvent } from "react";
import { Search as SearchIcon } from "react-feather";

interface Props {
  placeholder: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Search({ placeholder, handleChange, handleBlur }: Props) {
  return (
    <div className="relative flex w-full items-center">
      <input
        aria-label={placeholder}
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="w-full rounded-xl bg-dark bg-opacity-10 px-4 py-2 text-base placeholder-dark placeholder-opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight dark:bg-light dark:bg-opacity-10 dark:placeholder-light dark:placeholder-opacity-60 dark:focus-visible:ring-highlight-dark"
      />
      <div className="absolute top-0 right-0 flex h-full items-center justify-center px-4">
        <SearchIcon className="opacity-60" size="16" />
      </div>
    </div>
  );
}
