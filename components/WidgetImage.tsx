import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';

interface Props {
    url?: string;
    description?: string;
    priority?: boolean;
    unoptimized?: boolean;
}

export function WidgetImage({
    url,
    description,
    priority,
    unoptimized
}: Props) {
    if (!url) {
        return (
            <div className="flex overflow-hidden aspect-w-1 aspect-h-1 rounded-3xl">
                <div className="flex-1 leading-none">
                    <Skeleton width="100%" height="100%" />
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-full overflow-hidden aspect-w-1 aspect-h-1 sm:aspect-w-none sm:aspect-h-none rounded-3xl">
            <Image
                src={url}
                layout={'fill'}
                objectFit="cover"
                objectPosition="center"
                sizes="(min-width: 640px) 45vw, 90vw"
                quality={60}
                priority={priority}
                alt={description}
                unoptimized={unoptimized}
            />
        </div>
    );
}
