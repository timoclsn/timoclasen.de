import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { query } from "../../api/query";
import { Button } from "../../design-system/Button";
import { getPlaceholder } from "../../lib/placeholder";

export const LCDWidget = async () => {
  const lcdImage = await query.content.image("Life Centered Design.Net");
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
      <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-end rounded-3xl bg-gradient-to-t from-[rgba(0,0,0,0.3)] px-6 py-4 text-light sm:py-12 xl:px-12 xl:py-20">
        <div className="text-opacity-100">
          <h2 className="text-2xl font-bold sm:text-3xl md:mb-2 md:text-4xl lg:text-5xl">
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
