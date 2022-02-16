import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import type { NextPage } from 'next';
import type { GetStaticProps } from 'next';
import readingTime from 'reading-time';

import { BlogPostPreview } from '../components/BlogPostPreview';
import { ContactWidget } from '../components/ContactWidget';
import { Layout } from '../components/Layout';
import { queryContent } from '../lib/content';
import { markdownToHTML, objToUrlParams } from '../lib/text';

export interface BlogPost {
  sys: {
    id: string;
    publishedVersion: string;
  };
  title: string;
  subtitle: string;
  date: string;
  dateFormatted: string;
  slug: string;
  previewImage: {
    url: string;
    description: string;
  };
  readingTime: number;
  author: {
    name: string;
    username: string;
    image: {
      url: string;
      description: string;
    };
  };
  summary: string;
  text: string;
}
interface Props {
  preview: boolean;
  title: string;
  description: string;
  slug: string;
  previewImage: {
    url: string;
    description: string;
  };
  aboutTeaser: string;
  blogPosts: BlogPost[];
  contact: string;
}

const Blog: NextPage<Props> = function (props) {
  return (
    <Layout
      preview={props.preview}
      title={props.title}
      description={props.description}
      previewImage={props.previewImage}
      slug={props.slug}
    >
      {props.blogPosts.map((post: BlogPost) => (
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

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const response = await queryContent(
    `{
        page: pageCollection(where: {slug: "blog"}, limit: 1, preview: false) {
            items {
                title
                slug
                description
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

  const blogPosts = response.data.blogPosts.items.map((blogPost: BlogPost) => {
    const readingTimeObj = readingTime(blogPost.text);
    blogPost.readingTime = Math.ceil(readingTimeObj.minutes);

    blogPost.text = '';

    blogPost.dateFormatted = format(parseISO(blogPost.date), 'dd. MMMM yyyy', {
      locale: de,
    });

    return blogPost;
  });

  const contactText = response.data.contactSnippet.items[0].content;

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
};
