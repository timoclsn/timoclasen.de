import Image from 'next/image';

export default function WidgetImage({ url, description }) {
    return (
        <>
            <div
                className={
                    'relative overflow-hidden pb-full sm:pb-0 sm:h-full'
                }>
                <Image
                    src={url}
                    layout={'fill'}
                    objectFit="cover"
                    objectPosition="center center"
                    alt={description}
                    quality={60}
                    sizes="(min-width: 640px) 50vw, 100vw"
                />
            </div>
        </>
    );
}
