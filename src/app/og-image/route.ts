import { ImageResponse } from "@vercel/og";
import { createElement } from "react";
import { z } from "zod";
import { OGImage } from "../../components/OGImage/OGImage";
import { queryContent } from "../../lib/content";

export const runtime = "edge";
export const alt = "Timo Clasen Portfolio";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const fontRegular = fetch(
  new URL("../../public/fonts/Inter-Regular.woff", import.meta.url),
).then((res) => res.arrayBuffer());

const fontBold = fetch(
  new URL("../../public/fonts/Inter-Bold.woff", import.meta.url),
).then((res) => res.arrayBuffer());

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const name = z.string().parse(searchParams.get("name"));
  const title = searchParams.get("title");
  const subtitle = searchParams.get("subtitle");
  const image = searchParams.get("image");

  const response = await queryContent(
    `{
      personCollection(where: {name: "Timo Clasen"}, limit: 1, preview: false) {
        items {
          profileImageCollection {
            items {
              url
            }
          }
        }
      }
    }`,
    z.object({
      data: z.object({
        personCollection: z.object({
          items: z.array(
            z.object({
              profileImageCollection: z.object({
                items: z.array(z.object({ url: z.string() })),
              }),
            }),
          ),
        }),
      }),
    }),
  );

  const person = response.data.personCollection.items[0];
  const fallbackImage = person.profileImageCollection.items[1];

  const reactElement = createElement(OGImage, {
    name,
    title: title || undefined,
    subtitle: subtitle || undefined,
    image: image || fallbackImage.url,
  });

  return new ImageResponse(reactElement, {
    ...size,
    fonts: [
      {
        name: "Inter",
        data: await fontRegular,
        style: "normal",
        weight: 400,
      },
      {
        name: "Inter",
        data: await fontBold,
        style: "normal",
        weight: 700,
      },
    ],
  });
};
