import { getPerson } from "../data/content";
import { getPlaceholder } from "../lib/placeholder";
import { stripFirstLine, truncate } from "../lib/text";
import { WidgetImage } from "./WidgetImage";
import { WidgetLayout } from "./WidgetLayout";
import { WidgetText } from "./WidgetText";

export const AboutWidget = async () => {
  const person = await getPerson();

  const image = person.profileImageCollection.items[1];
  const { base64: personImageBase64 } = await getPlaceholder(image.url);
  const enhancedImage = { ...image, blurDataURL: personImageBase64 };

  let aboutTeaser = person.cvText;
  aboutTeaser = stripFirstLine(aboutTeaser);
  aboutTeaser = truncate(aboutTeaser, 400, true);

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
