import Image from 'next/image';

import { Skeleton } from './Skeleton';

interface Props {
  url?: string;
  description?: string;
  priority?: boolean;
  unoptimized?: boolean;
  blurDataURL?: string;
}

export function WidgetImage({
  url,
  description,
  priority,
  unoptimized,
  blurDataURL,
}: Props) {
  if (!url) {
    return (
      <Skeleton
        width="100%"
        height="100%"
        borderRadius="1.5rem"
        lineHeight="normal"
        className="aspect-w-1 aspect-h-1"
      />
    );
  }

  return (
    <div className="relative h-full overflow-hidden aspect-w-1 aspect-h-1 sm:aspect-w-none sm:aspect-h-none rounded-3xl bg-light dark:bg-dark">
      <Image
        src={url}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        sizes="(min-width: 640px) 45vw, 90vw"
        quality={60}
        priority={priority}
        alt={description}
        unoptimized={unoptimized}
        placeholder={blurDataURL ? 'blur' : undefined}
        blurDataURL={blurDataURL}
      />
    </div>
  );
}
