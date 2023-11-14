import { BlogPostPreview } from "../../components/BlogPostPreview";
import { ContactWidget } from "../../components/ContactWidget";
import { getBlogPosts, getMetadata } from "../../data/content";
import { createGenerateMetadata, ogImage } from "../../lib/metadata";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } = await getMetadata("blog");

  return {
    title,
    description,
    openGraph: {
      siteName: "Timo Clasen",
      type: "website",
      url: `https://timoclasen.de/${slug}`,
      title,
      description,
      images: {
        url: ogImage({
          name: `${title} • Timo Clasen`,
        }),
        alt: `Teasertext der Seite "${title}" und Profilfoto von Timo Clasen`,
        width: 1200,
        height: 630,
      },
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
