import { query } from "../../api/query";
import { Bleed } from "../Bleed/Bleed";
import { PhotoGridItem } from "./PhotoGridItem";

export const PhotoGrid = async () => {
  const photos = await query.content.photos();
  const photosToDisplay = photos.sort(() => Math.random() - 0.5);

  return (
    <section>
      <Bleed className="px-6 md:px-12 lg:px-24">
        <ul className="gap-4 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6">
          {photosToDisplay.map((photo) => (
            <li key={photo.title} className="mb-4 last:mb-0">
              <PhotoGridItem photo={photo} />
            </li>
          ))}
        </ul>
      </Bleed>
    </section>
  );
};
