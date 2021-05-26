import { GetStaticProps } from 'next';

import ContactWidget from '../components/ContactWidget';
import Layout from '../components/Layout';
import TextBlock from '../components/TextBlock';
import { queryContent } from '../lib/content';
import { markdownToHTML } from '../lib/text';

export default function Legal(props: any) {
    return (
        <Layout
            preview={props.preview}
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}
            slug={props.slug}>
            <TextBlock text={props.legal} />
            <ContactWidget text={props.contact} />
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
    const response = await queryContent(
        `{
            page: pageCollection(where: {slug: "impressum"}, limit: 1, preview: false) {
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
            legalSnippet: textSnippetCollection(where: {title: "Impressum & Datenschutz"}, limit: 1, preview: false) {
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
    const legalText = response.data.legalSnippet.items[0].content;
    const contactText = response.data.contactSnippet.items[0].content;

    return {
        props: {
            preview,
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            slug: page.slug,
            legal: await markdownToHTML(legalText),
            contact: await markdownToHTML(contactText)
        }
    };
};
