import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';

export default function WidgetImage({ url, description, priority }) {
    if (!url) {
        return (
            <div className={'flex overflow-hidden h-96 sm:h-full rounded-3xl'}>
                <div className={'flex-1 leading-none'}>
                    <Skeleton width="100%" height="100%" />
                </div>
            </div>
        );
    }

    return (
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
    );
}
