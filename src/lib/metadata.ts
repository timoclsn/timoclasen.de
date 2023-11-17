import { Metadata } from "next";
import { queryContent } from "./content";
import { z } from "zod";

export const createGenerateMetadata = (
  generateMetadata: ({
    params,
  }: {
    params: { slug: string };
  }) => Promise<Metadata>,
) => generateMetadata;

export const ogImage = async (options: {
  name?: string;
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

  // Fallback values
  if (!options.name) {
    const name = "Timo Clasen";
    searchParams.set("name", name);
  }

  if (!options.title) {
    const title =
      "Designer und Entwickler mit Leidenschaft für gut gemachte, digitale Produkte.";
    searchParams.set("title", title);
  }

  if (!options.image) {
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
    const image = person.profileImageCollection.items[1];

    searchParams.set("image", image.url);
  }

  return `/og-image?${searchParams}`;
};

export const openGraph = async (
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
    url: await ogImage({
      name: slug === "/" ? "Timo Clasen" : `${title} • Timo Clasen`,
    }),
    alt: `Teasertext der Seite "${title}" und Profilfoto von Timo Clasen`,
    width: 1200,
    height: 630,
  },
});
