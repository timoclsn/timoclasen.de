import { WidgetImage } from './WidgetImage';
import { WidgetLayout } from './WidgetLayout';
import { WidgetText } from './WidgetText';

interface Props {
  text: string;
  image: {
    url: string;
    description: string;
    blurDataURL?: string;
  };
}

export function AboutWidget({ text, image }: Props) {
  return (
    <WidgetLayout separate highlight>
      <WidgetText title="Über mich" text={text} linkText="Mehr" href="/ueber" />
      <WidgetImage
        url={image.url}
        description={image.description}
        blurDataURL={image.blurDataURL}
        priority
      />
    </WidgetLayout>
  );
}
