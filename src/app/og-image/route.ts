import { ImageResponse } from "@vercel/og";
import { createElement } from "react";
import { OGImage } from "../../components/OGImage/OGImage";

export const runtime = "edge";

const fontRegular = fetch(
  new URL("../../../public/fonts/Inter-Regular.woff", import.meta.url),
).then((res) => res.arrayBuffer());

const fontBold = fetch(
  new URL("../../../public/fonts/Inter-Bold.woff", import.meta.url),
).then((res) => res.arrayBuffer());

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const name = searchParams.get("name");
  const title = searchParams.get("title");
  const subtitle = searchParams.get("subtitle");
  const image = searchParams.get("image");

  const reactElement = createElement(OGImage, {
    name: name || undefined,
    title: title || undefined,
    subtitle: subtitle || undefined,
    image: image || undefined,
  });

  return new ImageResponse(reactElement, {
    width: 1200,
    height: 630,
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
