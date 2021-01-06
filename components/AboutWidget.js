import WidgetImage from './WidgetImage';
import WidgetLayout from './WidgetLayout';
import WidgetText from './WidgetText';

export default function AboutWidget({ text, imageUrl, imageDescription }) {
    return (
        <WidgetLayout
            FirstWidget={
                <WidgetImage url={imageUrl} description={imageDescription} />
            }
            SecondWidget={
                <WidgetText
                    title="Über mich"
                    text={text}
                    linkText="mehr"
                    href="/ueber"
                />
            }
            reverse
            separate
            highlight
        />
    );
}
