import type { NextPage } from 'next';
import type { GetStaticProps } from 'next';
import { getPlaiceholder } from 'plaiceholder';

import { AboutWidget } from '../components/AboutWidget';
import { BlogWidget } from '../components/BlogWidget';
import { ContactWidget } from '../components/ContactWidget';
import { Layout } from '../components/Layout';
import { LCDWidget } from '../components/LCDWidget';
import { MLWidget } from '../components/MLWidget';
import { NowPlaying } from '../components/NowPlaying';
import { PodcastsWidget } from '../components/PodcastsWidget';
import { RunningWidget } from '../components/RunningWidget';
import { SmartHomeWidget } from '../components/SmartHomeWidget';
import { Teaser } from '../components/Teaser';
import { Web3Widget } from '../components/Web3Widget';
import { queryContent } from '../lib/content';
import type { Podcast } from '../lib/podcasts';
import { getFavoritePodcasts } from '../lib/podcasts';
import {
  markdownToHTML,
  objToUrlParams,
  stripFirstLine,
  truncate,
} from '../lib/text';

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
    blurDataURL: string;
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
    blurDataURL: string;
  };
  MLImage: {
    url: string;
    description: string;
    blurDataURL: string;
  };
  contact: string;
}

const Home: NextPage<Props> = function (props) {
  return (
    <Layout
      preview={props.preview}
      title={props.title}
      description={props.description}
      previewImage={props.previewImage}
    >
      <Teaser text={props.header} />
      <AboutWidget text={props.aboutTeaser} image={props.image} />
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
      <Web3Widget />
      <MLWidget bgImage={props.MLImage} />
      <NowPlaying />
      <ContactWidget text={props.contact} />
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const response = await queryContent(
    `{
        page: pageCollection(where: {slug: "home"}, limit: 1, preview: false) {
            items {
                title
                slug
                description
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
                profileImageCollection {
                    items {
                        url
                        description
                    }
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
        MLImage: assetCollection(where: {title: "Makersleague.de"}, limit: 1, preview: false) {
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
  const image = person.profileImageCollection.items[1];
  const { base64: personImageBase64 } = await getPlaiceholder(image.url, {
    size: 10,
  });
  image.blurDataURL = personImageBase64;

  const blogPosts = response.data.blogPosts.items;
  const smartHomeText = response.data.smartHomeSnippet.items[0].content;
  const smartHomeFootnoteText =
    response.data.smartHomeFootnoteSnippet.items[0].content;
  const contactText = response.data.contactSnippet.items[0].content;
  const favoritePodcasts = getFavoritePodcasts();
  const LCDImage = response.data.LCDImage.items[0];
  const { base64: LCDImageBase64 } = await getPlaiceholder(LCDImage.url, {
    size: 10,
  });
  LCDImage.blurDataURL = LCDImageBase64;
  const MLImage = response.data.MLImage.items[0];
  const { base64: MLImageBase64 } = await getPlaiceholder(MLImage.url, {
    size: 10,
  });
  MLImage.blurDataURL = MLImageBase64;

  let aboutTeaser = person.cvText;
  aboutTeaser = stripFirstLine(aboutTeaser);
  aboutTeaser = truncate(aboutTeaser, 400, true);
  aboutTeaser = await markdownToHTML(aboutTeaser);

  const previewImage = {
    url: `https://timoclasen.de/api/og-image?${objToUrlParams({
      name: 'Timo Clasen',
    })}`,
    description: 'Teasertext der Startseite und Profilfoto von Timo Clasen',
  };

  return {
    props: {
      preview,
      title: page.title,
      description: page.description,
      previewImage,
      header: await markdownToHTML(headerText),
      image: image,
      aboutTeaser,
      blogPosts,
      smartHome: await markdownToHTML(smartHomeText),
      smartHomeFootnote: await markdownToHTML(smartHomeFootnoteText),
      favoritePodcasts,
      LCDImage,
      MLImage,
      contact: await markdownToHTML(contactText),
    },
  };
};
