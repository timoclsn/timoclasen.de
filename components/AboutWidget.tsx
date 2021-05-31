import { WidgetImage } from './WidgetImage';
import { WidgetLayout } from './WidgetLayout';
import { WidgetText } from './WidgetText';

interface Props {
    text: string;
    imageUrl: string;
    imageDescription: string;
}

export function AboutWidget({ text, imageUrl, imageDescription }: Props) {
    return (
        <WidgetLayout separate highlight>
            <WidgetText
                title="Über mich"
                text={text}
                linkText="Mehr"
                href="/ueber"
            />
            <WidgetImage
                url={imageUrl}
                description={imageDescription}
                priority
            />
        </WidgetLayout>
    );
}
