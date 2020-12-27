import Layout from '../components/Layout';
import Teaser from '../components/Teaser';
import AboutWidget from '../components/AboutWidget';
import ContactWidget from '../components/ContactWidget';
import { getEntryById } from '../lib/api';
import { markdownToHTML, truncate } from '../lib/text';

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
            <AboutWidget
                text={content.about}
                imageUrl={content.image.fields.file.url}
                imageDescription={content.image.fields.description}
            />
            <ContactWidget text={content.contact} />
        </Layout>
    );
}

export async function getStaticProps() {
    const entry = await getEntryById('2x1CnUQDnjtEYZAbhiHOzd');

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
                about: await markdownToHTML(
                    truncate(entry.about.fields.description, 400, true)
                ),
                contact: await markdownToHTML(entry.about.fields.contact),
                tools: await markdownToHTML(entry.about.fields.tools)
            }
        }
    };
}
