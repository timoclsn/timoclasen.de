import Image from "next/image";
import { CV } from "../../components/CV/CV";
import { ContactWidget } from "../../components/ContactWidget/ContactWidget";
import { Markdown } from "../../design-system/Markdown/Markdown";
import { getMetadata, getPerson } from "../../data/content";
import { createGenerateMetadata, openGraph } from "../../lib/metadata";
import { getPlaceholder } from "../../lib/placeholder";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } = await getMetadata("ueber");

  return {
    title,
    description,
    openGraph: {
      ...openGraph(title, description, slug),
    },
  };
});

const AboutPage = async () => {
  const person = await getPerson();

  const image = person.imagesCollection.items[2];
  const { base64 } = await getPlaceholder(image.url);
  const enhancedImage = { ...image, blurDataURL: base64 };

  return (
    <>
      <div className="aspect-h-1 aspect-w-2 overflow-hidden rounded-3xl">
        <Image
          src={enhancedImage.url}
          width="2200"
          height="1100"
          sizes="90vw"
          quality={60}
          priority
          alt={enhancedImage.description}
          blurDataURL={enhancedImage.blurDataURL}
          placeholder="blur"
        />
      </div>
      <Markdown>{person.cvText}</Markdown>
      <CV />
      <Markdown>{person.linkCollection}</Markdown>
      <ContactWidget />
    </>
  );
};

export default AboutPage;
