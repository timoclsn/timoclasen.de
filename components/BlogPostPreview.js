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
        <article className={'max-w-prose mx-auto'}>
            <div
                className={
                    'flex space-x-6 mb-1 sm:mb-2 text-xs sm:text-sm uppercase text-highlight dark:text-highlight-dark'
                }>
                <BlogPostLabel Icon={Calendar} text={date} />

                <BlogPostLabel Icon={Clock} text={`${readingTime} min`} />

                {isDraft(sys) && (
                    <BlogPostLabel Icon={Feather} text="Entwurf" />
                )}
            </div>

            <Link href={`/blog/${slug}`}>
                <a data-cy="blogpost-link">
                    <h2
                        className={
                            'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold hover:text-highlight dark:hover:text-highlight-dark mb-2 md:mb-4'
                        }>
                        {title}
                    </h2>
                </a>
            </Link>
            <p
                className={
                    'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl opacity-60'
                }>
                {subtitle}
            </p>
        </article>
    );
}
