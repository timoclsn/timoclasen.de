import Image from "next/image";
import { ArrowRight } from "react-feather";
import { Button } from "./Button";
import { queryContent } from "../lib/content";
import { z } from "zod";
import { getPlaceholder } from "../lib/placeholder";

export const LCDWidget = async () => {
  const lcdImageData = await queryContent(
    `{
      assetCollection(where: {title: "Life Centered Design.Net"}, limit: 1, preview: false) {
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

  const lcdImage = lcdImageData.data.assetCollection.items[0];
  const { base64: LCDImageBase64 } = await getPlaceholder(lcdImage.url);
  const enhancedLcdImage = { ...lcdImage, blurDataURL: LCDImageBase64 };

  return (
    <section id="life-centered-design" className="relative">
      <div className="aspect-h-2 aspect-w-3 relative overflow-hidden rounded-3xl sm:aspect-h-1 sm:aspect-w-2">
        <Image
          src={enhancedLcdImage.url}
          width="2200"
          height="1100"
          sizes="90vw"
          quality={60}
          alt={enhancedLcdImage.description}
          blurDataURL={enhancedLcdImage.blurDataURL}
          placeholder="blur"
          className="object-cover"
        />
      </div>
      <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-end rounded-3xl bg-gradient-to-t from-[rgba(0,0,0,0.3)] px-6 py-12 text-light xl:px-12 xl:py-20">
        <div className="text-opacity-100">
          <h2 className="mb-1 text-2xl font-bold sm:text-3xl md:mb-2 md:text-4xl lg:text-5xl">
            Life Centered Design.Net
          </h2>
          <p className="mb-2 text-sm sm:text-base md:mb-4 md:text-lg lg:text-xl xl:text-2xl">
            Informationen, Ressourcen und mehr zum Thema Life Centered Design
          </p>
          <Button
            as="a"
            variant="link"
            href="https://lifecentereddesign.net"
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
