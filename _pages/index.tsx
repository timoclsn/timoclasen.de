import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { z } from "zod";

import { AboutWidget } from "../components/AboutWidget";
import { BlogWidget } from "../components/BlogWidget";
import { ContactWidget } from "../components/ContactWidget";
import { Layout } from "../components/Layout";
import { LCDWidget } from "../components/LCDWidget";
import { MLWidget } from "../components/MLWidget";
import { NowPlaying } from "../components/NowPlaying";
import { PodcastsWidget } from "../components/PodcastsWidget";
import { RunningWidget } from "../components/RunningWidget/RunningWidget";
import { SmartHomeWidget } from "../components/SmartHomeWidget/SmartHomeWidget";
import { queryContent } from "../lib/content";
import { getPlaceholder } from "../lib/placeholder";
import { getFavoritePodcasts } from "../lib/podcasts";
import {
  markdownToHTML,
  objToUrlParams,
  stripFirstLine,
  truncate,
} from "../lib/text";
import { Teaser } from "../components/Teaser/Teaser";

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
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
      <MLWidget bgImage={props.MLImage} />
      <NowPlaying />
      <ContactWidget text={props.contact} />
    </Layout>
  );
};

export default Home;

export const getStaticProps = (async ({ preview = false }) => {
  const pageData = await queryContent(
    `{
      pageCollection(where: {slug: "home"}, limit: 1, preview: false) {
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

  const headerSnippetData = await queryContent(
    `{
      textSnippetCollection(where: {title: "Frontpage Header"}, limit: 1, preview: false) {
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

  const headerText =
    headerSnippetData.data.textSnippetCollection.items[0].content;

  const personData = await queryContent(
    `{
      personCollection(where: {name: "Timo Clasen"}, limit: 1, preview: false) {
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
  }`,
    z.object({
      data: z.object({
        personCollection: z.object({
          items: z.array(
            z.object({
              cvText: z.string(),
              profileImageCollection: z.object({
                items: z.array(
                  z.object({
                    url: z.string().url(),
                    description: z.string(),
                  }),
                ),
              }),
            }),
          ),
        }),
      }),
    }),
  );

  const person = personData.data.personCollection.items[0];

  const image = person.profileImageCollection.items[1];
  const { base64: personImageBase64 } = await getPlaceholder(image.url);
  const enhancedImage = { ...image, blurDataURL: personImageBase64 };

  const blogPostsData = await queryContent(
    `{
      blogPostCollection(order: [date_DESC], limit: 2, preview: false) {
        items {
          title
          summary
          slug
        }
      }
    }`,
    z.object({
      data: z.object({
        blogPostCollection: z.object({
          items: z.array(
            z.object({
              title: z.string(),
              summary: z.string(),
              slug: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  const blogPosts = blogPostsData.data.blogPostCollection.items;

  const smartHomeSnippetData = await queryContent(
    `{
      textSnippetCollection(where: {title: "Smart Home Widget"}, limit: 1, preview: false) {
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

  const smartHomeText =
    smartHomeSnippetData.data.textSnippetCollection.items[0].content;

  const smartHomeFootnoteSnippetDate = await queryContent(
    `{
      textSnippetCollection(where: {title: "Smart Home Widget Footnote"}, limit: 1, preview: false) {
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

  const smartHomeFootnoteText =
    smartHomeFootnoteSnippetDate.data.textSnippetCollection.items[0].content;

  const contactSnippetData = await queryContent(
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

  const lcdImageData = await queryContent(
    `{
      assetCollection(where: {title: "Life Centered Design.Net"}, limit: 1, preview: false) {
        items {
          url
          description
        }
      }
    }`,
    z.object({
      data: z.object({
        assetCollection: z.object({
          items: z.array(
            z.object({
              url: z.string().url(),
              description: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  const lcdImage = lcdImageData.data.assetCollection.items[0];
  const { base64: LCDImageBase64 } = await getPlaceholder(lcdImage.url);
  const enhancedLcdImage = { ...lcdImage, blurDataURL: LCDImageBase64 };

  const favoritePodcasts = getFavoritePodcasts();

  const mlImageData = await queryContent(
    `{
      assetCollection(where: {title: "Makersleague.de"}, limit: 1, preview: false) {
        items {
          url
          description
        }
      }
    }`,
    z.object({
      data: z.object({
        assetCollection: z.object({
          items: z.array(
            z.object({
              url: z.string().url(),
              description: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  const mlImage = mlImageData.data.assetCollection.items[0];
  const { base64: MLImageBase64 } = await getPlaceholder(mlImage.url);
  const enhancedMlImage = { ...mlImage, blurDataURL: MLImageBase64 };

  let aboutTeaser = person.cvText;
  aboutTeaser = stripFirstLine(aboutTeaser);
  aboutTeaser = truncate(aboutTeaser, 400, true);
  aboutTeaser = await markdownToHTML(aboutTeaser);

  const previewImage = {
    url: `https://timoclasen.de/api/og-image?${objToUrlParams({
      name: "Timo Clasen",
    })}`,
    description: "Teasertext der Startseite und Profilfoto von Timo Clasen",
  };

  return {
    props: {
      preview,
      title: page.title,
      description: page.description,
      previewImage,
      header: await markdownToHTML(headerText),
      image: enhancedImage,
      aboutTeaser,
      blogPosts,
      smartHome: await markdownToHTML(smartHomeText),
      smartHomeFootnote: await markdownToHTML(smartHomeFootnoteText),
      favoritePodcasts,
      LCDImage: enhancedLcdImage,
      MLImage: enhancedMlImage,
      contact: await markdownToHTML(contactText),
    },
  };
}) satisfies GetStaticProps;
