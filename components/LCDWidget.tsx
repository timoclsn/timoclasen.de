import Image from 'next/future/image';
import { ArrowRight } from 'react-feather';

import { Button } from './Button';

interface BgImage {
  url: string;
  description: string;
  blurDataURL: string;
}

interface Props {
  bgImage: BgImage;
}

export function LCDWidget({ bgImage }: Props) {
  return (
    <section id="life-centered-design" className="relative">
      <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-3xl sm:aspect-w-2 sm:aspect-h-1">
        <Image
          src={bgImage.url}
          sizes="90vw"
          quality={60}
          alt={bgImage.description}
          blurDataURL={bgImage.blurDataURL}
          placeholder="blur"
        />
      </div>
      <div className="absolute top-0 left-0 flex h-full w-full flex-col justify-end rounded-3xl bg-gradient-to-t from-[rgba(0,0,0,0.3)] px-6 py-12 text-light xl:px-12 xl:py-20">
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
}
