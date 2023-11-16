import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../../design-system/Button";
import { getFavoritePodcasts } from "../../data/podcasts/podcasts";

export function PodcastsWidget() {
  const podcasts = getFavoritePodcasts();
  return (
    <section id="podcasts">
      <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
        Podcasts
      </h2>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row">
        <p>
          Sie sind eins meiner absoluten Lieblingsmedien. Schau dir an, was ich
          so regelmäßig höre.
        </p>
        <div className="flex-none">
          <Link href="/podcasts" passHref legacyBehavior>
            <Button as="a" variant="link">
              <ArrowRight />
              Alle Podcasts
            </Button>
          </Link>
        </div>
      </div>
      <ul className="flex snap-x justify-between gap-4 overflow-x-scroll">
        {podcasts.map((podcast) => (
          <li key={podcast.title} className="flex-none snap-center">
            <a
              href={podcast.website}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
              aria-label={podcast.title}
            >
              <Image
                className="rounded-2xl"
                src={`/podcasts/${podcast.image}`}
                width="160"
                height="160"
                quality={60}
                alt={`Podcast cover von ${podcast.title}`}
                style={{ width: "160px", height: "160px" }}
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
