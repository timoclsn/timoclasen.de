import Layout from '@/components/Layout';
import PodcastsList from '@/components/PodcastsList';
import Recommendations from '@/components/Recommendations';
import TextBlock from '@/components/TextBlock';
import { queryContent } from '@/lib/content';
import { getPodcasts } from '@/lib/podcasts';
import { markdownToHTML } from '@/lib/text';
import { GetStaticProps } from 'next';

export default function Podcasts(props: any) {
    return (
        <Layout
            preview={props.preview}
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}
            slug={props.slug}>
            <TextBlock text={props.podcastsText} />
            <PodcastsList podcasts={props.podcasts} />
            <Recommendations />
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
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
};
