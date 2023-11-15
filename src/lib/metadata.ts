import { Metadata } from "next";

export const createGenerateMetadata = (
  generateMetadata: ({
    params,
  }: {
    params: { slug: string };
  }) => Promise<Metadata>,
) => generateMetadata;

export const ogImage = (options: {
  name: string;
  title?: string;
  subtitle?: string;
  image?: string;
}) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(options)) {
    if (value) {
      searchParams.set(key, value);
    }
  }

  return `/og-image?${searchParams}`;
};

export const openGraph = (
  title: string,
  description: string,
  slug: string,
) => ({
  siteName: "Timo Clasen",
  type: "website",
  url: slug,
  title,
  description,
  images: {
    url: ogImage({
      name: slug === "/" ? "Timo Clasen" : `${title} • Timo Clasen`,
    }),
    alt: `Teasertext der Seite "${title}" und Profilfoto von Timo Clasen`,
    width: 1200,
    height: 630,
  },
});
