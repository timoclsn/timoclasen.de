import Layout from '../components/Layout';
import Teaser from '../components/Teaser';
import AboutWidget from '../components/AboutWidget';
import ContactWidget from '../components/ContactWidget';
import { getEntryById } from '../lib/api';
import { markdownToHTML, truncate, stripFirstLine } from '../lib/text';

export default function Home({ page, content }) {
    return (
        <Layout
            name={page.name}
            title={page.title}
            description={page.description}
            previewImage={page.previewImage}>
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

    let about = entry.about.fields.description;
    about = stripFirstLine(about);
    about = truncate(about, 400, true);
    about = await markdownToHTML(about);

    return {
        props: {
            page: {
                name: entry.about.fields.name,
                title: entry.title,
                description: entry.description,
                previewImage: entry.previewImage.fields.file.url
            },
            content: {
                introduction: await markdownToHTML(
                    entry.about.fields.introduction
                ),
                image: entry.about.fields.image,
                about,
                contact: await markdownToHTML(entry.about.fields.contact),
                tools: await markdownToHTML(entry.about.fields.tools)
            }
        }
    };
}
