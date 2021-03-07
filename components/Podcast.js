import Image from 'next/image';
import { User } from 'react-feather';

export default function Podcast({ title, image, hosts, link, description }) {
    return (
        <div className="flex mx-auto space-x-4 max-w-prose">
            <Image
                className="rounded-2xl"
                src={`/podcasts/${image}`}
                quality={60}
                alt={`Podcast cover von ${title}`}
                layout="fixed"
                width={80}
                height={80}
            />
            <div className="flex-1 overflow-hidden">
                <div className="flex items-center mb-1 space-x-2 text-xs uppercase sm:mb-2 text-highlight dark:text-highlight-dark">
                    <User size={16} className="flex-none" />
                    <p className="truncate" title={hosts}>
                        {hosts}
                    </p>
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <h2
                        className="mb-2 text-lg font-bold truncate sm:text-xl md:text-2xl lg:text-3xl hover:text-highlight dark:hover:text-highlight-dark md:mb-4"
                        title={title}>
                        {title}
                    </h2>
                </a>
                <p className="text-base md:text-md lg:text-lg xl:text-xl opacity-60 line-clamp-2">
                    {description}
                </p>
            </div>
        </div>
    );
}
