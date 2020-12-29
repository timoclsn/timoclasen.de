import Layout from '../components/Layout';
import TextBlock from '../components/TextBlock';
import ContactWidget from '../components/ContactWidget';
import { getPage, getTextSnippet } from '../lib/content';
import { markdownToHTML } from '../lib/text';

export default function Error(props) {
    return (
        <Layout
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}
            slug={props.slug}>
            <TextBlock text={props.error} />
            <ContactWidget text={props.contact} />
        </Layout>
    );
}

export async function getStaticProps() {
    const page = await getPage('2x1CnUQDnjtEYZAbhiHOzd');
    const error = await getTextSnippet('2RbTQMAQ3KJccG9CipNpq1');
    const contact = await getTextSnippet('12GIX05Hy53JHINj1NpkrO');

    return {
        props: {
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            slug: page.slug,
            error: await markdownToHTML(error.content),
            contact: await markdownToHTML(contact.content)
        }
    };
}
