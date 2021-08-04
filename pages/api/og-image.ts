import type { NextApiRequest, NextApiResponse } from 'next';
import * as playwright from 'playwright-aws-lambda';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { OGImage } from '../../components/OGImage';
import { queryContent } from '../../lib/content';

export default async function OGImageAPI(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        query: { name, title, subtitle, image }
    } = req;

    const response = await queryContent(
        `{
            image: assetCollection(where: {title: "OG-Image"}, limit: 1, preview: false) {
                items {
                    url
                }
            }
        }`
    );

    const reactElement = createElement(OGImage, {
        name: name as string,
        title: title as string,
        subtitle: subtitle as string,
        image: (image as string) || (response.data.image.items[0].url as string)
    });
    const body = renderToStaticMarkup(reactElement);
    const html = getHtmlData(body);

    const width = 1200;
    const height = 630;

    const browser = await playwright.launchChromium({ headless: true });
    const page = await browser.newPage({
        viewport: {
            width,
            height
        }
    });
    await page.setContent(html, { waitUntil: 'networkidle' });

    const data = await page.screenshot({
        type: 'jpeg',
        clip: {
            x: 0,
            y: 0,
            width,
            height
        },
        omitBackground: true
    });

    await browser.close();

    res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate');
    res.setHeader('Content-Type', 'image/jpeg');

    res.end(data);
}

function getHtmlData(body: string) {
    return `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
            <style>*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,sans-serif}</style>
        </head>
        <body>
            ${body}
        </body>
    </html>`;
}
