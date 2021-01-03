import Layout from '../components/Layout';
import Teaser from '../components/Teaser';
import AboutWidget from '../components/AboutWidget';
import BlogWidget from '../components/BlogWidget';
import ContactWidget from '../components/ContactWidget';
import { queryContent } from '../lib/content';
import { truncate, stripFirstLine } from '../lib/text';

export default function Home(props) {
    return (
        <Layout
            preview={props.preview}
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}>
            <Teaser text={props.header} />
            <AboutWidget
                text={props.aboutTeaser}
                imageUrl={props.image.url}
                imageDescription={props.image.description}
            />
            <BlogWidget
                blogPost1={props.blogPosts[0]}
                blogPost2={props.blogPosts[1]}
            />
            <ContactWidget text={props.contact} />
        </Layout>
    );
}

export async function getStaticProps({ preview = false }) {
    const response = await queryContent(
        `{
            page: pageCollection(where: {slug: "home"}, limit: 1, preview: false) {
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
            headerSnippet: textSnippetCollection(where: {title: "Frontpage Header"}, limit: 1, preview: false) {
                items {
                    content
                }
            }
            person: personCollection(where: {name: "Timo Clasen"}, limit: 1, preview: false) {
                items {
                    cvText
                    image {
                        url
                        description
                    }
                }
            }
            blogPosts: blogPostCollection(order: [date_DESC], limit: 2, preview: false) {
                items {
                    title
                    summary
                    slug
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
    const headerText = response.data.headerSnippet.items[0].content;
    const person = response.data.person.items[0];
    const blogPosts = response.data.blogPosts.items;
    const contactText = response.data.contactSnippet.items[0].content;

    let aboutTeaser = person.cvText;
    aboutTeaser = stripFirstLine(aboutTeaser);
    aboutTeaser = truncate(aboutTeaser, 400, true);

    return {
        props: {
            preview,
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            header: headerText,
            image: person.image,
            aboutTeaser,
            blogPosts,
            contact: contactText
        }
    };
}
