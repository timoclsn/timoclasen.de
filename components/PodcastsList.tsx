import { matchSorter } from 'match-sorter';
import { useState } from 'react';
import { User } from 'react-feather';

import type { Podcast as PodcastType } from '../lib/podcasts';
import { MediaPreview } from './MediaPreview';
import { PodcastFilter } from './PodcastFilter';
import { Search } from './Search';

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
    {} as { [key: string]: boolean }
  );

  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState({
    favorites: false,
    categories: categoriesObj,
  });

  const filteredPodcast = matchSorter(podcasts, searchValue, {
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
      let showPodcast = false;

      filteredCategories.every((category) => {
        if (podcast.categories.includes(category)) {
          showPodcast = true;
          return false;
        }
        return true;
      });

      return filter.favorites ? showPodcast && podcast.favorite : showPodcast;
    }

    return false;
  });

  return (
    <div>
      <div className="mx-auto mb-6 max-w-prose">
        <Search
          placeholder="Podcasts durchsuchen"
          handleChange={(e) => setSearchValue(e.target.value)}
          handleBlur={() => {
            splitbee.track('Podcast Search', {
              search: searchValue,
            });
          }}
        />
      </div>

      <div className="mx-auto mb-16 max-w-prose">
        <PodcastFilter
          filter={filter}
          handleChange={(e) => {
            if (e.target.name.includes('Favoriten')) {
              setFilter({
                ...filter,
                favorites: e.target.checked,
              });
            } else {
              setFilter({
                favorites: filter.favorites,
                categories: {
                  ...filter.categories,
                  [e.target.name]: e.target.checked,
                },
              });
            }

            splitbee.track('Podcast Filter', filter);
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
