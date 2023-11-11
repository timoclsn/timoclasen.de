import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { z } from 'zod';

import { ContactWidget } from '../components/ContactWidget';
import { Layout } from '../components/Layout';
import { NowPlaying } from '../components/NowPlaying';
import { TextBlock } from '../components/TextBlock';
import { TopMusic } from '../components/TopMusic';
import { queryContentSave } from '../lib/content';
import { markdownToHTML, objToUrlParams } from '../lib/text';

const Music = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout
      preview={props.preview}
      title={props.title}
      description={props.description}
      previewImage={props.previewImage}
      slug={props.slug}
    >
      <TextBlock text={props.musicText} />
      <TopMusic />
      <NowPlaying />
      <ContactWidget text={props.contact} />
    </Layout>
  );
};

export default Music;

export const getStaticProps = (async ({ preview = false }) => {
  const pageData = await queryContentSave(
    `{
    pageCollection(where: {slug: "musik"}, limit: 1, preview: false) {
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

  const musicSnippetData = await queryContentSave(
    `{
    textSnippetCollection(where: {title: "Music"}, limit: 1, preview: false) {
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

  const musicText =
    musicSnippetData.data.textSnippetCollection.items[0].content;

  const contactSnippetData = await queryContentSave(
    `{
    textSnippetCollection(where: {title: "Contact Widget"}, limit: 1, preview: false) {
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

  const contactText =
    contactSnippetData.data.textSnippetCollection.items[0].content;

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
      musicText: await markdownToHTML(musicText),
      contact: await markdownToHTML(contactText),
    },
  };
}) satisfies GetStaticProps;
