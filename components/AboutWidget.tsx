import { z } from "zod";
import { queryContent } from "../lib/content";
import { WidgetImage } from "./WidgetImage";
import { WidgetLayout } from "./WidgetLayout";
import { WidgetText } from "./WidgetText";
import { getPlaceholder } from "../lib/placeholder";
import { markdownToHTML, stripFirstLine, truncate } from "../lib/text";

interface Props {
  text: string;
  image: {
    url: string;
    description: string;
    blurDataURL?: string;
  };
}

export const AboutWidget = async () => {
  const personData = await queryContent(
    `{
      personCollection(where: {name: "Timo Clasen"}, limit: 1, preview: false) {
        items {
          cvText
          profileImageCollection {
            items {
              url
              description
            }
          }
        }
      }
  }`,
    z.object({
      data: z.object({
        personCollection: z.object({
          items: z.array(
            z.object({
              cvText: z.string(),
              profileImageCollection: z.object({
                items: z.array(
                  z.object({
                    url: z.string().url(),
                    description: z.string(),
                  }),
                ),
              }),
            }),
          ),
        }),
      }),
    }),
  );

  const person = personData.data.personCollection.items[0];

  const image = person.profileImageCollection.items[1];
  const { base64: personImageBase64 } = await getPlaceholder(image.url);
  const enhancedImage = { ...image, blurDataURL: personImageBase64 };

  let aboutTeaser = person.cvText;
  aboutTeaser = stripFirstLine(aboutTeaser);
  aboutTeaser = truncate(aboutTeaser, 400, true);
  aboutTeaser = await markdownToHTML(aboutTeaser);

  return (
    <WidgetLayout separate highlight>
      <WidgetText
        title="Über mich"
        text={aboutTeaser}
        linkText="Mehr"
        href="/ueber"
      />
      <WidgetImage
        url={image.url}
        description={enhancedImage.description}
        blurDataURL={enhancedImage.blurDataURL}
        priority
      />
    </WidgetLayout>
  );
};
