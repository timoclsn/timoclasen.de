import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useSWR from 'swr';

import WidgetLayout from '@/components/WidgetLayout';
import WidgetText from '@/components/WidgetText';
import fetcher from '@/lib/fetcher';

export default function SmartHomeWidget() {
    const { data } = useSWR('/api/homee', fetcher);

    const temperature = data?.temperature || <Skeleton />;
    const humidity = data?.humidity || <Skeleton />;

    return (
        <SkeletonTheme color="#202020" highlightColor="#444">
            <WidgetLayout
                FirstWidget={
                    <WidgetText title="Temperatur" text={temperature} />
                }
                SecondWidget={
                    <WidgetText title="Luftfeuchtigkeit" text={humidity} />
                }
            />
        </SkeletonTheme>
    );
}
