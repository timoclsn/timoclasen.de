import { z } from "zod";
import { queryContent } from "../../lib/content";
import readingTime from "reading-time";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { BlogPostPreview } from "../../components/BlogPostPreview";
import { ContactWidget } from "../../components/ContactWidget";

const BlogPage = async () => {
  const blogPostsData = await queryContent(
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
        text: "",
        dateFormatted: format(parseISO(blogPost.date), "dd. MMMM yyyy", {
          locale: de,
        }),
      };
    },
  );

  return (
    <>
      {blogPosts.map((post) => (
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
      <ContactWidget />
    </>
  );
};

export default BlogPage;
