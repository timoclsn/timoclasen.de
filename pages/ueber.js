import Layout from '../components/Layout';
import Image from 'next/image';
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
            <Image
                src={props.image.url}
                width="1088"
                height="612"
                alt={props.image.description}
                quality={60}
                className={'rounded-3xl'}
            />
            <TextBlock text={props.about} />
            <ContactWidget text={props.contact} />
        </Layout>
    );
}

export async function getStaticProps() {
    const response = await queryContent(
        `{
            page: pageCollection(where: {slug: "ueber"}, limit: 1, preview: false) {
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
            person: personCollection(where: {name: "Timo Clasen"}, limit: 1, preview: false) {
                items {
                    cvText
                    imagesCollection {
                        items {
                            url
                            description
                        }
                    }
                }
            }
            contactSnippet: textSnippetCollection(where: {title: "Contact Widget"}, limit: 1, preview: false) {
                items {
                    content
                }
            }
        }`
    );

    const page = response.data.page.items[0];
    const person = response.data.person.items[0];
    const contactText = response.data.contactSnippet.items[0].content;

    return {
        props: {
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            slug: page.slug,
            image: person.imagesCollection.items[0],
            about: person.cvText,
            contact: contactText
        }
    };
}
