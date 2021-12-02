import dotenv from 'dotenv';
import { Feed } from 'feed';
import { writeFileSync } from 'fs';
import fetch from 'node-fetch';
import { remark } from 'remark';
import html from 'remark-html';

dotenv.config();

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const publicAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const name = 'Timo Clasen';
const url = 'https://timoclasen.de';
const email = 'timo@timoclasen.de';

(async () => {
  const response = await queryContent(
    `{
      blogPosts: blogPostCollection(order: [date_DESC]) {
        items {
          sys {
            id
          }
          title
          summary
          slug
          date
          text
          author {
            name
            email
            website
          }
        }
      }
    }`
  );

  const blogPosts = response.data.blogPosts.items;

  const feed = new Feed({
    title: `${name} • Blog`,
    description: 'Mein persönlicher Blog',
    id: url,
    link: url,
    language: 'de',
    favicon: `${url}/favicons/favicon.ico`,
    copyright: name,
    feedLinks: {
      rss: `${url}/rss.xml`,
    },
    author: {
      name: name,
      email: email,
      link: url,
    },
  });

  for (const post of blogPosts) {
    feed.addItem({
      title: post.title,
      id: `${url}/blog/${post.slug}`,
      link: `${url}/blog/${post.slug}`,
      description: post.summary,
      content: await markdownToHTML(post.text),
      author: [
        {
          name: post.author.name,
          email: post.author.email,
          link: post.author.website,
        },
      ],
      date: new Date(post.date),
    });
  }

  writeFileSync('./public/rss.xml', feed.rss2());
})();

async function queryContent(query) {
  return fetch(`https://graphql.contentful.com/content/v1/spaces/${spaceId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${publicAccessToken}`,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
}

async function markdownToHTML(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
