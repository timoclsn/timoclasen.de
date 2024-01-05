import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { query } from "../../api/query";
import { Button } from "../../design-system/Button";

export const PhotographyWidget = async () => {
  const photos = await query.content.photos();
  const photosToDisplay = photos.slice(0, 10);

  return (
    <section id="photos">
      <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
        Fotografie
      </h2>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row">
        <p>
          Es ist 2024 und ich habe mir vorgenommen, endlich (seit über 10
          Jahren), wieder mehr zu fotografieren.
        </p>
        <div className="flex-none">
          <Link href="/fotografie" passHref legacyBehavior>
            <Button as="a" variant="link">
              <ArrowRight />
              Alle Fotos
            </Button>
          </Link>
        </div>
      </div>
      <ul className="flex h-[160px] gap-4 overflow-x-scroll sm:h-[320px]">
        {photosToDisplay.map((photo) => (
          <li key={photo.title} className="h-full flex-none">
            <Image
              src={photo.image.url}
              alt={photo.image.description}
              width={photo.image.width}
              height={photo.image.height}
              className="h-full w-auto max-w-full"
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
