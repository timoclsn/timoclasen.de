import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowRight } from 'react-feather';

export default function WidgetText({ title, text, href }) {
    return (
        <>
            <div
                className={
                    'relative flex flex-col px-6 py-12 xl:px-12 xl:py-20'
                }>
                <h2
                    className={
                        'font-bold text-xl md:text-2xl lg:text-3xl mb-4'
                    }>
                    {title}
                </h2>
                <div className={'flex flex-col space-y-4'}>
                    <ReactMarkdown>{text}</ReactMarkdown>
                </div>
                {href && (
                    <div className={'flex justify-end -mb-6 xl:-mb-12'}>
                        <Link href={href}>
                            <a
                                className={
                                    'flex justify-center items-center space-x-2 mt-4 hover:opacity-80'
                                }>
                                <ArrowRight size={24} />
                                <div className={'font-bold'}>mehr</div>
                            </a>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
