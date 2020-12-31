import Layout from '../components/Layout';
import ContactWidget from '../components/ContactWidget';
import { queryContent } from '../lib/content';
import Link from 'next/link';

export default function Blog(props) {
    return (
        <Layout
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}
            slug={props.slug}>
            {props.blogPosts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.slug}>
                    <a>{post.title}</a>
                </Link>
            ))}
            <ContactWidget text={props.contact} />
        </Layout>
    );
}

export async function getStaticProps() {
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
            blogPosts: blogPostCollection {
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
    const blogPosts = response.data.blogPosts.items || [];
    const contactText = response.data.contactSnippet.items[0].content;

    return {
        props: {
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            slug: page.slug,
            blogPosts,
            contact: contactText
        }
    };
}
