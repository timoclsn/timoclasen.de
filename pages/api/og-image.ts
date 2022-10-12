import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';
import { createElement } from 'react';

import { OGImage } from '../../components/OGImage';
import { queryContent } from '../../lib/content';

export const config = {
  runtime: 'experimental-edge',
};

export default async function OGImageAPI(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');
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
    const fallbackImage = person.profileImageCollection.items[1];

    const reactElement = createElement(OGImage, {
      name: name as string,
      title: title as string,
      subtitle: subtitle as string,
      image: (image as string) || (fallbackImage.url as string),
    });

    return new ImageResponse(reactElement, {
      width: 1200,
      height: 630,
    });
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
