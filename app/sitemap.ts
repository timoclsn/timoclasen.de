import { getBlogPosts } from "../data/content";

export const dynamic = "force-dynamic";

const sitemap = async () => {
  const origin = "https://timoclasen.de";
  const buildUrl = (path: string) => `${origin}${path}`;

  const pages = ["/", "/ueber", "/blog", "/podcasts", "/musik", "/impressum"];

  const blogPosts = await getBlogPosts();

  blogPosts.forEach((blogPost) => {
    pages.push(`/blog/${blogPost.slug}`);
  });

  return pages.map((page) => ({
    url: buildUrl(page),
    lastModified: new Date(),
  }));
};

export default sitemap;
