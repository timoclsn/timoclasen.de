import WidgetButtons from '@/components/WidgetButtons';
import WidgetLayout from '@/components/WidgetLayout';
import WidgetText from '@/components/WidgetText';

export default function ContactWidget({ text }) {
    return (
        <WidgetLayout>
            <WidgetText title="Kontakt" text={text} />
            <WidgetButtons />
        </WidgetLayout>
    );
}
