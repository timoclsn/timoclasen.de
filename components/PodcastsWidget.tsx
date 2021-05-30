import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'react-feather';

import { Podcast } from '../lib/podcasts';
import { Button } from './Button';

interface Props {
    podcasts: Podcast[];
}

export function PodcastsWidget({ podcasts }: Props) {
    return (
        <section id="podcasts">
            <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
                Podcasts
            </h2>
            <div className="flex flex-col justify-between mb-8 space-x-0 space-y-4 sm:space-x-4 sm:space-y-0 sm:flex-row">
                <p>
                    Sie sind eins meiner absoluten Lieblingsmedien. Schau dir
                    an, was ich so regelmäßig höre.
                </p>
                <div className="flex-none">
                    <Link href="/podcasts" passHref>
                        <Button as="a" variant="link">
                            <ArrowRight />
                            Alle Podcasts
                        </Button>
                    </Link>
                </div>
            </div>
            <ul className="flex justify-between space-x-4 overflow-x-auto">
                {podcasts.map((podcast) => (
                    <li key={podcast.title}>
                        <a
                            href={podcast.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer"
                            aria-label={podcast.title}>
                            <Image
                                className="rounded-2xl"
                                src={`/podcasts/${podcast.image}`}
                                quality={60}
                                alt={`Podcast cover von ${podcast.title}`}
                                layout="fixed"
                                width={160}
                                height={160}
                            />
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}
