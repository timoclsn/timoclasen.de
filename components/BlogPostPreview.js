import Link from 'next/link';
import { Calendar, Clock, Feather } from 'react-feather';

import BlogPostLabel from '@/components/BlogPostLabel';

export default function BlogPostPreview({
    title,
    subtitle,
    date,
    readingTime,
    slug,
    sys
}) {
    function isDraft(sys) {
        return !sys.publishedVersion;
    }

    return (
        <article className="mx-auto max-w-prose">
            <div className="flex mb-1 space-x-6 text-xs uppercase sm:mb-2 sm:text-sm text-highlight dark:text-highlight-dark">
                <BlogPostLabel Icon={Calendar} text={date} />

                <BlogPostLabel Icon={Clock} text={`${readingTime} min`} />

                {isDraft(sys) && (
                    <BlogPostLabel Icon={Feather} text="Entwurf" />
                )}
            </div>

            <Link href={`/blog/${slug}`}>
                <a data-cy="blogpost-link">
                    <h2 className="mb-2 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl hover:text-highlight dark:hover:text-highlight-dark md:mb-4">
                        {title}
                    </h2>
                </a>
            </Link>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl opacity-60">
                {subtitle}
            </p>
        </article>
    );
}
