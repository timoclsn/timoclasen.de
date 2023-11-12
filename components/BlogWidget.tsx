import { z } from "zod";
import { queryContent } from "../lib/content";
import { WidgetLayout } from "./WidgetLayout";
import { WidgetText } from "./WidgetText";

export const BlogWidget = async () => {
  const blogPostsData = await queryContent(
    `{
      blogPostCollection(order: [date_DESC], limit: 2, preview: false) {
        items {
          title
          summary
          slug
        }
      }
    }`,
    z.object({
      data: z.object({
        blogPostCollection: z.object({
          items: z.array(
            z.object({
              title: z.string(),
              summary: z.string(),
              slug: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  const blogPosts = blogPostsData.data.blogPostCollection.items;
  const blogPost1 = blogPosts[0];
  const blogPost2 = blogPosts[1];

  return (
    <WidgetLayout>
      <WidgetText
        title={blogPost1.title}
        text={blogPost1.summary}
        linkText="Lesen"
        href={`/blog/${blogPost1.slug}`}
      />
      <WidgetText
        title={blogPost2.title}
        text={blogPost2.summary}
        linkText="Lesen"
        href={`/blog/${blogPost2.slug}`}
      />
    </WidgetLayout>
  );
};
