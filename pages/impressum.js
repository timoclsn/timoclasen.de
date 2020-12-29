import Layout from '../components/Layout';
import TextBlock from '../components/TextBlock';
import ContactWidget from '../components/ContactWidget';
import { getPage, getTextSnippet } from '../lib/content';
import { markdownToHTML } from '../lib/text';

export default function Legal(props) {
    return (
        <Layout
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}
            slug={props.slug}>
            <TextBlock text={props.legal} />
            <ContactWidget text={props.contact} />
        </Layout>
    );
}

export async function getStaticProps() {
    const page = await getPage('6zV2aj0F7ZIqeu58L9QYwp');
    const legal = await getTextSnippet('1yjXhC4GYcunicnGBNsZPL');
    const contact = await getTextSnippet('12GIX05Hy53JHINj1NpkrO');

    return {
        props: {
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            slug: page.slug,
            legal: await markdownToHTML(legal.content),
            contact: await markdownToHTML(contact.content)
        }
    };
}
