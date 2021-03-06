import Image from 'next/image';
import { User } from 'react-feather';

export default function Podcast({ title, image, hosts, link, description }) {
    return (
        <div className={'max-w-prose mx-auto flex space-x-4'}>
            <Image
                className={'rounded-2xl'}
                src={`/podcasts/${image}`}
                quality={60}
                alt={`Podcast cover von ${title}`}
                layout="fixed"
                width={80}
                height={80}
            />
            <div className={'flex-1 overflow-hidden'}>
                <div
                    className={
                        'flex items-center space-x-2 mb-1 sm:mb-2 text-xs uppercase text-highlight dark:text-highlight-dark'
                    }>
                    <User size={16} className="flex-none" />
                    <p className={'truncate'} title={hosts}>
                        {hosts}
                    </p>
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <h2
                        className={
                            'text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold hover:text-highlight dark:hover:text-highlight-dark truncate mb-2 md:mb-4'
                        }
                        title={title}>
                        {title}
                    </h2>
                </a>
                <p
                    className={
                        'text-base md:text-md lg:text-lg xl:text-xl opacity-60 line-clamp-2'
                    }>
                    {description}
                </p>
            </div>
        </div>
    );
}
