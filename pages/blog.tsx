import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import readingTime from 'reading-time';

import BlogPostPreview from '@/components/BlogPostPreview';
import ContactWidget from '@/components/ContactWidget';
import Layout from '@/components/Layout';
import { queryContent } from '@/lib/content';
import { markdownToHTML } from '@/lib/text';
import { GetStaticProps } from 'next';

export default function Blog(props: any) {
    return (
        <Layout
            preview={props.preview}
            title={props.title}
            description={props.description}
            previewImage={props.previewImage}
            slug={props.slug}>
            {props.blogPosts.map((post: any) => (
                <BlogPostPreview
                    title={post.title}
                    subtitle={post.subtitle}
                    date={post.dateFormatted}
                    slug={post.slug}
                    readingTime={post.readingTime}
                    key={post.sys.id}
                    sys={post.sys}
                />
            ))}
            <ContactWidget text={props.contact} />
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
    const response = await queryContent(
        `{
            page: pageCollection(where: {slug: "blog"}, limit: 1, preview: false) {
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
            blogPosts: blogPostCollection(order: [date_DESC], preview: false) {
                items {
                    sys {
                        id
                        publishedVersion
                    }
                    title
                    subtitle
                    slug
                    date
                    text
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

    const blogPosts = response.data.blogPosts.items.map((blogPost: any) => {
        const readingTimeObj = readingTime(blogPost.text);
        blogPost.readingTime = Math.ceil(readingTimeObj.minutes);

        delete blogPost.text;

        blogPost.dateFormatted = format(
            parseISO(blogPost.date),
            'dd. MMMM yyyy',
            {
                locale: de
            }
        );

        return blogPost;
    });

    const contactText = response.data.contactSnippet.items[0].content;

    return {
        props: {
            preview,
            title: page.title,
            description: page.description,
            previewImage: page.previewImage,
            slug: page.slug,
            blogPosts,
            contact: await markdownToHTML(contactText)
        }
    };
};
