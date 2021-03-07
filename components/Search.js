import { Search as SearchIcon } from 'react-feather';

export default function Search({ placeholder, handleChange }) {
    return (
        <div className="relative flex items-center mx-auto mb-10 max-w-prose">
            <input
                aria-label={placeholder}
                type="text"
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 text-base rounded-xl bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 placeholder-dark dark:placeholder-light placeholder-opacity-60 dark:placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-highlight dark:focus:ring-highlight-dark"
            />
            <div className="absolute top-0 right-0 flex items-center justify-center h-full px-4">
                <SearchIcon className="opacity-60" size="16" />
            </div>
        </div>
    );
}