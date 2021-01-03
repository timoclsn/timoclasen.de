import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowRight } from 'react-feather';

export default function WidgetText({ title, text, linkText, href }) {
    return (
        <>
            <div
                className={
                    'h-full flex flex-col justify-between px-6 py-12 xl:px-12 xl:py-20'
                }>
                <div>
                    <h2
                        className={
                            'font-bold text-xl md:text-2xl lg:text-3xl mb-4'
                        }>
                        {title}
                    </h2>
                    <div className={'flex flex-col space-y-4'}>
                        <ReactMarkdown>{text}</ReactMarkdown>
                    </div>
                </div>
                {href && (
                    <div className={'flex justify-end mt-4 -mb-6 xl:-mb-12'}>
                        <Link href={href}>
                            <a
                                className={
                                    'flex items-center space-x-2 hover:opacity-80'
                                }>
                                <ArrowRight size={24} />
                                <div className={'font-bold'}>{linkText}</div>
                            </a>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
