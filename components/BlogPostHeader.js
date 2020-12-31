import { parseISO, format } from 'date-fns';
import { de } from 'date-fns/locale';
import Image from 'next/image';

export default function BlogPostHeader({ title, summary, date, author }) {
    return (
        <>
            <div className={'max-w-prose mx-auto'}>
                <div
                    className={
                        'flex items-center space-x-2 mb-2 text-sm md:text-base'
                    }>
                    <Image
                        src={author.image.url}
                        width={24}
                        height={24}
                        alt={author.image.description}
                        quality={90}
                        className={'rounded-full'}
                    />
                    <p className={'opacity-70'}>
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
                <h2
                    className={
                        'text-3xl md:text-4xl lg:text-5xl font-bold hover:text-highlight dark:hover:text-highlight-dark mb-2'
                    }>
                    {title}
                </h2>
                <p>{summary}</p>
            </div>
        </>
    );
}
