import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import Image from 'next/image';
import { Calendar, Clock, Feather, Twitter, User } from 'react-feather';

import BlogPostLabel from '@/components/BlogPostLabel';

export default function BlogPostHeader({
    title,
    subtitle,
    date,
    author,
    readingTime,
    sys
}) {
    function isDraft(sys) {
        return !sys.publishedVersion;
    }

    return (
        <>
            <header className={'max-w-prose mx-auto'}>
                <h1
                    className={
                        'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 md:mb-4'
                    }>
                    {title}
                </h1>

                <h2
                    className={
                        'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl opacity-60 mb-4 md:mb-8'
                    }>
                    {subtitle}
                </h2>

                <div
                    className={
                        'flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 text-xs sm:text-sm uppercase text-highlight dark:text-highlight-dark'
                    }>
                    <div className={'flex'}>
                        <div className={'hidden sm:block -mb-1 mr-6'}>
                            <Image
                                src={author.image.url}
                                width={32}
                                height={32}
                                layout="fixed"
                                alt={author.image.description}
                                quality={60}
                                className={'rounded-full'}
                            />
                        </div>
                        <div className={'flex space-x-6'}>
                            {author.username ? (
                                <BlogPostLabel
                                    Icon={Twitter}
                                    text={author.name}
                                    href={`https://twitter.com/${author.username}`}
                                />
                            ) : (
                                <BlogPostLabel Icon={User} text={author.name} />
                            )}

                            <BlogPostLabel
                                Icon={Calendar}
                                text={format(parseISO(date), 'dd. MMMM yyyy', {
                                    locale: de
                                })}
                            />

                            {isDraft(sys) && (
                                <BlogPostLabel Icon={Feather} text="Entwurf" />
                            )}
                        </div>
                    </div>

                    <BlogPostLabel Icon={Clock} text={`${readingTime} min`} />
                </div>
            </header>
        </>
    );
}
