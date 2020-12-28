import Layout from '../components/Layout';
import TextBlock from '../components/TextBlock';
import ContactWidget from '../components/ContactWidget';
import { getEntryById } from '../lib/api';
import { markdownToHTML } from '../lib/text';

export default function Home({ page, content }) {
    return (
        <Layout
            name={page.name}
            title={page.title}
            description={page.description}
            previewImage={page.previewImage}
            slug="404">
            <TextBlock text={content.error} />
            <ContactWidget text={content.contact} />
        </Layout>
    );
}

export async function getStaticProps() {
    const entry = await getEntryById('6milrVfCyEEUIbjiKpyVz1');

    return {
        props: {
            page: {
                name: entry.about.fields.name,
                title: entry.title,
                description: entry.description,
                previewImage: entry.previewImage.fields.file.url
            },
            content: {
                error: await markdownToHTML(entry.content.fields.content),
                contact: await markdownToHTML(entry.about.fields.contact)
            }
        }
    };
}
