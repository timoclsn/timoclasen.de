import Image from 'next/image';

export default function WidgetImage({ url, description, priority }) {
    return (
        <>
            <div
                className={
                    'relative overflow-hidden pb-full sm:pb-0 sm:h-full rounded-3xl'
                }>
                <Image
                    src={url}
                    layout={'fill'}
                    objectFit="cover"
                    objectPosition="center center"
                    sizes="(min-width: 640px) 45vw, 90vw"
                    quality={60}
                    priority={priority}
                    alt={description}
                />
            </div>
        </>
    );
}
