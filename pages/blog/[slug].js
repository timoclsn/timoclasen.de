import Layout from '../../components/Layout';
import TextBlock from '../../components/TextBlock';
import ContactWidget from '../../components/ContactWidget';
import { queryContent } from '../../lib/content';
import { markdownToHTML } from '../../lib/text';

export default function Blog(props) {
    return (
        <Layout
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}
            slug={props.slug}>
            <TextBlock text={props.blogPost.text} key={props.blogPost.slug} />
            <ContactWidget text={props.contact} />
        </Layout>
    );
}

export async function getStaticProps({ params }) {
    const response = await queryContent(
        `{
            page: pageCollection(where: {slug: "blog"}, limit: 1) {
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
            blogPost: blogPostCollection(where: {slug: "${params.slug}"}, limit: 1) {
                items {
                    title
                    slug
                    date
                    author {
                        name
                    }
                    text
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
    const blogPost = response.data.blogPost.items[0];
    const contactText = response.data.contactSnippet.items[0].content;

    blogPost.text = await markdownToHTML(blogPost.text);

    return {
        props: {
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            slug: page.slug,
            blogPost,
            contact: await markdownToHTML(contactText)
        }
    };
}

export async function getStaticPaths() {
    const response = await queryContent(
        `{
            blogPosts: blogPostCollection {
                items {
                    slug
                }
            }
        }`
    );

    const blogPosts = response.data.blogPosts.items;

    return {
        paths: blogPosts.map((blogPost) => {
            return {
                params: {
                    slug: blogPost.slug
                }
            };
        }),
        fallback: false
    };
}
