import Image from "next/image";
import { query } from "../../api/query";
import { Bleed } from "../Bleed/Bleed";

export const PhotoGrid = async () => {
  const photos = await query.content.photos();

  return (
    <section>
      <Bleed className="px-6 md:px-12 lg:px-24">
        <ul className="2xl:columns-6 gap-4 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
          {photos.map((photo) => (
            <li key={photo.title} className="mb-4 last:mb-0">
              <Image
                src={photo.image.url}
                alt={photo.image.description}
                width={photo.image.width}
                height={photo.image.height}
                className="h-auto w-full"
              />
            </li>
          ))}
        </ul>
      </Bleed>
    </section>
  );
};
