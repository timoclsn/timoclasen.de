import WidgetButtons from './WidgetButtons';
import WidgetLayout from './WidgetLayout';
import WidgetText from './WidgetText';

export default function ContactWidget({ text }) {
    return (
        <WidgetLayout
            FirstWidget={<WidgetText title="Kontakt" text={text} />}
            SecondWidget={<WidgetButtons />}
        />
    );
}
