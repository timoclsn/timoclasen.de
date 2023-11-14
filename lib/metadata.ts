import { Metadata } from "next";

export const createGenerateMetadata = (
  generateMetadata: ({
    params,
  }: {
    params: { slug: string };
  }) => Promise<Metadata>,
) => generateMetadata;

interface OgImageOptions {
  name?: string | null;
  title?: string | null;
  subtitle?: string | null;
  image?: string | null;
}

export const ogImage = ({
  name,
  title,
  subtitle,
  image,
}: OgImageOptions = {}) => {
  const searchParams = new URLSearchParams();

  if (name) {
    searchParams.set("name", name);
  }

  if (title) {
    searchParams.set("title", title);
  }

  if (subtitle) {
    searchParams.set("subtitle", subtitle);
  }

  if (image) {
    searchParams.set("image", image);
  }

  return `/og-image${
    searchParams.toString() ? "?" : ""
  }${searchParams.toString()}`;
};
