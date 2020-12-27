import Layout from '../components/Layout';
import ProfileImage from '../components/ProfileImage';
import TextBlock from '../components/TextBlock';
import ContactWidget from '../components/ContactWidget';
import { getEntryById } from '../lib/api';
import { markdownToHTML } from '../lib/text';

export default function About({ page, content }) {
    return (
        <Layout
            name={page.name}
            profession={page.profession}
            title={page.title}
            description={page.description}
            twitterHandle={page.username}
            previewImage={page.previewImage}
            keywords={page.keywords}>
            <ProfileImage
                url={content.image.fields.file.url}
                alt={content.image.fields.description}
            />
            <TextBlock text={content.about} />
            <TextBlock text={content.tools} />
            <ContactWidget text={content.contact} />
        </Layout>
    );
}

export async function getStaticProps() {
    const entry = await getEntryById('5ZLf7s8EjtSJ42FMprERgT');

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
                image: entry.about.fields.image,
                about: await markdownToHTML(entry.about.fields.description),
                tools: await markdownToHTML(entry.about.fields.tools),
                contact: await markdownToHTML(entry.about.fields.contact)
            }
        }
    };
}
