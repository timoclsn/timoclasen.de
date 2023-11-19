import { query } from "../../api/query";
import { TextWidget } from "../Widget/TextWidget";
import { WidgetLayout } from "../Widget/WidgetLayout";

export const BlogWidget = async () => {
  const blogPosts = await query.content.blogPosts();
  const blogPost1 = blogPosts[0];
  const blogPost2 = blogPosts[1];

  return (
    <WidgetLayout>
      <TextWidget
        title={blogPost1.title}
        text={blogPost1.summary}
        linkText="Lesen"
        href={`/blog/${blogPost1.slug}`}
      />
      <TextWidget
        title={blogPost2.title}
        text={blogPost2.summary}
        linkText="Lesen"
        href={`/blog/${blogPost2.slug}`}
      />
    </WidgetLayout>
  );
};
