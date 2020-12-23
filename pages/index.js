import Layout from '../components/layout';
import Profileimage from '../components/profileimage';
import Teaser from '../components/teaser';
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
            <Teaser text={content.introduction} />
            <Textblock text={content.about} />
            <Textblock text={content.contact} />
            <Textblock text={content.tools} />
        </Layout>
    );
}

export async function getStaticProps() {
    const entry = await getEntryById('3YasLSg8HDTFzoYt16xoPW');

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
                introduction: await markdownToHTML(
                    entry.about.fields.introduction
                ),
                image: entry.about.fields.image,
                about: await markdownToHTML(entry.about.fields.description),
                contact: await markdownToHTML(entry.about.fields.contact),
                tools: await markdownToHTML(entry.about.fields.tools)
            }
        }
    };
}
