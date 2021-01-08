import Image from 'next/image';

export default function WidgetImage({ url, description, priority }) {
    return (
        <>
            <div className={'relative w-full h-96 sm:h-full'}>
                <Image
                    src={url}
                    layout={'fill'}
                    objectFit="cover"
                    objectPosition="center center"
                    alt={description}
                    quality={60}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    priority
                />
            </div>
        </>
    );
}
