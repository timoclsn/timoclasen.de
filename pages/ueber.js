import Layout from '../components/Layout';
import ProfileImage from '../components/ProfileImage';
import TextBlock from '../components/TextBlock';
import ContactWidget from '../components/ContactWidget';
import { queryContent } from '../lib/content';

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
    const response = await queryContent(
        `{
            page: pageCollection(where: {slug: "ueber"}, limit: 1) {
                items {
                    title
                    slug
                    description
                    previewImage {
                        url
                        description
                    }
                }
            }
            person: personCollection(where: {name: "Timo Clasen"}, limit: 1) {
                items {
                    cvText
                    image {
                        url
                        description
                    }
                }
            }
            toolsSnippet: textSnippetCollection(where: {title: "Website Tools"}, limit: 1) {
                items {
                    content
                }
            }
            contactSnippet: textSnippetCollection(where: {title: "Contact Widget"}, limit: 1) {
                items {
                    content
                }
            }
        }`
    );

    const page = response.data.page.items[0];
    const person = response.data.person.items[0];
    const toolsText = response.data.toolsSnippet.items[0].content;
    const contactText = response.data.contactSnippet.items[0].content;

    return {
        props: {
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            slug: page.slug,
            image: person.image,
            about: person.cvText,
            tools: toolsText,
            contact: contactText
        }
    };
}
