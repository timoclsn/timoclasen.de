import Image from "next/image";

interface Props {
  url: string;
  description?: string;
  priority?: boolean;
  unoptimized?: boolean;
  blurDataURL?: string;
}

export const ImageWidget = ({
  url,
  description,
  priority,
  unoptimized,
  blurDataURL,
}: Props) => {
  return (
    <div className="sm:aspect-w-none sm:aspect-h-none aspect-h-1 aspect-w-1 relative h-full overflow-hidden rounded-3xl bg-light dark:bg-dark">
      <Image
        src={url}
        width="1000"
        height="1000"
        sizes="(min-width: 640px) 45vw, 90vw"
        quality={60}
        priority={priority}
        alt={description ?? ""}
        unoptimized={unoptimized}
        placeholder={blurDataURL ? "blur" : undefined}
        blurDataURL={blurDataURL}
        className="object-cover object-center"
      />
    </div>
  );
};
