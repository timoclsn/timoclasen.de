import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import readingTime from 'reading-time';
import { z } from 'zod';

import { BlogPostHeader } from '../../components/BlogPostHeader';
import { ContactWidget } from '../../components/ContactWidget';
import { Layout } from '../../components/Layout';
import { SEOBlogPost } from '../../components/SEOBlogPost';
import { TextBlock } from '../../components/TextBlock';
import { TextPost } from '../../components/TextPost';
import { queryContentSave } from '../../lib/content';
import { markdownToHTML, objToUrlParams } from '../../lib/text';

const BlogPost = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (!router.isFallback && !props.blogPost) {
    return (
      <Layout title="Error 404" description="Error 404">
        <TextBlock text={props.error} />
        <ContactWidget text={props.contact} />
      </Layout>
    );
  }

  if (router.isFallback && !props.blogPost) {
    return (
      <Layout title="Seite lädt…" description="Seite lädt…">
        <TextBlock text={props.loading} />
        <ContactWidget text={props.contact} />
      </Layout>
    );
  }

  const date = new Date(props.blogPost.date).toISOString();

  return (
    <Layout
      preview={props.preview}
      title={props.blogPost.title}
      description={props.blogPost.summary}
      previewImage={props.previewImage}
      slug={`blog/${props.blogPost.slug}`}
    >
      <SEOBlogPost
        authorName={props.blogPost.author.name}
        readingTime={props.blogPost.readingTime}
        date={date}
        slug={props.blogPost.slug}
        title={props.blogPost.title}
        description={props.blogPost.summary}
        previewImage={props.previewImage}
      />
      <article className="space-y-8 md:space-y-16">
        <BlogPostHeader
          title={props.blogPost.title}
          subtitle={props.blogPost.subtitle}
          date={props.blogPost.dateFormatted}
          author={props.blogPost.author}
          readingTime={props.blogPost.readingTime}
          sys={props.blogPost.sys}
        />
        <TextPost>{props.blogPost.text}</TextPost>
      </article>
      <ContactWidget text={props.contact} />
    </Layout>
  );
};

export default BlogPost;

export const getStaticProps = (async ({ params, preview = false }) => {
  const blogPostData = await queryContentSave(
    `{
    blogPostCollection(where: {slug: "${params?.slug}"}, limit: 1, preview: false) {
      items {
        sys {
          publishedVersion
        }
        title
        subtitle
        slug
        date
        author {
          name
          username
          profileImageCollection {
            items {
              url
              description
            }
          }
        }
        summary
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
                publishedVersion: z.number().nullable(),
              }),
              title: z.string(),
              subtitle: z.string(),
              slug: z.string(),
              date: z.string(),
              author: z.object({
                name: z.string(),
                username: z.string(),
                profileImageCollection: z.object({
                  items: z.array(
                    z.object({
                      url: z.string().url(),
                      description: z.string(),
                    }),
                  ),
                }),
              }),
              summary: z.string(),
              text: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  const blogPost = blogPostData.data.blogPostCollection.items[0];

  const readingTimeObj = readingTime(blogPost.text);

  const enhancedBlogPost = {
    ...blogPost,
    author: {
      ...blogPost.author,
      name: blogPost.author.name,
      username: blogPost.author.username,
      image: blogPost.author.profileImageCollection.items[1],
    },
    readingTime: Math.ceil(readingTimeObj.minutes),
    dateFormatted: format(parseISO(blogPost.date), 'dd. MMMM yyyy', {
      locale: de,
    }),
  };

  const errorSnippetData = await queryContentSave(
    `{
      textSnippetCollection(where: {title: "Error 404"}, limit: 1, preview: false) {
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

  const errorText =
    errorSnippetData.data.textSnippetCollection.items[0].content;

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
      name: 'Blog • Timo Clasen',
      title: blogPost.title,
      subtitle: `${enhancedBlogPost.dateFormatted} • ${enhancedBlogPost.readingTime} Min`,
    })}`,
    description: 'Teasertext der Seite "Blog" und Profilfoto von Timo Clasen',
  };

  return {
    props: {
      preview,
      blogPost: enhancedBlogPost,
      previewImage,
      error: await markdownToHTML(errorText),
      loading: await markdownToHTML('# Seite lädt…'),
      contact: await markdownToHTML(contactText),
    },
  };
}) satisfies GetStaticProps;

export const getStaticPaths = (async () => {
  const blogPostsData = await queryContentSave(
    `{
    blogPostCollection(preview: false) {
      items {
        slug
      }
    }
  }`,
    z.object({
      data: z.object({
        blogPostCollection: z.object({
          items: z.array(
            z.object({
              slug: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  const blogPosts = blogPostsData.data.blogPostCollection.items;

  return {
    paths: blogPosts.map((blogPost: { slug: string }) => {
      return {
        params: {
          slug: blogPost.slug,
        },
      };
    }),
    fallback: true,
  };
}) satisfies GetStaticPaths;
