import type { GetStaticProps } from 'next';

import { ContactWidget } from '../components/ContactWidget';
import { Layout } from '../components/Layout';
import { NowPlaying } from '../components/NowPlaying';
import { TextBlock } from '../components/TextBlock';
import { TopMusic } from '../components/TopMusic';
import { queryContent } from '../lib/content';
import { markdownToHTML } from '../lib/text';

interface Props {
    preview: boolean;
    title: string;
    description: string;
    slug: string;
    previewImage: {
        url: string;
        description: string;
    };
    musicText: string;
    contact: string;
}

export default function Music(props: Props) {
    return (
        <Layout
            preview={props.preview}
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}
            slug={props.slug}>
            <TextBlock text={props.musicText} />
            <TopMusic />
            <NowPlaying />
            <ContactWidget text={props.contact} />
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
    const response = await queryContent(
        `{
            page: pageCollection(where: {slug: "musik"}, limit: 1, preview: false) {
                items {
                    title
                    slug
                    description
                }
            }
            musicSnippet: textSnippetCollection(where: {title: "Music"}, limit: 1, preview: false) {
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
    const musicText = response.data.musicSnippet.items[0].content;
    const contactText = response.data.contactSnippet.items[0].content;

    const previewImage = {
        url: `https://timoclasen.de/api/og-image?name=${encodeURIComponent(
            'Musik • Timo Clasen'
        )}`,
        description:
            'Teasertext der Seite "Musik" und Profilfoto von Timo Clasen'
    };

    return {
        props: {
            preview,
            title: page.title,
            description: page.description,
            previewImage,
            slug: page.slug,
            musicText: await markdownToHTML(musicText),
            contact: await markdownToHTML(contactText)
        }
    };
};
