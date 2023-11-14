import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";
import { createElement } from "react";
import { z } from "zod";

import { OGImage } from "../../../components/OGImage";
import { getPerson } from "../../../data/content";

export const config = {
  runtime: "edge",
};

const fontRegular = fetch(
  new URL("../../public/fonts/Inter-Regular.woff", import.meta.url),
).then((res) => res.arrayBuffer());

const fontBold = fetch(
  new URL("../../public/fonts/Inter-Bold.woff", import.meta.url),
).then((res) => res.arrayBuffer());

export default async function OGImageAPI(req: NextRequest) {
  const fontRegularData = await fontRegular;
  const fontBoldData = await fontBold;

  const { searchParams } = new URL(req.url);
  const name = z.string().parse(searchParams.get("name"));
  const title = searchParams.get("title");
  const subtitle = searchParams.get("subtitle");
  const image = searchParams.get("image");

  const person = await getPerson();
  const fallbackImage = person.profileImageCollection.items[1];

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
        name: "Inter",
        data: fontRegularData,
        style: "normal",
        weight: 400,
      },
      {
        name: "Inter",
        data: fontBoldData,
        style: "normal",
        weight: 700,
      },
    ],
  });
}
