import { Feed } from "feed";
import { query } from "../../api/query";
import { markdownToHTML } from "../../lib/text";

const name = "Timo Clasen";
const email = "timo@timoclasen.de";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const origin = `${url.protocol}//${url.host}`;
  const buildUrl = (path: string) => `${origin}${path}`;

  const feed = new Feed({
    title: `${name} | Blog`,
    description: "Mein persönlicher Blog",
    id: buildUrl(""),
    link: buildUrl(""),
    language: "de",
    favicon: `${buildUrl("")}/favicon.png`,
    copyright: name,
    feedLinks: {
      rss: `${buildUrl("")}/rss.xml`,
    },
    author: {
      name: name,
      email: email,
      link: buildUrl(""),
    },
  });

  const blogPosts = await query.content.getBlogPosts();

  for (const blogPost of blogPosts) {
    feed.addItem({
      title: blogPost.title,
      id: buildUrl(`/blog/${blogPost.slug}`),
      link: buildUrl(`/blog/${blogPost.slug}`),
      content: await markdownToHTML(blogPost.text),
      author: [
        {
          name,
          email,
          link: buildUrl(""),
        },
      ],
      date: new Date(blogPost.date),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
