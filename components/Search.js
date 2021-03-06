import { Search as SearchIcon } from 'react-feather';

export default function Search({ placeholder, handleChange }) {
    return (
        <div className="relative flex items-center max-w-prose mx-auto">
            <input
                aria-label={placeholder}
                type="text"
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 placeholder-dark dark:placeholder-light placeholder-opacity-60 dark:placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-highlight dark:focus:ring-highlight-dark rounded-3xl px-4 py-2"
            />
            <div className="absolute top-0 right-0 flex items-center justify-center h-full px-4">
                <SearchIcon className="opacity-60" />
            </div>
        </div>
    );
}
