import Layout from '../components/Layout';
import Teaser from '../components/Teaser';
import AboutWidget from '../components/AboutWidget';
import ContactWidget from '../components/ContactWidget';
import { getPageBySlug, getAbout } from '../lib/content';
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
                text={content.aboutTeaser}
                imageUrl={content.image.url}
                imageDescription={content.image.description}
            />
            <ContactWidget text={content.contact} />
        </Layout>
    );
}

export async function getStaticProps() {
    const page = await getPageBySlug('home');
    const about = await getAbout();

    let aboutTeaser = about.description;
    aboutTeaser = stripFirstLine(aboutTeaser);
    aboutTeaser = truncate(aboutTeaser, 400, true);
    aboutTeaser = await markdownToHTML(aboutTeaser);

    return {
        props: {
            page: {
                name: about.name,
                title: page.title,
                description: page.description,
                previewImage: page.previewImage.url
            },
            content: {
                introduction: await markdownToHTML(about.introduction),
                image: about.image,
                aboutTeaser,
                contact: await markdownToHTML(about.contact),
                tools: await markdownToHTML(about.tools)
            }
        }
    };
}
