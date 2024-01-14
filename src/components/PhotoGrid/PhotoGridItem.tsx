import { format, parseISO } from "date-fns";
import { Camera } from "lucide-react";
import Image from "next/image";
import { Photo } from "../../data/content/query";
import { InteractiveOverlay } from "./InteractiveOverlay";

interface Props {
  photo: Photo;
}

export const PhotoGridItem = ({ photo }: Props) => {
  return (
    <div className="relative">
      <Image
        src={photo.image.url}
        alt={photo.image.description}
        width={photo.image.width}
        height={photo.image.height}
        className="relative h-auto w-full"
      />
      <InteractiveOverlay>
        <div className="absolute bottom-2 left-2 right-2 rounded-md border-[1px] border-dark/30 bg-light/30 text-[10px] leading-none backdrop-blur-md dark:bg-dark/30 2xl:text-sm ">
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
      </InteractiveOverlay>
    </div>
  );
};
