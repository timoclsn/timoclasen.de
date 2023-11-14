import Image from "next/image";
import { CV } from "../../components/CV";
import { ContactWidget } from "../../components/ContactWidget";
import { TextBlock } from "../../components/TextBlock";
import { getMetadata, getPerson } from "../../data/content";
import { createGenerateMetadata, ogImage } from "../../lib/metadata";
import { getPlaceholder } from "../../lib/placeholder";
import { markdownToHTML } from "../../lib/text";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } = await getMetadata("ueber");

  return {
    title,
    description,
    openGraph: {
      siteName: "Timo Clasen",
      type: "website",
      url: `https://timoclasen.de/${slug}`,
      title,
      description,
      images: {
        url: ogImage({
          name: `${title} • Timo Clasen`,
        }),
        alt: `Teasertext der Seite "${title}" und Profilfoto von Timo Clasen`,
        width: 1200,
        height: 630,
      },
    },
  };
});

const AboutPage = async () => {
  const person = await getPerson();

  const image = person.imagesCollection.items[2];
  const { base64 } = await getPlaceholder(image.url);
  const enhancedImage = { ...image, blurDataURL: base64 };

  const about = await markdownToHTML(person.cvText);
  const linkCollection = await markdownToHTML(person.linkCollection);

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
      <TextBlock text={about} />
      <CV />
      <TextBlock text={linkCollection} />
      <ContactWidget />
    </>
  );
};

export default AboutPage;
