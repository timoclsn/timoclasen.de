import type { GetStaticProps } from 'next';

import { Layout } from '../components/Layout';
import { PodcastsList } from '../components/PodcastsList';
import { Recommendations } from '../components/Recommendations';
import { TextBlock } from '../components/TextBlock';
import { queryContent } from '../lib/content';
import type { Podcast } from '../lib/podcasts';
import { getPodcasts } from '../lib/podcasts';
import { markdownToHTML, objToUrlParams } from '../lib/text';

interface Props {
  preview: boolean;
  title: string;
  description: string;
  slug: string;
  previewImage: {
    url: string;
    description: string;
  };
  podcastsText: string;
  podcasts: Podcast[];
}

export default function Podcasts(props: Props) {
  return (
    <Layout
      preview={props.preview}
      title={props.title}
      description={props.description}
      previewImage={props.previewImage}
      slug={props.slug}
    >
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

  const previewImage = {
    url: `https://timoclasen.de/api/og-image?${objToUrlParams({
      name: `${page.title} • Timo Clasen`,
    })}`,
    description: `Teasertext der Seite "${page.title}" und Profilfoto von Timo Clasen`,
  };

  return {
    props: {
      preview,
      title: page.title,
      description: page.description,
      previewImage,
      slug: page.slug,
      podcasts,
      podcastsText: await markdownToHTML(podcastsText),
    },
  };
};
