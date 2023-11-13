import Image from "next/image";
import { ArrowRight } from "react-feather";
import { z } from "zod";
import { queryContent } from "../lib/content";
import { getPlaceholder } from "../lib/placeholder";
import { Button } from "./Button";

export const MLWidget = async () => {
  const mlImageData = await queryContent(
    `{
      assetCollection(where: {title: "Makersleague.de"}, limit: 1, preview: false) {
        items {
          url
          description
        }
      }
    }`,
    z.object({
      data: z.object({
        assetCollection: z.object({
          items: z.array(
            z.object({
              url: z.string().url(),
              description: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  const mlImage = mlImageData.data.assetCollection.items[0];
  const { base64: MLImageBase64 } = await getPlaceholder(mlImage.url);
  const enhancedMlImage = { ...mlImage, blurDataURL: MLImageBase64 };

  return (
    <section id="makers-league" className="relative rounded-3xl bg-[#E5F0F2]">
      <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-3xl sm:aspect-h-1 sm:aspect-w-2">
        <Image
          src={enhancedMlImage.url}
          width="2200"
          height="1100"
          sizes="90vw"
          quality={90}
          alt={enhancedMlImage.description}
          className="hidden rounded-3xl sm:block"
          blurDataURL={enhancedMlImage.blurDataURL}
          placeholder="blur"
        />
      </div>
      <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-end rounded-3xl px-6 py-12 text-dark xl:px-12 xl:py-20">
        <div>
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl md:mb-2 md:text-4xl lg:text-5xl">
            Makers League e. V.
          </h2>
          <Button
            as="a"
            variant="link"
            href="https://makersleague.de"
            target="_blank"
            rel="noopener"
          >
            <ArrowRight />
            Zum Projekt
          </Button>
        </div>
      </div>
    </section>
  );
};
