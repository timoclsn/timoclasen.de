import { parseISO, format } from 'date-fns';
import { de } from 'date-fns/locale';
import readingTime from 'reading-time';
import Image from 'next/image';
import { Clock } from 'react-feather';

export default function BlogPostHeader({ title, summary, date, author, text }) {
    const readingTimeObj = readingTime(text);
    const readingTimeMinutes =
        Math.round(readingTimeObj.minutes) < 1
            ? 1
            : Math.round(readingTimeObj.minutes);
    return (
        <>
            <div className={'max-w-prose mx-auto'}>
                <div
                    className={
                        'w-full flex flex-wrap justify-between text-sm md:text-base'
                    }>
                    <div className={'flex items-center space-x-2 mr-4 mb-2'}>
                        <Image
                            src={author.image.url}
                            width={24}
                            height={24}
                            layout="fixed"
                            alt={author.image.description}
                            quality={90}
                            className={'rounded-full'}
                        />
                        <p className={'opacity-70 uppercase'}>
                            {`${author.name} | ${format(
                                parseISO(date),
                                'dd. MMMM yyyy',
                                {
                                    locale: de
                                }
                            )}`}
                            {}
                        </p>
                    </div>
                    <div
                        className={
                            'flex items-center space-x-2 opacity-50 mb-2'
                        }>
                        <Clock size={16} />
                        <p>{`${readingTimeMinutes} min`}</p>
                    </div>
                </div>
                <h1
                    className={
                        'text-3xl md:text-4xl lg:text-5xl font-bold my-2'
                    }>
                    {title}
                </h1>
                <p className={'opacity-70 mt-2'}>{summary}</p>
            </div>
        </>
    );
}
