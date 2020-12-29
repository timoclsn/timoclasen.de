import Layout from '../components/Layout';
import Teaser from '../components/Teaser';
import AboutWidget from '../components/AboutWidget';
import ContactWidget from '../components/ContactWidget';
import { getPage, getPerson, getTextSnippet } from '../lib/content';
import { markdownToHTML, truncate, stripFirstLine } from '../lib/text';

export default function Home(props) {
    return (
        <Layout
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}>
            <Teaser text={props.header} />
            <AboutWidget
                text={props.aboutTeaser}
                imageUrl={props.image.url}
                imageDescription={props.image.description}
            />
            <ContactWidget text={props.contact} />
        </Layout>
    );
}

export async function getStaticProps() {
    const page = await getPage('2x1CnUQDnjtEYZAbhiHOzd');
    const header = await getTextSnippet('3cCPudPXTgyl9z047wNZAC');
    const person = await getPerson('48e2ptDM7x29M9yBCaM1Ik');
    const contact = await getTextSnippet('12GIX05Hy53JHINj1NpkrO');

    let aboutTeaser = person.cvText;
    aboutTeaser = stripFirstLine(aboutTeaser);
    aboutTeaser = truncate(aboutTeaser, 400, true);
    aboutTeaser = await markdownToHTML(aboutTeaser);

    return {
        props: {
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            header: await markdownToHTML(header.content),
            image: person.picture,
            aboutTeaser,
            contact: await markdownToHTML(contact.content)
        }
    };
}
