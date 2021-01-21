import {
    Droplet,
    Sun,
    Thermometer,
    ToggleLeft,
    ToggleRight,
    Umbrella,
    Zap
} from 'react-feather';
import useSWR from 'swr';

import SmartHomeElement from '@/components/SmartHomeElement';
import WidgetLayout from '@/components/WidgetLayout';
import fetcher from '@/lib/fetcher';

export default function SmartHomeWidget({ text }) {
    const { data } = useSWR('/api/homee', fetcher);

    const firstWidget = (
        <div className={'space-y-6 sm:space-y-8'}>
            <SmartHomeElement
                Icon={Thermometer}
                title="Temparatur"
                value={data?.temperature}
            />
            <SmartHomeElement
                Icon={Droplet}
                title="Luftfeuchtigkeit"
                value={data?.humidity}
            />
            <SmartHomeElement
                Icon={Zap}
                title="Energieverbrauch"
                value={data?.energy}
            />
        </div>
    );
    const secondWidget = (
        <div className={'space-y-6 sm:space-y-8'}>
            <SmartHomeElement
                Icon={data?.lights === 'An' ? ToggleRight : ToggleLeft}
                title="Lichter"
                value={data?.lights}
            />
            <SmartHomeElement
                Icon={Thermometer}
                title="Außentemperatur"
                value={data?.outsideTemperature}
            />
            <SmartHomeElement
                Icon={data?.rain === 'Es regnet' ? Umbrella : Sun}
                title="Regen"
                value={data?.rain}
            />
        </div>
    );

    return (
        <section>
            <h2 className={'font-bold text-xl md:text-2xl lg:text-3xl mb-8'}>
                Smart Home
            </h2>
            <WidgetLayout
                FirstWidget={firstWidget}
                SecondWidget={secondWidget}
                separate
                transparent
            />
            <div
                className={'text-sm mt-8 opacity-40'}
                dangerouslySetInnerHTML={{ __html: text }}></div>
        </section>
    );
}
