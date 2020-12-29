import Layout from '../components/Layout';
import TextBlock from '../components/TextBlock';
import ContactWidget from '../components/ContactWidget';
import { getPageBySlug, getAbout, getLegal } from '../lib/content';
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
    const page = await getPageBySlug('impressum');
    const about = await getAbout();
    const legal = await getLegal();

    return {
        props: {
            page: {
                name: about.name,
                title: page.title,
                description: page.description,
                previewImage: page.previewImage
            },
            content: {
                legal: await markdownToHTML(legal.content),
                contact: await markdownToHTML(about.contact)
            }
        }
    };
}
