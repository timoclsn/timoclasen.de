import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';
import { createElement } from 'react';
import { z } from 'zod';

import { OGImage } from '../../components/OGImage';
import { queryContent } from '../../lib/content';

export const config = {
  runtime: 'experimental-edge',
};

const font = fetch(
  new URL('../../public/fonts/inter-var-latin.woff', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function OGImageAPI(req: NextRequest) {
  const fontData = await font;
  try {
    const { searchParams } = new URL(req.url);
    const name = z.string().parse(searchParams.get('name'));
    const title = searchParams.get('title');
    const subtitle = searchParams.get('subtitle');
    const image = searchParams.get('image');

    const response = await queryContent(
      `{
      person: personCollection(where: {name: "Timo Clasen"}, limit: 1, preview: false) {
        items {
          profileImageCollection {
            items {
              url
            }
          }
        }
      }
    }`
    );

    const person = response.data.person.items[0];
    const fallbackImage = person.profileImageCollection.items[1] as Record<
      'url',
      string
    >;

    const reactElement = createElement(OGImage, {
      name,
      title: title || undefined,
      subtitle: subtitle || undefined,
      image: image || fallbackImage.url,
    });

    return new ImageResponse(reactElement, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
        },
      ],
    });
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
