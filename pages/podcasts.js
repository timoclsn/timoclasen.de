import { useState } from 'react';

import ContactWidget from '@/components/ContactWidget';
import Layout from '@/components/Layout';
import Podcast from '@/components/Podcast';
import Search from '@/components/Search';
import TextBlock from '@/components/TextBlock';
import { queryContent } from '@/lib/content';
import { getPodcastData } from '@/lib/podcasts';
import { markdownToHTML } from '@/lib/text';

export default function Podcasts(props) {
    const [searchValue, setSearchValue] = useState('');
    const filteredPodcast = props.podcasts.filter((podcast) =>
        podcast.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (
        <Layout
            preview={props.preview}
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}
            slug={props.slug}>
            <TextBlock text={props.podcastsText} />
            <ul className={'space-y-10'}>
                <Search
                    placeholder="Podcasts durchsuchen"
                    handleChange={(e) => setSearchValue(e.target.value)}
                />
                {filteredPodcast.map((podcast) => (
                    <li key={podcast.title}>
                        <Podcast
                            title={podcast.title}
                            image={podcast.image}
                            link={podcast.website}
                            hosts={podcast.hosts}
                        />
                    </li>
                ))}
            </ul>
            <ContactWidget text={props.contact} />
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
            contactSnippet: textSnippetCollection(where: {title: "Contact Widget"}, limit: 1, preview: false) {
                items {
                    content
                }
            }
        }`,
        preview
    );

    const page = response.data.page.items[0];
    const podcastsText = response.data.podcastsSnippet.items[0].content;
    const podcasts = getPodcastData();
    const contactText = response.data.contactSnippet.items[0].content;

    return {
        props: {
            preview,
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            slug: page.slug,
            podcasts,
            podcastsText: await markdownToHTML(podcastsText),
            contact: await markdownToHTML(contactText)
        }
    };
}
