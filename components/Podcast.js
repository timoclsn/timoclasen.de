import Image from 'next/image';

export default function Podcast({ title, image, hosts, link }) {
    return (
        <div className={'max-w-prose mx-auto flex space-x-4'}>
            <Image
                className={'rounded-2xl flex-1'}
                src={`/podcasts/${image}`}
                quality={60}
                alt={`Podcast cover von ${title}`}
                width={100}
                height={100}
            />
            <div className={'overflow-hidden flex-1 flex items-center'}>
                <div>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        <h2
                            className={
                                'text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold hover:text-highlight dark:hover:text-highlight-dark truncate mb-1'
                            }
                            title={title}>
                            {title}
                        </h2>
                    </a>
                    <p
                        className={
                            'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl opacity-60 truncate'
                        }
                        title={hosts}>
                        {hosts}
                    </p>
                </div>
            </div>
        </div>
    );
}
