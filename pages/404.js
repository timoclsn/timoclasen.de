import Layout from '../components/Layout';
import TextBlock from '../components/TextBlock';
import ContactWidget from '../components/ContactWidget';
import { getPageBySlug, getAbout, getError } from '../lib/content';
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
    const page = await getPageBySlug('404');
    const about = await getAbout();
    const error = await getError();

    return {
        props: {
            page: {
                name: about.name,
                title: page.title,
                description: page.description,
                previewImage: page.previewImage.url
            },
            content: {
                error: await markdownToHTML(error.content),
                contact: await markdownToHTML(about.contact)
            }
        }
    };
}
