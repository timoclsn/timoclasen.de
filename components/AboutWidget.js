import WidgetImage from '@/components/WidgetImage';
import WidgetLayout from '@/components/WidgetLayout';
import WidgetText from '@/components/WidgetText';

export default function AboutWidget({ text, imageUrl, imageDescription }) {
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
