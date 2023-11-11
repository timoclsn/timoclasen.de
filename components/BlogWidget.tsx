import { WidgetLayout } from "./WidgetLayout";
import { WidgetText } from "./WidgetText";

interface BlogPost {
  title: string;
  summary: string;
  slug: string;
}

interface Props {
  blogPost1: BlogPost;
  blogPost2: BlogPost;
}

export function BlogWidget({ blogPost1, blogPost2 }: Props) {
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
}
