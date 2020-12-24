import Layout from '../components/layout';
import Textblock from '../components/textblock';
import { getEntryById } from '../lib/api';
import { markdownToHTML } from '../lib/markdown';

export default function Home({ page, content }) {
    return (
        <Layout
            name={page.name}
            profession={page.profession}
            title={page.title}
            description={page.description}
            twitterHandle={page.username}
            previewImage={page.previewImage}
            keywords={page.keywords}>
            <Textblock text={content.error} />
        </Layout>
    );
}

export async function getStaticProps() {
    const entry = await getEntryById('w2qRPPvpxtbTFMDQhFBWn');

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
                error: await markdownToHTML(entry.content.fields.content)
            }
        }
    };
}
