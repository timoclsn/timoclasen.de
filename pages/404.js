import ContactWidget from '@/components/ContactWidget';
import Layout from '@/components/Layout';
import TextBlock from '@/components/TextBlock';
import { queryContent } from '@/lib/content';
import { markdownToHTML } from '@/lib/text';

export default function Error(props) {
    return (
        <Layout
            preview={props.preview}
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}
            slug={props.slug}>
            <TextBlock text={props.error} />
            <ContactWidget text={props.contact} />
        </Layout>
    );
}

export async function getStaticProps({ preview = false }) {
    const response = await queryContent(
        `{
            page: pageCollection(where: {slug: "404"}, limit: 1, preview: false) {
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

    return {
        props: {
            preview,
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            slug: page.slug,
            error: await markdownToHTML(errorText),
            contact: await markdownToHTML(contactText)
        }
    };
}
