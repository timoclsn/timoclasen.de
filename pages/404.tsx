import type { GetStaticProps } from 'next';

import { ContactWidget } from '../components/ContactWidget';
import { Layout } from '../components/Layout';
import { TextBlock } from '../components/TextBlock';
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
  error: string;
  contact: string;
}

export default function Error(props: Props) {
  return (
    <Layout
      preview={props.preview}
      title={props.title}
      description={props.description}
      previewImage={props.previewImage}
      slug={props.slug}
    >
      <TextBlock text={props.error} />
      <ContactWidget text={props.contact} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const response = await queryContent(
    `{
            page: pageCollection(where: {slug: "404"}, limit: 1, preview: false) {
                items {
                    title
                    slug
                    description
                }
            }
            errorSnippet: textSnippetCollection(where: {title: "Error 404"}, limit: 1, preview: false) {
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
    preview
  );

  const page = response.data.page.items[0];
  const errorText = response.data.errorSnippet.items[0].content;
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
      error: await markdownToHTML(errorText),
      contact: await markdownToHTML(contactText),
    },
  };
};
