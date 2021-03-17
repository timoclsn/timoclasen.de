import Image from 'next/image';

import ContactWidget from '@/components/ContactWidget';
import Layout from '@/components/Layout';
import TextBlock from '@/components/TextBlock';
import { queryContent } from '@/lib/content';
import { markdownToHTML } from '@/lib/text';

export default function About(props) {
    return (
        <Layout
            preview={props.preview}
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}
            slug={props.slug}>
            <div className="aspect-w-2 aspect-h-1 bg-highlight dark:bg-highlight-dark rounded-3xl">
                <Image
                    src={props.image.url}
                    layout={'fill'}
                    objectFit="cover"
                    objectPosition="center center"
                    sizes="90vw"
                    quality={60}
                    priority
                    alt={props.image.description}
                    className="rounded-3xl"
                />
            </div>
            <TextBlock text={props.about} />
            <ContactWidget text={props.contact} />
        </Layout>
    );
}

export async function getStaticProps({ preview = false }) {
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
        }`,
        preview
    );

    const page = response.data.page.items[0];
    const person = response.data.person.items[0];
    const contactText = response.data.contactSnippet.items[0].content;

    return {
        props: {
            preview,
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            slug: page.slug,
            image: person.imagesCollection.items[0],
            about: await markdownToHTML(person.cvText),
            contact: await markdownToHTML(contactText)
        }
    };
}
