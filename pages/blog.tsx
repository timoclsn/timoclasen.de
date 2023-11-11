import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import readingTime from 'reading-time';
import { z } from 'zod';

import { BlogPostPreview } from '../components/BlogPostPreview';
import { ContactWidget } from '../components/ContactWidget';
import { Layout } from '../components/Layout';
import { queryContentSave } from '../lib/content';
import { markdownToHTML, objToUrlParams } from '../lib/text';

const Blog = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout
      preview={props.preview}
      title={props.title}
      description={props.description}
      previewImage={props.previewImage}
      slug={props.slug}
    >
      {props.blogPosts.map((post) => (
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
};

export default Blog;

export const getStaticProps = (async ({ preview = false }) => {
  const pageDate = await queryContentSave(
    `{
      pageCollection(where: {slug: "blog"}, limit: 1, preview: false) {
        items {
          title
          slug
          description
        }
      }
    }`,
    z.object({
      data: z.object({
        pageCollection: z.object({
          items: z.array(
            z.object({
              title: z.string(),
              slug: z.string(),
              description: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  const page = pageDate.data.pageCollection.items[0];

  const blogPostsData = await queryContentSave(
    `{
      blogPostCollection(order: [date_DESC], preview: false) {
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
    }`,
    z.object({
      data: z.object({
        blogPostCollection: z.object({
          items: z.array(
            z.object({
              sys: z.object({
                id: z.string(),
                publishedVersion: z.number().nullable(),
              }),
              title: z.string(),
              subtitle: z.string(),
              slug: z.string(),
              date: z.string(),
              text: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  const blogPosts = blogPostsData.data.blogPostCollection.items.map(
    (blogPost) => {
      const readingTimeObj = readingTime(blogPost.text);
      return {
        ...blogPost,
        readingTime: Math.ceil(readingTimeObj.minutes),
        text: '',
        dateFormatted: format(parseISO(blogPost.date), 'dd. MMMM yyyy', {
          locale: de,
        }),
      };
    },
  );

  const contactSnippetData = await queryContentSave(
    `{
      textSnippetCollection(where: {title: "Contact Widget"}, limit: 1, preview: false) {
        items {
          content
        }
      }
    }`,
    z.object({
      data: z.object({
        textSnippetCollection: z.object({
          items: z.array(
            z.object({
              content: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  const contactText =
    contactSnippetData.data.textSnippetCollection.items[0].content;

  const previewImage = {
    url: `https://timoclasen.de/api/og-image?${objToUrlParams({
      name: `${page.title} • Timo Clasen`,
    })}`,
    description: `Teasertext der Seite "${page.title}" und Profilfoto von Timo Clasen`,
  };

  return {
    props: {
      preview,
      title: page.title,
      description: page.description,
      previewImage,
      slug: page.slug,
      blogPosts,
      contact: await markdownToHTML(contactText),
    },
  };
}) satisfies GetStaticProps;
