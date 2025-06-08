import { query } from "../../../api/query";
import { BlogPostHeader } from "../../../components/BlogPost/BlogPostHeader";
import { ContactWidget } from "../../../components/ContactWidget/ContactWidget";
import { StructuredData } from "../../../components/StructuredData/StructuredData";
import { Mdx } from "../../../design-system/Markdown/Mdx";
import { createGenerateMetadata, ogImage } from "../../../lib/metadata";

export const generateMetadata = createGenerateMetadata(async ({ params }) => {
  const { slug } = await params;
  const blogPost = await query.content.blogPost(slug);

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
        url: await ogImage({
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
  const blogPosts = await query.content.blogPosts();
  return blogPosts.map((blogPost) => ({
    slug: blogPost.slug,
  }));
};

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const BlogPostPage = async ({ params }: Props) => {
  const { slug } = await params;
  const blogPost = await query.content.blogPost(slug);

  return (
    <>
      <StructuredData type="Article">
        {{
          "@context": "https://schema.org",
          "@type": "Article",
          mainEntityOfPage: {
            "@type": "BlogPosting",
            "@id": `https://timoclasen.de/blog/${blogPost.slug}`,
          },
          headline: blogPost.title,
          datePublished: blogPost.date,
          dateModified: blogPost.date,
          author: {
            "@type": "Person",
            name: "Timo Clasen",
          },
          publisher: {
            "@type": "Organization",
            name: "Timo clasen",
            logo: {
              "@type": "ImageObject",
              url: "/favicon.png",
            },
          },
          description: blogPost.summary,
        }}
      </StructuredData>
      <article className="space-y-8 md:space-y-16">
        <BlogPostHeader
          title={blogPost.title}
          subtitle={blogPost.subtitle}
          date={blogPost.dateFormatted}
          author={blogPost.author}
          readingTime={blogPost.readingTime}
          sys={blogPost.sys}
        />
        <Mdx>{blogPost.text}</Mdx>
      </article>
      <ContactWidget />
    </>
  );
};

export default BlogPostPage;
