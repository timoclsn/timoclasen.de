import dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import { globby } from 'globby';
import fetch from 'node-fetch';
import prettier from 'prettier';

dotenv.config();

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const publicAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

(async () => {
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');

    const pages = await globby([
        'pages/**/*tsx',
        '!pages/_*.tsx',
        '!pages/404.tsx',
        '!pages/blog/*.tsx',
        '!pages/api'
    ]);

    const response = await queryContent(
        `{
            blogPosts: blogPostCollection {
                items {
                    slug
                }
            }
        }`
    );

    const blogPosts = response.data.blogPosts.items;

    blogPosts.forEach((blogPost) => {
        pages.push(`pages/blog/${blogPost.slug}.tsx`);
    });

    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
                .map((page) => {
                    const path = page.replace('pages', '').replace('.tsx', '');
                    const route = path === '/index' ? '' : path;

                    return `
                        <url>
                            <loc>${`https://timoclasen.de${route}`}</loc>
                        </url>
                    `;
                })
                .join('')}
        </urlset>
    `;

    const formatted = prettier.format(sitemap, {
        ...prettierConfig,
        parser: 'html'
    });

    writeFileSync('./public/sitemap.xml', formatted);
})();

async function queryContent(query) {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${publicAccessToken}`
            },
            body: JSON.stringify({ query })
        }
    ).then((response) => response.json());
}
