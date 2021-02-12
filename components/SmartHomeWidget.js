import {
    CloudSnow,
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

export default function SmartHomeWidget({ text, footnote }) {
    const { data, error } = useSWR('/api/smarthome', fetcher);
    const errorMessage = 'Nicht erreichbar…';

    const firstWidget = (
        <div className={'space-y-6 sm:space-y-8'}>
            <SmartHomeElement
                Icon={Thermometer}
                title="Raumtemperatur"
                value={error ? errorMessage : data?.temperature}
            />
            <SmartHomeElement
                Icon={Droplet}
                title="Luftfeuchtigkeit"
                value={error ? errorMessage : data?.humidity}
            />
            <SmartHomeElement
                Icon={Zap}
                title="Energieverbrauch"
                value={error ? errorMessage : data?.energy}
            />
        </div>
    );
    const secondWidget = (
        <div className={'space-y-6 sm:space-y-8 -mt-6 sm:mt-0'}>
            <SmartHomeElement
                Icon={data?.lights === 'An' ? ToggleRight : ToggleLeft}
                title="Lichter"
                value={error ? errorMessage : data?.lights}
            />
            <SmartHomeElement
                Icon={Thermometer}
                title="Außentemperatur"
                value={error ? errorMessage : data?.outsideTemperature}
            />
            <SmartHomeElement
                Icon={
                    data?.rain === 'Es regnet'
                        ? Umbrella
                        : data?.rain === 'Es schneit'
                        ? CloudSnow
                        : Sun
                }
                title="Regensensor"
                value={error ? errorMessage : data?.rain}
            />
        </div>
    );

    return (
        <section id="smarthome">
            <h2 className={'font-bold text-xl md:text-2xl lg:text-3xl mb-2'}>
                Smart Home
            </h2>
            <div
                className={'mb-8'}
                dangerouslySetInnerHTML={{ __html: text }}></div>
            <WidgetLayout
                FirstWidget={firstWidget}
                SecondWidget={secondWidget}
                separate
                transparent
            />
            <div
                className={'text-sm mt-8 opacity-60'}
                dangerouslySetInnerHTML={{ __html: footnote }}></div>
        </section>
    );
}
