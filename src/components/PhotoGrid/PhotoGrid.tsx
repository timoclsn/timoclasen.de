import Image from "next/image";
import { query } from "../../api/query";
import { Photo } from "../../data/content/query";
import { Bleed } from "../Bleed/Bleed";
import { format, parseISO } from "date-fns";
import { Camera } from "lucide-react";

export const PhotoGrid = async () => {
  const photos = await query.content.photos();

  return (
    <section>
      <Bleed className="px-6 md:px-12 lg:px-24">
        <ul className="gap-4 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6">
          {photos.map((photo) => (
            <li key={photo.title} className="mb-4 last:mb-0">
              <PhotoGridItem photo={photo} />
            </li>
          ))}
        </ul>
      </Bleed>
    </section>
  );
};

interface PhotoGridItemProps {
  photo: Photo;
}

const PhotoGridItem = ({ photo }: PhotoGridItemProps) => {
  return (
    <div className="group relative">
      <Image
        src={photo.image.url}
        alt={photo.image.description}
        width={photo.image.width}
        height={photo.image.height}
        className="relative"
      />
      <div className="absolute bottom-0 left-0 right-0 m-2 translate-y-2 rounded-md border-[1px] border-dark/30 bg-light/30 text-[10px] leading-none opacity-0 backdrop-blur-md transition group-hover:-translate-y-0 group-hover:opacity-100 dark:bg-dark/30 2xl:text-sm">
        <div className="flex border-b-[1px] border-dark/30 p-1">
          <div className="flex flex-1 flex-col gap-1">
            <div>{format(parseISO(photo.date), "dd.MM.yyyy")}</div>
            <div>{photo.camera}</div>
            <div>{photo.lens}</div>
          </div>
          <Camera className="h-3 w-3 flex-none 2xl:h-4 2xl:w-4" />
        </div>
        <div className="flex justify-between p-1">
          <div>{`ISO ${photo.iso}`}</div>
          <div>{`${photo.focalLength} mm`}</div>
          <div>{`ƒ${photo.aperture}`}</div>
          <div>{`${photo.exposureTime} s`}</div>
        </div>
      </div>
    </div>
  );
};
