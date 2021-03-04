import Image from 'next/image';

import ContactWidget from '@/components/ContactWidget';
import Layout from '@/components/Layout';
import { queryContent } from '@/lib/content';
import { getPodcastData } from '@/lib/podcasts';
import { markdownToHTML } from '@/lib/text';

export default function Podcasts(props) {
    return (
        <Layout
            preview={props.preview}
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}
            slug={props.slug}>
            {props.podcasts.map((podcast) => (
                <div key={podcast.title}>
                    <h1>{podcast.title}</h1>
                    <Image
                        src={`/podcasts/${podcast.image}`}
                        quality={60}
                        alt={podcast.title}
                        width={200}
                        height={200}
                    />
                </div>
            ))}
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
            contactSnippet: textSnippetCollection(where: {title: "Contact Widget"}, limit: 1, preview: false) {
                items {
                    content
                }
            }
        }`,
        preview
    );

    const page = response.data.page.items[0];
    const contactText = response.data.contactSnippet.items[0].content;
    const podcasts = getPodcastData();

    return {
        props: {
            preview,
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            slug: page.slug,
            podcasts,
            contact: await markdownToHTML(contactText)
        }
    };
}
