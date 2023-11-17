import { BlogPostPreview } from "../../components/BlogPost/BlogPostPreview";
import { ContactWidget } from "../../components/ContactWidget/ContactWidget";
import { getBlogPosts, getMetadata } from "../../data/content";
import { createGenerateMetadata, openGraph } from "../../lib/metadata";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } = await getMetadata("blog");

  return {
    title,
    description,
    openGraph: {
      ...(await openGraph(title, description, slug)),
    },
  };
});

const BlogPage = async () => {
  const blogPosts = await getBlogPosts();

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
