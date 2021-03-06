import { useState } from 'react';

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

    const filteredPodcast = props.podcasts.filter((podcast) => {
        const search = searchValue.toLowerCase();
        return (
            podcast.title.toLowerCase().includes(search) ||
            podcast.hosts.toLowerCase().includes(search) ||
            podcast.description.toLowerCase().includes(search)
        );
    });

    return (
        <Layout
            preview={props.preview}
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}
            slug={props.slug}>
            <TextBlock text={props.podcastsText} />
            <div>
                <Search
                    placeholder="Podcasts durchsuchen"
                    handleChange={(e) => setSearchValue(e.target.value)}
                />
                <ul className={'space-y-20'}>
                    {filteredPodcast.map((podcast) => (
                        <li key={podcast.title}>
                            <Podcast
                                title={podcast.title}
                                image={podcast.image}
                                link={podcast.website}
                                hosts={podcast.hosts}
                                description={podcast.description}
                            />
                        </li>
                    ))}
                </ul>
                {!filteredPodcast.length && (
                    <p className="max-w-prose mx-auto">
                        Keine Podcast gefunden…
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
