import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Heart } from "lucide-react";

import { Skeleton } from "../../design-system/Skeleton/Skeleton";

interface Props {
  title?: string;
  no?: number;
  image?: string;
  BylineIcon?: LucideIcon;
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
    <div className="mx-auto flex max-w-prose gap-4">
      {image ? (
        <Image
          className="h-[80px] w-[80px] rounded-2xl"
          src={image}
          quality={60}
          alt={title ?? ""}
          width={80}
          height={80}
        />
      ) : (
        <Skeleton width="80px" height="80px" borderRadius="1rem" />
      )}
      <div className="flex-1 overflow-hidden">
        <div className="mb-1 flex justify-between gap-2 text-xs uppercase text-highlight dark:text-highlight-dark sm:mb-2">
          <div className="flex items-center gap-2 truncate">
            {BylineIcon && <BylineIcon size={16} className="flex-none" />}
            <p title={byline} className="truncate">
              {byline !== undefined ? byline : <Skeleton width="200px" />}
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
        <p className="md:text-md line-clamp-2 text-base text-opacity-60 lg:text-lg xl:text-xl">
          {subline ? subline : <Skeleton width="50%" />}
        </p>
      </div>
    </div>
  );
}
