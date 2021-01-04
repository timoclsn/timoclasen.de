import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import TextPost from '../../components/TextPost';
import BlogPostHeader from '../../components/BlogPostHeader';
import ContactWidget from '../../components/ContactWidget';
import { queryContent } from '../../lib/content';
import TextBlock from '../../components/TextBlock';
import Head from 'next/head';
import readingTime from 'reading-time';

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
            <Head>
                <meta
                    name="twitter:label1"
                    content="Geschrieben von"
                    key="twitter:label1"
                />
                <meta
                    name="twitter:data1"
                    content={props.blogPost.author.name}
                    key="twitter:data1"
                />
                <meta
                    name="twitter:label2"
                    content="Geschätze Lesezeit"
                    key="twitter:label2"
                />
                <meta
                    name="twitter:data2"
                    content={`${readingTimeMinutes} Minuten`}
                    key="twitter:data2"
                />

                <meta property="og:type" content="article" key="og:type" />
                <meta
                    property="article:published_time"
                    content={date}
                    key="article:published_time"
                />
                <meta
                    property="article:modified_time"
                    content={date}
                    key="article:modified_time"
                />
                <meta
                    property="article:author"
                    content={props.blogPost.author.name}
                    key="article:author"
                />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `
                        {
                            "@context": "https://schema.org",
                            "@type": "Article",
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": "https://timoclasen.de/blog/${props.blogPost.slug}"
                            },
                            "headline": "${props.blogPost.title}",
                            "image": [
                                "${props.blogPost.previewImage.url}"
                            ],
                            "datePublished": "${date}",
                            "dateModified": "${date}",
                            "author": {
                                "@type": "Person",
                                "name": "${props.blogPost.author.name}"
                            },
                            "publisher": {
                                "@type": "Organization",
                                "name": "${props.blogPost.author.name}",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": "/favicons/android-chrome-192x192.png"
                                }
                            },
                            "description": "${props.blogPost.summary}"
                        }`
                    }}
                />
            </Head>
            <Layout
                preview={props.preview}
                title={props.blogPost.title}
                description={props.blogPost.summary}
                previewImage={props.blogPost.previewImage}
                slug={`blog/${props.blogPost.slug}`}>
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
