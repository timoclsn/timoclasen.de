import Layout from '../../components/Layout';
import TextPost from '../../components/TextPost';
import ContactWidget from '../../components/ContactWidget';
import { queryContent } from '../../lib/content';
import { NextSeo, ArticleJsonLd } from 'next-seo';

export default function BlogPost(props) {
    const date = new Date(props.blogPost.date).toISOString();
    return (
        <>
            <NextSeo
                openGraph={{
                    type: 'article',
                    article: {
                        publishedTime: date
                    }
                }}
            />
            <ArticleJsonLd
                authorName="Timo Clasen"
                dateModified={date}
                datePublished={date}
                description={props.blogPost.summary}
                images={[props.blogPost.previewImage.url]}
                publisherLogo="/favicons/android-chrome-192x192.png"
                publisherName="Timo Clasen"
                title={props.blogPost.title}
                url={`https://timoclasen.de/blog/${props.blogPost.slug}`}
            />
            <Layout
                title={props.blogPost.title}
                description={props.blogPost.summary}
                previewImage={props.blogPost.previewImage}
                slug={`blog/${props.blogPost.slug}`}>
                <TextPost text={props.blogPost.text} />
                <ContactWidget text={props.contact} />
            </Layout>
        </>
    );
}

export async function getStaticProps({ params }) {
    const response = await queryContent(
        `{
            blogPost: blogPostCollection(where: {slug: "${params.slug}"}, limit: 1) {
                items {
                    title
                    slug
                    previewImage {
                        url
                        description
                    }
                    date
                    author {
                        name
                    }
                    summary
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

    const blogPost = response.data.blogPost.items[0];
    const contactText = response.data.contactSnippet.items[0].content;

    return {
        props: {
            blogPost,
            contact: contactText
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
