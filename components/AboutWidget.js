import WidgetImage from '@/components/WidgetImage';
import WidgetLayout from '@/components/WidgetLayout';
import WidgetText from '@/components/WidgetText';

export default function AboutWidget({ text, imageUrl, imageDescription }) {
    return (
        <WidgetLayout
            FirstWidget={
                <WidgetImage
                    url={imageUrl}
                    description={imageDescription}
                    priority
                />
            }
            SecondWidget={
                <WidgetText
                    title="Über mich"
                    text={text}
                    linkText="mehr"
                    href="/ueber"
                />
            }
            separate
            highlight
        />
    );
}
