import Layout from '../components/Layout';
import ProfileImage from '../components/ProfileImage';
import TextBlock from '../components/TextBlock';
import ContactWidget from '../components/ContactWidget';
import { getPageBySlug, getAbout } from '../lib/content';
import { markdownToHTML } from '../lib/text';

export default function About({ page, content }) {
    return (
        <Layout
            name={page.name}
            title={page.title}
            description={page.description}
            previewImage={page.previewImage}
            slug="ueber">
            <ProfileImage
                url={content.image.url}
                alt={content.image.description}
            />
            <TextBlock text={content.about} />
            <TextBlock text={content.tools} />
            <ContactWidget text={content.contact} />
        </Layout>
    );
}

export async function getStaticProps() {
    const page = await getPageBySlug('ueber');
    const about = await getAbout();

    return {
        props: {
            page: {
                name: about.name,
                title: page.title,
                description: page.description,
                previewImage: page.previewImage
            },
            content: {
                image: about.image,
                about: await markdownToHTML(about.description),
                tools: await markdownToHTML(about.tools),
                contact: await markdownToHTML(about.contact)
            }
        }
    };
}
