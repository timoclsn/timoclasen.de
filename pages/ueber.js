import Layout from '../components/Layout';
import ProfileImage from '../components/ProfileImage';
import TextBlock from '../components/TextBlock';
import ContactWidget from '../components/ContactWidget';
import { getPage, getPerson, getTextSnippet } from '../lib/content';
import { markdownToHTML } from '../lib/text';

export default function About(props) {
    return (
        <Layout
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}
            slug={props.slug}>
            <ProfileImage url={props.image.url} alt={props.image.description} />
            <TextBlock text={props.about} />
            <TextBlock text={props.tools} />
            <ContactWidget text={props.contact} />
        </Layout>
    );
}

export async function getStaticProps() {
    const page = await getPage('5ZLf7s8EjtSJ42FMprERgT');
    const person = await getPerson('48e2ptDM7x29M9yBCaM1Ik');
    const tools = await getTextSnippet('5wbqPBHzM7r3xTFbGFfCh1');
    const contact = await getTextSnippet('12GIX05Hy53JHINj1NpkrO');

    return {
        props: {
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            slug: page.slug,
            image: person.picture,
            about: await markdownToHTML(person.cvText),
            tools: await markdownToHTML(tools.content),
            contact: await markdownToHTML(contact.content)
        }
    };
}
