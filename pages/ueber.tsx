import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import { z } from "zod";

import { ContactWidget } from "../components/ContactWidget";
import { CV } from "../components/CV";
import { Layout } from "../components/Layout";
import { TextBlock } from "../components/TextBlock";
import { queryContentSave } from "../lib/content";
import { getPlaceholder } from "../lib/placeholder";
import { markdownToHTML, objToUrlParams } from "../lib/text";

const About = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout
      preview={props.preview}
      title={props.title}
      description={props.description}
      previewImage={props.previewImage}
      slug={props.slug}
    >
      <div className="aspect-w-2 aspect-h-1 overflow-hidden rounded-3xl">
        <Image
          src={props.image.url}
          width="2200"
          height="1100"
          sizes="90vw"
          quality={60}
          priority
          alt={props.image.description}
          blurDataURL={props.image.blurDataURL}
          placeholder="blur"
        />
      </div>
      <TextBlock text={props.about} />
      <CV entries={props.cvEntries} />
      <TextBlock text={props.linkCollection} />
      <ContactWidget text={props.contact} />
    </Layout>
  );
};

export default About;

export const getStaticProps = (async ({ preview = false }) => {
  const pageData = await queryContentSave(
    `{
      pageCollection(where: {slug: "ueber"}, limit: 1, preview: false) {
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

  const personData = await queryContentSave(
    `{
      personCollection(where: {name: "Timo Clasen"}, limit: 1, preview: false) {
        items {
          cvText
          imagesCollection {
            items {
              url
              description
            }
          }
          linkCollection
        }
      }
    }`,
    z.object({
      data: z.object({
        personCollection: z.object({
          items: z.array(
            z.object({
              cvText: z.string(),
              imagesCollection: z.object({
                items: z.array(
                  z.object({
                    url: z.string(),
                    description: z.string(),
                  }),
                ),
              }),
              linkCollection: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  const person = personData.data.personCollection.items[0];
  const image = person.imagesCollection.items[2];
  const { base64 } = await getPlaceholder(image.url);
  const enhancedImage = { ...image, blurDataURL: base64 };

  const cvEntriesData = await queryContentSave(
    `{
      cvEntryCollection(order: [order_DESC], preview: false) {
        items {
          title
          timespan
          company {
            name
            url
            image {
              url
              description
            }
          }
        }
      }
    }`,
    z.object({
      data: z.object({
        cvEntryCollection: z.object({
          items: z.array(
            z.object({
              title: z.string(),
              timespan: z.string(),
              company: z.object({
                name: z.string(),
                url: z.string().url(),
                image: z.object({
                  url: z.string().url(),
                  description: z.string(),
                }),
              }),
            }),
          ),
        }),
      }),
    }),
  );

  const cvEntries = cvEntriesData.data.cvEntryCollection.items;

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
      image: enhancedImage,
      about: await markdownToHTML(person.cvText),
      cvEntries,
      linkCollection: await markdownToHTML(person.linkCollection),
      contact: await markdownToHTML(contactText),
    },
  };
}) satisfies GetStaticProps;
