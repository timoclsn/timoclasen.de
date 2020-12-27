import Layout from '../components/Layout';
import TextBlock from '../components/TextBlock';
import ContactWidget from '../components/ContactWidget';
import { getEntryById } from '../lib/api';
import { markdownToHTML } from '../lib/text';

export default function Legal({ page, content }) {
    return (
        <Layout
            name={page.name}
            profession={page.profession}
            title={page.title}
            description={page.description}
            twitterHandle={page.username}
            previewImage={page.previewImage}
            keywords={page.keywords}>
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
                title: entry.title,
                keywords: entry.keywords,
                description: entry.description,
                previewImage: entry.previewImage.fields.file.url,
                name: entry.about.fields.name,
                profession: entry.about.fields.profession,
                username: entry.about.fields.username
            },
            content: {
                legal: await markdownToHTML(entry.content.fields.content),
                contact: await markdownToHTML(entry.about.fields.contact)
            }
        }
    };
}
