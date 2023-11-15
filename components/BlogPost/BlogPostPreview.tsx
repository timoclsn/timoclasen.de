import Link from "next/link";
import { Calendar, Clock, Feather } from "lucide-react";

import { BlogPostLabel } from "./BlogPostLabel";

interface Sys {
  publishedVersion: number | null;
}

interface Props {
  title: string;
  subtitle: string;
  date: string;
  readingTime: number;
  slug: string;
  sys: Sys;
}

export function BlogPostPreview({
  title,
  subtitle,
  date,
  readingTime,
  slug,
  sys,
}: Props) {
  function isDraft(sys: Sys) {
    return !sys.publishedVersion;
  }

  return (
    <article className="mx-auto max-w-prose">
      <div className="mb-1 flex space-x-6 text-xs uppercase text-highlight dark:text-highlight-dark sm:mb-2 sm:text-sm">
        <BlogPostLabel Icon={Calendar} text={date} />

        <BlogPostLabel Icon={Clock} text={`${readingTime} min`} />

        {isDraft(sys) && <BlogPostLabel Icon={Feather} text="Entwurf" />}
      </div>

      <Link href={`/blog/${slug}`} data-cy="blogpost-link">
        <h2 className="mb-2 text-2xl font-bold hover:text-highlight dark:hover:text-highlight-dark sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Link>
      <p className="text-sm opacity-60 sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        {subtitle}
      </p>
    </article>
  );
}
