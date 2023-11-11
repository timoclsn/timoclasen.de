import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { z } from "zod";

import { Layout } from "../components/Layout";
import { PodcastsList } from "../components/PodcastsList";
import { Recommendations } from "../components/Recommendations";
import { TextBlock } from "../components/TextBlock";
import { queryContentSave } from "../lib/content";
import { getPodcasts } from "../lib/podcasts";
import { markdownToHTML, objToUrlParams } from "../lib/text";

const Podcasts = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
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
};

export default Podcasts;

export const getStaticProps = (async ({ preview = false }) => {
  const pageData = await queryContentSave(
    `{
    pageCollection(where: {slug: "podcasts"}, limit: 1, preview: false) {
      items {
        title
        slug
        description
      }
    }
  }`,
    z.object({
      data: z.object({
        pageCollection: z.object({
          items: z.array(
            z.object({
              title: z.string(),
              slug: z.string(),
              description: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  const page = pageData.data.pageCollection.items[0];

  const podcastsSnippetData = await queryContentSave(
    `{
        textSnippetCollection(where: {title: "Podcasts"}, limit: 1, preview: false) {
            items {
                content
            }
        }
    }`,
    z.object({
      data: z.object({
        textSnippetCollection: z.object({
          items: z.array(
            z.object({
              content: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  const podcastsText =
    podcastsSnippetData.data.textSnippetCollection.items[0].content;

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
}) satisfies GetStaticProps;
