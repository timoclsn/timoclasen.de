import Image from "next/image";
import { z } from "zod";
import { CV } from "../../components/CV";
import { ContactWidget } from "../../components/ContactWidget";
import { TextBlock } from "../../components/TextBlock";
import { queryContent } from "../../lib/content";
import { getPlaceholder } from "../../lib/placeholder";
import { markdownToHTML } from "../../lib/text";

const AboutPage = async () => {
  const personData = await queryContent(
    `{
      personCollection(where: {name: "Timo Clasen"}, limit: 1, preview: false) {
        items {
          cvText
          imagesCollection {
            items {
              url
              description
            }
          }
          linkCollection
        }
      }
    }`,
    z.object({
      data: z.object({
        personCollection: z.object({
          items: z.array(
            z.object({
              cvText: z.string(),
              imagesCollection: z.object({
                items: z.array(
                  z.object({
                    url: z.string(),
                    description: z.string(),
                  }),
                ),
              }),
              linkCollection: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  const person = personData.data.personCollection.items[0];

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
