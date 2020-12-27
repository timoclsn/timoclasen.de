import Image from 'next/image';

export default function WidgetImage({ imageUrl, imageDescription, priority }) {
    return (
        <>
            <div className={'relative w-full h-96 sm:h-full'}>
                <Image
                    src={`https:${imageUrl}`}
                    layout={'fill'}
                    objectFit="cover"
                    objectPosition="center center"
                    alt={imageDescription}
                    quality={90}
                    priority={priority}
                />
            </div>
        </>
    );
}
