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

export function MLWidget({ bgImage }: Props) {
  return (
    <section id="makers-league" className="relative rounded-3xl bg-[#E5F0F2]">
      <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-3xl sm:aspect-w-2 sm:aspect-h-1">
        <Image
          src={bgImage.url}
          sizes="90vw"
          quality={90}
          alt={bgImage.description}
          className="hidden rounded-3xl sm:block"
          blurDataURL={bgImage.blurDataURL}
          placeholder="blur"
        />
      </div>
      <div className="absolute top-0 left-0 flex h-full w-full flex-col justify-end rounded-3xl px-6 py-12 text-dark xl:px-12 xl:py-20">
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
}
