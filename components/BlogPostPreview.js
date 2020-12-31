import Link from 'next/link';
import { parseISO, format } from 'date-fns';
import { de } from 'date-fns/locale';

export default function BlogPostPreview({ title, summary, date, slug }) {
    return (
        <>
            <div className={'max-w-prose mx-auto'}>
                <Link href={`/blog/${slug}`}>
                    <a>
                        <h2
                            className={
                                'text-2xl md:text-3xl lg:text-4xl font-bold hover:text-highlight dark:hover:text-highlight-dark mb-1'
                            }>
                            {title}
                        </h2>
                    </a>
                </Link>
                <p className={'mb-1'}>{summary}</p>
                <p className={'opacity-70'}>
                    {format(parseISO(date), 'dd. MMMM yyyy', { locale: de })}
                </p>
            </div>
        </>
    );
}
