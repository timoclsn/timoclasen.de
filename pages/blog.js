import Layout from '../components/Layout';
import ContactWidget from '../components/ContactWidget';
import { queryContent } from '../lib/content';
import BlogPostPreview from '../components/BlogPostPreview';

export default function Blog(props) {
    return (
        <Layout
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}
            slug={props.slug}>
            {props.blogPosts.map((post) => (
                <BlogPostPreview
                    title={post.title}
                    subtitle={post.subtitle}
                    date={post.date}
                    slug={post.slug}
                    key={post.sys.id}
                />
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
            blogPosts: blogPostCollection(order: [date_DESC]) {
                items {
                    sys {
                        id
                    }
                    title
                    subtitle
                    slug
                    date
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
    const blogPosts = response.data.blogPosts.items;
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
