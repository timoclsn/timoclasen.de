import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import TextPost from '../../components/TextPost';
import BlogPostHeader from '../../components/BlogPostHeader';
import ContactWidget from '../../components/ContactWidget';
import { queryContent } from '../../lib/content';
import TextBlock from '../../components/TextBlock';
import readingTime from 'reading-time';
import SEOBlogPost from '../../components/SEOBlogPost';

export default function BlogPost(props) {
    const router = useRouter();

    if (!router.isFallback && !props.blogPost) {
        return (
            <Layout
                preview=""
                title="Error 404"
                description="Error 404"
                previewImage=""
                slug="">
                <TextBlock text={props.error} />
                <ContactWidget text={props.contact} />
            </Layout>
        );
    }

    if (router.isFallback && !props.blogPost) {
        return (
            <Layout
                preview=""
                title="Seite lädt…"
                description="Seite lädt…"
                previewImage=""
                slug="">
                <TextBlock text="# Seite lädt…" />
                <ContactWidget text={props.contact} />
            </Layout>
        );
    }

    const date = new Date(props.blogPost.date).toISOString();

    const readingTimeObj = readingTime(props.blogPost.text);
    const readingTimeMinutes =
        Math.round(readingTimeObj.minutes) < 1
            ? 1
            : Math.round(readingTimeObj.minutes);

    return (
        <>
            <Layout
                preview={props.preview}
                title={props.blogPost.title}
                description={props.blogPost.summary}
                previewImage={props.blogPost.previewImage}
                slug={`blog/${props.blogPost.slug}`}>
                <SEOBlogPost
                    authorName={props.blogPost.author.name}
                    readingTime={readingTimeMinutes}
                    date={date}
                    slug={props.blogPost.slug}
                    title={props.blogPost.title}
                    description={props.blogPost.summary}
                    previewImage={props.blogPost.previewImage}
                />
                <article className={'space-y-8 md:space-y-16'}>
                    <BlogPostHeader
                        title={props.blogPost.title}
                        subtitle={props.blogPost.subtitle}
                        date={props.blogPost.date}
                        author={props.blogPost.author}
                        readingTime={readingTimeMinutes}
                        sys={props.blogPost.sys}
                    />
                    <TextPost text={props.blogPost.text} />
                </article>
                <ContactWidget text={props.contact} />
            </Layout>
        </>
    );
}

export async function getStaticProps({ params, preview = false }) {
    const response = await queryContent(
        `{
            blogPost: blogPostCollection(where: {slug: "${params.slug}"}, limit: 1, preview: false) {
                items {
                    sys {
                        publishedVersion
                    }
                    title
                    subtitle
                    slug
                    previewImage {
                        url
                        description
                    }
                    date
                    author {
                        name
                        username
                        image {
                            url
                            description
                        }
                    }
                    summary
                    text
                }
            }
            errorSnippet: textSnippetCollection(where: {title: "Error 404"}, limit: 1, preview: false) {
                items {
                    content
                }
            }
            contactSnippet: textSnippetCollection(where: {title: "Contact Widget"}, limit: 1) {
                items {
                    content
                }
            }
        }`,
        preview
    );

    const blogPost = response.data.blogPost.items[0];
    const errorText = response.data.errorSnippet.items[0].content;
    const contactText = response.data.contactSnippet.items[0].content;

    return {
        props: {
            preview,
            blogPost,
            error: errorText,
            contact: contactText
        }
    };
}

export async function getStaticPaths() {
    const response = await queryContent(
        `{
            blogPosts: blogPostCollection(preview: false) {
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
        fallback: true
    };
}
