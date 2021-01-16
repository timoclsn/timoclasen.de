import useSWR from 'swr';

import WidgetLayout from '@/components/WidgetLayout';
import WidgetText from '@/components/WidgetText';
import fetcher from '@/lib/fetcher';

export default function SmartHomeWidget() {
    const { data } = useSWR('/api/homee', fetcher);

    const temperature = data?.temperature || 'Lädt…';
    const humidity = data?.humidity || 'Lädt…';

    return (
        <WidgetLayout
            FirstWidget={<WidgetText title="Temperatur" text={temperature} />}
            SecondWidget={
                <WidgetText title="Luftfeuchtigkeit" text={humidity} />
            }
        />
    );
}
