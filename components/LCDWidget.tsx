import Image from 'next/image';
import { ArrowRight } from 'react-feather';

import { Button } from './Button';

interface BgImage {
    url: string;
    description: string;
}

interface Props {
    bgImage: BgImage;
}

export function LCDWidget({ bgImage }: Props) {
    return (
        <section id="life-centered-design" className="relative">
            <div className="aspect-w-3 sm:aspect-w-2 aspect-h-2 sm:aspect-h-1 bg-highlight dark:bg-highlight-dark rounded-3xl">
                <Image
                    src={bgImage.url}
                    layout={'fill'}
                    objectFit="cover"
                    objectPosition="center"
                    sizes="90vw"
                    quality={60}
                    alt={bgImage.description}
                    className="rounded-3xl"
                />
            </div>
            <div className="absolute top-0 left-0 flex flex-col justify-end w-full h-full px-6 py-12 bg-gradient-to-t from-[rgba(0,0,0,0.3)] text-light xl:px-12 xl:py-20 rounded-3xl">
                <div className="text-opacity-100">
                    <h2 className="mb-1 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl md:mb-2">
                        Life Centered Design.Net
                    </h2>
                    <p className="mb-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl md:mb-4">
                        Informationen, Ressourcen und mehr zum Thema Life
                        Centered Design
                    </p>
                    <Button
                        as="a"
                        variant="link"
                        href="https://lifecentereddesign.net"
                        target="_blank"
                        rel="nooperner">
                        <ArrowRight />
                        Zum Projekt
                    </Button>
                </div>
            </div>
        </section>
    );
}
