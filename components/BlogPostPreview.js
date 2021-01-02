import Link from 'next/link';
import { parseISO, format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar } from 'react-feather';

export default function BlogPostPreview({ title, subtitle, date, slug }) {
    return (
        <>
            <article className={'max-w-prose mx-auto'}>
                <div
                    className={
                        'flex items-center space-x-2 text-xs sm:text-sm uppercase text-highlight dark:text-highlight-dark mb-1 md:mb-2'
                    }>
                    <Calendar size={16} />
                    <p>
                        {format(parseISO(date), 'dd. MMMM yyyy', {
                            locale: de
                        })}
                    </p>
                </div>

                <Link href={`/blog/${slug}`}>
                    <a>
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
        </>
    );
}
