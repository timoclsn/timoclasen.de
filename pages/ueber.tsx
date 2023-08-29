import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';

import { ContactWidget } from '../components/ContactWidget';
import { CV } from '../components/CV';
import { Layout } from '../components/Layout';
import { TextBlock } from '../components/TextBlock';
import { queryContent } from '../lib/content';
import { markdownToHTML, objToUrlParams } from '../lib/text';

export interface CVEntry {
  title: string;
  timespan: string;
  company: {
    name: string;
    url: string;
    image: {
      url: string;
      description: string;
    };
  };
}

interface Props {
  preview: boolean;
  title: string;
  description: string;
  slug: string;
  previewImage: {
    url: string;
    description: string;
  };
  image: {
    url: string;
    description: string;
    blurDataURL: string;
  };
  about: string;
  cvEntries: CVEntry[];
  linkCollection: string;
  contact: string;
}

const About: NextPage<Props> = function (props) {
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

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const response = await queryContent(
    `{
        page: pageCollection(where: {slug: "ueber"}, limit: 1, preview: false) {
            items {
                title
                slug
                description
            }
        }
        person: personCollection(where: {name: "Timo Clasen"}, limit: 1, preview: false) {
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
        cvEntries: cvEntryCollection(order: [order_DESC], preview: false) {
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
        contactSnippet: textSnippetCollection(where: {title: "Contact Widget"}, limit: 1, preview: false) {
            items {
                content
            }
        }
    }`,
    preview,
  );

  const page = response.data.page.items[0];
  const person = response.data.person.items[0];
  const image = person.imagesCollection.items[2];
  const { base64 } = await getPlaiceholder(image.url, {
    size: 10,
  });
  image.blurDataURL = base64;
  const cvEntries = response.data.cvEntries.items;
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
      image: image,
      about: await markdownToHTML(person.cvText),
      cvEntries,
      linkCollection: await markdownToHTML(person.linkCollection),
      contact: await markdownToHTML(contactText),
    },
  };
};
