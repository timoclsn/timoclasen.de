import { Filter } from 'react-feather';

export default function PodcastFilter({ filter, handleChange }) {
    return (
        <div className="flex space-x-4">
            <div className="flex items-center justify-center space-x-2 text-base opacity-60">
                <Filter size={16} />
                <span>Filter:</span>
            </div>
            <label
                className={`flex items-center justify-center cursor-pointer select-none px-2 py-0.5 text-base rounded-lg focus:outline-none ring-2 ring-highlight dark:ring-highlight-dark ${
                    filter.favorites
                        ? 'text-light bg-highlight dark:bg-highlight-dark'
                        : 'text-highlight dark:text-highlight-dark'
                }`}>
                <input
                    className="hidden"
                    type="checkbox"
                    checked={filter.favorites}
                    onChange={handleChange}
                    name="Meine Favoriten"
                />
                Meine Favoriten
            </label>
        </div>
    );
}
