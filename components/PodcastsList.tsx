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
    const [searchValue, setSearchValue] = useState('');
    const [filter, setFilter] = useState({
        favorites: false
    });

    const filteredPodcast = podcasts
        .filter((podcast) => {
            const search = searchValue.toLowerCase();
            return (
                podcast.title.toLowerCase().includes(search) ||
                podcast.hosts.toLowerCase().includes(search) ||
                podcast.description.toLowerCase().includes(search)
            );
        })
        .filter((podcast) => {
            return filter.favorites ? podcast.favorite : true;
        });

    return (
        <div>
            <div className="mx-auto mb-6 max-w-prose">
                <Search
                    placeholder="Podcasts durchsuchen"
                    handleChange={(e) => setSearchValue(e.target.value)}
                />
            </div>

            <div className="mx-auto mb-16 max-w-prose">
                <PodcastFilter
                    filter={filter}
                    handleChange={(e) =>
                        setFilter({ favorites: e.target.checked })
                    }
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
