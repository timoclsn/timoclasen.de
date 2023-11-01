import type { NextPage } from 'next';
import type { GetStaticProps } from 'next';

import { ContactWidget } from '../components/ContactWidget';
import { Layout } from '../components/Layout';
import { NowPlaying } from '../components/NowPlaying';
import { TextBlock } from '../components/TextBlock';
import { TopMusic } from '../components/TopMusic';
import { queryContent } from '../lib/content';
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
  musicText: string;
  contact: string;
}

const Music: NextPage<Props> = function (props) {
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
    preview,
  );

  const page = response.data.page.items[0];
  const musicText = response.data.musicSnippet.items[0].content;
  const contactText = response.data.contactSnippet.items[0].content;

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
};
