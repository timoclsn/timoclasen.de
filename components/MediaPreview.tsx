import Image from 'next/image';
import type { Icon } from 'react-feather';
import { Heart } from 'react-feather';

import { Skeleton } from './Skeleton';

interface Props {
  title?: string;
  no?: number;
  image?: string;
  BylineIcon?: Icon;
  byline?: string;
  subline?: string;
  url?: string;
  favorite?: boolean;
}

export function MediaPreview({
  title,
  no,
  image,
  BylineIcon,
  byline,
  subline,
  url,
  favorite,
}: Props) {
  return (
    <div className="mx-auto flex max-w-prose space-x-4">
      {image ? (
        <Image
          className="rounded-2xl"
          src={image}
          quality={60}
          alt={title}
          layout="fixed"
          width={80}
          height={80}
        />
      ) : (
        <Skeleton width="80px" height="80px" borderRadius="1rem" />
      )}
      <div className="flex-1 overflow-hidden">
        <div className="mb-1 flex justify-between space-x-2 text-xs uppercase text-highlight dark:text-highlight-dark sm:mb-2">
          <div className="flex items-center space-x-2 truncate">
            {BylineIcon && <BylineIcon size={16} className="flex-none" />}
            <p title={byline} className="truncate">
              {byline ? byline : <Skeleton width="200px" />}
            </p>
          </div>
          {favorite && <Heart size={16} className="flex-none" />}
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <h2
            className="group mb-2 truncate text-lg font-bold hover:text-highlight dark:hover:text-highlight-dark sm:text-xl md:mb-4 md:text-2xl lg:text-3xl"
            title={title}
          >
            {no && (
              <span className="opacity-60 group-hover:opacity-100">
                {`${no}. `}
              </span>
            )}
            {title ? title : <Skeleton width="100%" />}
          </h2>
        </a>
        <p className="md:text-md text-base text-opacity-60 line-clamp-2 lg:text-lg xl:text-xl">
          {subline ? subline : <Skeleton width="50%" />}
        </p>
      </div>
    </div>
  );
}
