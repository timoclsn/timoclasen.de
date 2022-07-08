import Image from 'next/future/image';

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
    <div className="sm:aspect-w-none sm:aspect-h-none aspect-w-1 aspect-h-1 relative h-full overflow-hidden rounded-3xl bg-light dark:bg-dark">
      <Image
        src={url}
        width="1000"
        height="1000"
        sizes="(min-width: 640px) 45vw, 90vw"
        quality={60}
        priority={priority}
        alt={description}
        unoptimized={unoptimized}
        placeholder={blurDataURL ? 'blur' : undefined}
        blurDataURL={blurDataURL}
        className="object-cover object-center"
      />
    </div>
  );
}
