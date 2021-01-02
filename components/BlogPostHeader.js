import { parseISO, format } from 'date-fns';
import { de } from 'date-fns/locale';
import readingTime from 'reading-time';
import { Clock, Twitter, Calendar, User, Feather } from 'react-feather';
import Image from 'next/image';

export default function BlogPostHeader({
    title,
    subtitle,
    date,
    author,
    text,
    sys
}) {
    const readingTimeObj = readingTime(text);
    const readingTimeMinutes =
        Math.round(readingTimeObj.minutes) < 1
            ? 1
            : Math.round(readingTimeObj.minutes);

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
                        'flex flex-wrap justify-between items-center text-xs sm:text-sm uppercase text-highlight dark:text-highlight-dark space-y-2 sm:space-y-0'
                    }>
                    <div
                        className={
                            'flex flex-wrap justify-between items-center mr-6 space-y-2 sm:space-y-0'
                        }>
                        <div className={'hidden sm:block -mb-1 mr-6'}>
                            <Image
                                src={author.image.url}
                                width={32}
                                height={32}
                                layout="fixed"
                                alt={author.image.description}
                                quality={75}
                                className={'rounded-full'}
                            />
                        </div>
                        <div className={'flex items-center space-x-2 mr-6'}>
                            {author.username ? (
                                <>
                                    <Twitter size={16} />
                                    <p>
                                        <a
                                            className={
                                                'underline hover:opacity-80'
                                            }
                                            href={`https://twitter.com/${author.username}`}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            {author.name}
                                        </a>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <User size={16} />
                                    <p>{author.name}</p>
                                </>
                            )}
                        </div>

                        <div className={'flex items-center space-x-2 mr-6'}>
                            <Calendar size={16} />
                            <p className={'whitespace-nowrap'}>
                                {format(parseISO(date), 'dd. MMMM yyyy', {
                                    locale: de
                                })}
                            </p>
                        </div>

                        {isDraft(sys) && (
                            <div className={'flex items-center space-x-2'}>
                                <Feather size={16} />
                                <p>Draft</p>
                            </div>
                        )}
                    </div>

                    <div className={'flex items-center space-x-2'}>
                        <Clock size={16} />
                        <p>{`${readingTimeMinutes} min`}</p>
                    </div>
                </div>
            </header>
        </>
    );
}
