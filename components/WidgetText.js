import Link from 'next/link';
import { ArrowRight } from 'react-feather';

export default function WidgetText({ title, text, href }) {
    return (
        <>
            <div
                className={
                    'relative flex flex-col justify-end h-full px-6 py-12 xl:px-12 xl:py-20'
                }>
                <h2
                    className={
                        'font-bold text-xl md:text-2xl lg:text-3xl mb-4'
                    }>
                    {title}
                </h2>
                <div
                    className={'flex flex-col space-y-4'}
                    dangerouslySetInnerHTML={{ __html: text }}></div>
                {href && (
                    <div
                        className={
                            'absolute bottom-6 right-6 xl:bottom-12 xl:right-12'
                        }>
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
