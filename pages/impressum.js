import Layout from '../components/Layout';
import TextBlock from '../components/TextBlock';
import ContactWidget from '../components/ContactWidget';
import { getEntryById } from '../lib/api';
import { markdownToHTML } from '../lib/text';

export default function Legal({ page, content }) {
    return (
        <Layout
            name={page.name}
            title={page.title}
            description={page.description}
            previewImage={page.previewImage}
            slug="impressum">
            <TextBlock text={content.legal} />
            <ContactWidget text={content.contact} />
        </Layout>
    );
}

export async function getStaticProps() {
    const entry = await getEntryById('6zV2aj0F7ZIqeu58L9QYwp');

    return {
        props: {
            page: {
                name: entry.about.fields.name,
                title: entry.title,
                description: entry.description,
                previewImage: entry.previewImage.fields.file.url
            },
            content: {
                legal: await markdownToHTML(entry.content.fields.content),
                contact: await markdownToHTML(entry.about.fields.contact)
            }
        }
    };
}
