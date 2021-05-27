import { GetStaticProps } from 'next';

import AboutWidget from '../components/AboutWidget';
import BlogWidget from '../components/BlogWidget';
import ContactWidget from '../components/ContactWidget';
import Layout from '../components/Layout';
import LCDWidget from '../components/LCDWidget';
import PodcastsWidget from '../components/PodcastsWidget';
import RunningWidget from '../components/RunningWidget';
import SmartHomeWidget from '../components/SmartHomeWidget';
import Teaser from '../components/Teaser';
import { queryContent } from '../lib/content';
import { getFavoritePodcasts, Podcast } from '../lib/podcasts';
import { markdownToHTML, stripFirstLine, truncate } from '../lib/text';

interface Props {
    preview: boolean;
    title: string;
    description: string;
    previewImage: {
        url: string;
        description: string;
    };
    header: string;
    image: {
        url: string;
        description: string;
    };
    aboutTeaser: string;
    blogPosts: {
        title: string;
        summary: string;
        slug: string;
    }[];
    smartHome: string;
    smartHomeFootnote: string;
    favoritePodcasts: Podcast[];
    LCDImage: {
        url: string;
        description: string;
    };
    contact: string;
}

export default function Home(props: Props) {
    return (
        <Layout
            preview={props.preview}
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}>
            <Teaser text={props.header} />
            <AboutWidget
                text={props.aboutTeaser}
                imageUrl={props.image.url}
                imageDescription={props.image.description}
            />
            <BlogWidget
                blogPost1={props.blogPosts[0]}
                blogPost2={props.blogPosts[1]}
            />
            <LCDWidget bgImage={props.LCDImage} />
            <SmartHomeWidget
                text={props.smartHome}
                footnote={props.smartHomeFootnote}
            />
            <RunningWidget />
            <PodcastsWidget podcasts={props.favoritePodcasts} />
            <ContactWidget text={props.contact} />
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
    const response = await queryContent(
        `{
            page: pageCollection(where: {slug: "home"}, limit: 1, preview: false) {
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
            headerSnippet: textSnippetCollection(where: {title: "Frontpage Header"}, limit: 1, preview: false) {
                items {
                    content
                }
            }
            person: personCollection(where: {name: "Timo Clasen"}, limit: 1, preview: false) {
                items {
                    cvText
                    image {
                        url
                        description
                    }
                }
            }
            blogPosts: blogPostCollection(order: [date_DESC], limit: 2, preview: false) {
                items {
                    title
                    summary
                    slug
                }
            }
            smartHomeSnippet: textSnippetCollection(where: {title: "Smart Home Widget"}, limit: 1, preview: false) {
                items {
                    content
                }
            }
            smartHomeFootnoteSnippet: textSnippetCollection(where: {title: "Smart Home Widget Footnote"}, limit: 1, preview: false) {
                items {
                    content
                }
            }
            contactSnippet: textSnippetCollection(where: {title: "Contact Widget"}, limit: 1, preview: false) {
                items {
                    content
                }
            }
            LCDImage: assetCollection(where: {title: "Life Centered Design.Net"}, limit: 1, preview: false) {
                items {
                    url
                    description
                }
            }
        }`,
        preview
    );

    const page = response.data.page.items[0];
    const headerText = response.data.headerSnippet.items[0].content;
    const person = response.data.person.items[0];
    const blogPosts = response.data.blogPosts.items;
    const smartHomeText = response.data.smartHomeSnippet.items[0].content;
    const smartHomeFootnoteText =
        response.data.smartHomeFootnoteSnippet.items[0].content;
    const contactText = response.data.contactSnippet.items[0].content;
    const favoritePodcasts = getFavoritePodcasts();
    const LCDImage = response.data.LCDImage.items[0];

    let aboutTeaser = person.cvText;
    aboutTeaser = stripFirstLine(aboutTeaser);
    aboutTeaser = truncate(aboutTeaser, 400, true);
    aboutTeaser = await markdownToHTML(aboutTeaser);

    return {
        props: {
            preview,
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            header: await markdownToHTML(headerText),
            image: person.image,
            aboutTeaser,
            blogPosts,
            smartHome: await markdownToHTML(smartHomeText),
            smartHomeFootnote: await markdownToHTML(smartHomeFootnoteText),
            favoritePodcasts,
            LCDImage,
            contact: await markdownToHTML(contactText)
        }
    };
};
