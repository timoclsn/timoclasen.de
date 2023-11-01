import { matchSorter } from 'match-sorter';
import { startTransition, useReducer } from 'react';
import { User } from 'react-feather';

import type { Podcast as PodcastType } from '../lib/podcasts';
import { MediaPreview } from './MediaPreview';
import { PodcastFilter } from './PodcastFilter';
import { Search } from './Search';

export type PodcastsListFilter = {
  favorites: boolean;
  categories: {
    [key: string]: boolean;
  };
};

interface State {
  inputValue: string;
  searchQuery: string;
  filter: PodcastsListFilter;
}

type Action =
  | { type: 'changeInputValue'; payload: { inputValue: string } }
  | { type: 'search' }
  | { type: 'filter'; payload: { filter: PodcastsListFilter } }
  | { type: 'resetFilter'; payload: { initialFilter: PodcastsListFilter } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'changeInputValue':
      return {
        ...state,
        inputValue: action.payload.inputValue,
      };
    case 'search':
      return {
        ...state,
        searchQuery: state.inputValue,
      };
    case 'filter':
      return {
        ...state,
        filter: action.payload.filter,
      };
    case 'resetFilter':
      return {
        ...state,
        filter: action.payload.initialFilter,
      };
    default:
      throw new Error('Unknown action type');
  }
};

interface Props {
  podcasts: PodcastType[];
}

export function PodcastsList({ podcasts }: Props) {
  const categories = [
    ...Array.from(new Set(podcasts.flatMap((podcast) => podcast.categories))),
  ];

  const sortedCategories = categories.sort((a, b) => a.localeCompare(b));

  const categoriesObj = sortedCategories.reduce(
    (acc, category) => ({ ...acc, [category]: false }),
    {} as { [key: string]: boolean },
  );

  const initialState: State = {
    inputValue: '',
    searchQuery: '',
    filter: {
      favorites: false,
      categories: categoriesObj,
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { filter, inputValue, searchQuery } = state;

  const filteredPodcast = matchSorter(podcasts, searchQuery, {
    keys: ['title', 'hosts', 'description'],
  }).filter((podcast) => {
    const filteredCategories = [];

    for (const category in filter.categories) {
      if (filter.categories[category]) {
        filteredCategories.push(category);
      }
    }

    if (!filter.favorites && !filteredCategories.length) {
      return true;
    }

    if (filter.favorites && !filteredCategories.length) {
      return filter.favorites === podcast.favorite;
    }

    if (filteredCategories.length) {
      const showPodcast = filteredCategories.every((category) =>
        podcast.categories.includes(category),
      );

      return filter.favorites ? showPodcast && podcast.favorite : showPodcast;
    }

    return false;
  });

  return (
    <div>
      <div className="mx-auto mb-6 max-w-prose">
        <Search
          placeholder="Podcasts durchsuchen"
          handleChange={(e) => {
            dispatch({
              type: 'changeInputValue',
              payload: {
                inputValue: e.target.value,
              },
            });
            startTransition(() => {
              dispatch({
                type: 'search',
              });
            });
          }}
          handleBlur={() => {
            splitbee.track('Podcast Search', {
              search: inputValue,
            });
          }}
        />
      </div>

      <div className="mx-auto mb-16 max-w-prose">
        <PodcastFilter
          filter={filter}
          handleChange={(e) => {
            if (e.target.name.includes('Favoriten')) {
              dispatch({
                type: 'filter',
                payload: {
                  filter: {
                    ...filter,
                    favorites: e.target.checked,
                  },
                },
              });
            } else {
              dispatch({
                type: 'filter',
                payload: {
                  filter: {
                    favorites: filter.favorites,
                    categories: {
                      ...filter.categories,
                      [e.target.name]: e.target.checked,
                    },
                  },
                },
              });
            }

            splitbee.track('Podcast Filter', filter);
          }}
          clearFilter={() => {
            dispatch({
              type: 'resetFilter',
              payload: {
                initialFilter: initialState.filter,
              },
            });
          }}
        />
      </div>
      <ul className="space-y-20">
        {filteredPodcast.map((podcast) => (
          <li key={podcast.title}>
            <MediaPreview
              title={podcast.title}
              image={`/podcasts/${podcast.image}`}
              BylineIcon={User}
              byline={podcast.hosts}
              subline={podcast.description}
              url={podcast.website}
              favorite={podcast.favorite}
            />
          </li>
        ))}
      </ul>
      {!filteredPodcast.length && (
        <p className="mx-auto max-w-prose">Keinen Podcast gefunden…</p>
      )}
    </div>
  );
}
