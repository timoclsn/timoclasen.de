import { useState } from 'react';
import { Filter } from 'react-feather';

import Layout from '@/components/Layout';
import Podcast from '@/components/Podcast';
import Recommendations from '@/components/Recommendations';
import Search from '@/components/Search';
import TextBlock from '@/components/TextBlock';
import { queryContent } from '@/lib/content';
import { getPodcasts } from '@/lib/podcasts';
import { markdownToHTML } from '@/lib/text';

export default function Podcasts(props) {
    const [searchValue, setSearchValue] = useState('');
    const [filterFavorites, setfilterFavorites] = useState(false);

    const filteredPodcast = props.podcasts
        .filter((podcast) => {
            const search = searchValue.toLowerCase();
            return (
                podcast.title.toLowerCase().includes(search) ||
                podcast.hosts.toLowerCase().includes(search) ||
                podcast.description.toLowerCase().includes(search)
            );
        })
        .filter((podcast) => {
            return filterFavorites ? podcast.favorite : true;
        });

    function handleClick(e) {
        setfilterFavorites(e.target.checked);
    }

    return (
        <Layout
            preview={props.preview}
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}
            slug={props.slug}>
            <TextBlock text={props.podcastsText} />
            <div>
                <div className="mx-auto mb-6 max-w-prose">
                    <Search
                        placeholder="Podcasts durchsuchen"
                        handleChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                <div className="flex mx-auto mb-16 space-x-4 max-w-prose">
                    <div className="flex items-center justify-center space-x-2 text-base opacity-60">
                        <Filter size={16} />
                        <span>Filter:</span>
                    </div>
                    <label
                        className={`flex items-center justify-center cursor-pointer select-none px-2 py-0.5 text-base rounded-lg focus:outline-none ring-2 ring-highlight dark:ring-highlight-darkt ${
                            filterFavorites
                                ? 'text-light bg-highlight dark:bg-highlight-dark'
                                : 'text-highlight dark:text-highlight-dark'
                        }`}>
                        <input
                            className="hidden"
                            type="checkbox"
                            checked={filterFavorites}
                            onChange={handleClick}
                            name="Meine Favoriten"
                        />
                        Meine Favoriten
                    </label>
                </div>
                <ul className="space-y-20">
                    {filteredPodcast.map((podcast) => (
                        <li key={podcast.title}>
                            <Podcast
                                title={podcast.title}
                                image={podcast.image}
                                link={podcast.website}
                                hosts={podcast.hosts}
                                description={podcast.description}
                                favorite={podcast.favorite}
                            />
                        </li>
                    ))}
                </ul>
                {!filteredPodcast.length && (
                    <p className="mx-auto max-w-prose">
                        Keinen Podcast gefunden…
                    </p>
                )}
            </div>
            <Recommendations />
        </Layout>
    );
}

export async function getStaticProps({ preview = false }) {
    const response = await queryContent(
        `{
            page: pageCollection(where: {slug: "podcasts"}, limit: 1, preview: false) {
                items {
                    title
                    slug
                    description
                    previewImage {
                        url
                        description
                    }
                }
            }
            podcastsSnippet: textSnippetCollection(where: {title: "Podcasts"}, limit: 1, preview: false) {
                items {
                    content
                }
            }
        }`,
        preview
    );

    const page = response.data.page.items[0];
    const podcastsText = response.data.podcastsSnippet.items[0].content;
    const podcasts = getPodcasts();

    return {
        props: {
            preview,
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            slug: page.slug,
            podcasts,
            podcastsText: await markdownToHTML(podcastsText)
        }
    };
}
