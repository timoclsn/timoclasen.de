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

export default function SmartHomeWidget() {
    const { data } = useSWR('/api/homee', fetcher);

    const firstWidget = (
        <div className={'space-y-12'}>
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
        <div className={'space-y-12'}>
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
                Icon={data?.rain === 'Regen' ? Umbrella : Sun}
                title="Regen"
                value={data?.rain}
            />
        </div>
    );

    return (
        <section>
            <h2 className={'font-bold text-xl md:text-2xl lg:text-3xl mb-8'}>
                Smart Home Dashboard
            </h2>
            <WidgetLayout
                FirstWidget={firstWidget}
                SecondWidget={secondWidget}
                separate
                transparent
            />
            <p className={'text-sm mt-8 opacity-40'}>
                Live Daten aus unserem Zuhause aus dem schönen Esslingen am
                Neckar. Die Daten haben eine Genauigkeit von ca. 10 Min. und
                stammen natürlich aus unserem homee. Der aktuelle
                Energieverbrauch bezieht sich auf die Geräte Fernseher,
                Waschmaschine und Trockner, da diese sind mit einer
                Stromzähler-Steckdose ausgestattet sind.
            </p>
        </section>
    );
}
