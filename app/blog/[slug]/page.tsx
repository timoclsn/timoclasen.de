import { BlogPostHeader } from "../../../components/BlogPostHeader";
import { ContactWidget } from "../../../components/ContactWidget";
import { MDXContent } from "../../../components/MDXContent/MDXContent";
import { getBlogPost, getBlogPosts } from "../../../data/content";
import { createGenerateMetadata, ogImage } from "../../../lib/metadata";

export const generateMetadata = createGenerateMetadata(async ({ params }) => {
  const { slug } = params;
  const blogPost = await getBlogPost(slug);

  return {
    title: blogPost.title,
    description: blogPost.summary,
    openGraph: {
      type: "article",
      title: blogPost.title,
      authors: "Timo Clasen",
      url: `https://timoclasen.de/blog/${slug}`,
      publishedTime: blogPost.date,
      modifiedTime: blogPost.date,
      siteName: "Timo Clasen",
      description: blogPost.summary,
      images: {
        url: ogImage({
          name: "Blog • Timo Clasen",
          title: blogPost.title,
          subtitle: `${blogPost.dateFormatted} • ${blogPost.readingTime} Min`,
        }),
        alt: 'Teasertext der Seite "Blog" und Profilfoto von Timo Clasen',
        width: 1200,
        height: 630,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: blogPost.title,
      description: blogPost.summary,
      site: "@timoclsn",
      creator: "@timoclsn",
    },
  };
});

export const generateStaticParams = async () => {
  const blogPosts = await getBlogPosts();
  return blogPosts.map((blogPost) => ({
    slug: blogPost.slug,
  }));
};

interface Props {
  params: {
    slug: string;
  };
}

const BlogPostPage = async ({ params }: Props) => {
  const { slug } = params;
  const blogPost = await getBlogPost(slug);

  return (
    <>
      <article className="space-y-8 md:space-y-16">
        <BlogPostHeader
          title={blogPost.title}
          subtitle={blogPost.subtitle}
          date={blogPost.dateFormatted}
          author={blogPost.author}
          readingTime={blogPost.readingTime}
          sys={blogPost.sys}
        />
        <MDXContent source={blogPost.text} />
      </article>
      <ContactWidget />
    </>
  );
};

export default BlogPostPage;
