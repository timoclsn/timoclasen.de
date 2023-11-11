import Image from "next/image";
import { Calendar, Clock, Feather, Twitter, User } from "react-feather";

import { BlogPostLabel } from "./BlogPostLabel";

interface Author {
  name: string;
  username: string;
  image: {
    url: string;
    description: string;
  };
}

interface Sys {
  publishedVersion: number | null;
}

interface Props {
  title: string;
  subtitle: string;
  date: string;
  author: Author;
  readingTime: number;
  sys: Sys;
}

export function BlogPostHeader({
  title,
  subtitle,
  date,
  author,
  readingTime,
  sys,
}: Props) {
  function isDraft(sys: Sys) {
    return !sys.publishedVersion;
  }

  return (
    <header className="mx-auto max-w-prose">
      <h1 className="mb-2 text-3xl font-bold sm:text-4xl md:mb-4 md:text-5xl lg:text-6xl xl:text-7xl">
        {title}
      </h1>

      <h2 className="mb-4 text-base opacity-60 sm:text-lg md:mb-8 md:text-xl lg:text-2xl xl:text-3xl">
        {subtitle}
      </h2>

      <div className="flex flex-col justify-between space-y-2 text-xs uppercase text-highlight dark:text-highlight-dark sm:flex-row sm:space-y-0 sm:text-sm">
        <div className="flex">
          <div className="mr-6 -mb-1 hidden sm:block">
            <Image
              src={author.image.url}
              width={32}
              height={32}
              alt={author.image.description}
              quality={60}
              className="block rounded-full"
            />
          </div>
          <div className="flex space-x-6">
            {author.username ? (
              <BlogPostLabel
                Icon={Twitter}
                text={author.name}
                href={`https://twitter.com/${author.username}`}
              />
            ) : (
              <BlogPostLabel Icon={User} text={author.name} />
            )}

            <BlogPostLabel Icon={Calendar} text={date} />

            {isDraft(sys) && <BlogPostLabel Icon={Feather} text="Entwurf" />}
          </div>
        </div>

        <BlogPostLabel Icon={Clock} text={`${readingTime} min`} />
      </div>
    </header>
  );
}
