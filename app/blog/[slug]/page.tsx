import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import readingTime from "reading-time";
import { z } from "zod";
import { BlogPostHeader } from "../../../components/BlogPostHeader";
import { ContactWidget } from "../../../components/ContactWidget";
import { TextPost } from "../../../components/TextPost";
import { queryContent } from "../../../lib/content";

interface Props {
  params: {
    slug: string;
  };
}

const BlogPostPage = async ({ params }: Props) => {
  const { slug } = params;

  const blogPostData = await queryContent(
    `{
    blogPostCollection(where: {slug: "${slug}"}, limit: 1, preview: false) {
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
    dateFormatted: format(parseISO(blogPost.date), "dd. MMMM yyyy", {
      locale: de,
    }),
  };

  return (
    <>
      <article className="space-y-8 md:space-y-16">
        <BlogPostHeader
          title={enhancedBlogPost.title}
          subtitle={enhancedBlogPost.subtitle}
          date={enhancedBlogPost.dateFormatted}
          author={enhancedBlogPost.author}
          readingTime={enhancedBlogPost.readingTime}
          sys={enhancedBlogPost.sys}
        />
        <TextPost>{enhancedBlogPost.text}</TextPost>
      </article>
      <ContactWidget />
    </>
  );
};

export default BlogPostPage;
