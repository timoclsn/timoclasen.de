require('dotenv').config();
const fs = require('fs');
const globby = require('globby');
const prettier = require('prettier');
const fetch = require('node-fetch');

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const publicAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

(async () => {
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');

    // Ignore Next.js specific files (e.g., _app.js) and API routes.
    const pages = await globby([
        'pages/**/*js',
        '!pages/_*.js',
        '!pages/blog/*.js',
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

    for (let i = 0; i < blogPosts.length; i++) {
        const post = blogPosts[i];
        pages.push(`pages/blog/${post.slug}.js`);
    }

    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
                .map((page) => {
                    const path = page
                        .replace('pages', '')
                        .replace('.js', '')
                        .replace('.mdx', '');
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

    // If you're not using Prettier, you can remove this.
    const formatted = prettier.format(sitemap, {
        ...prettierConfig,
        parser: 'html'
    });

    fs.writeFileSync('./public/sitemap.xml', formatted);
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
