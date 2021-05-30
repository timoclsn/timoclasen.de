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

import { fetcher } from '../lib/fetcher';
import { SmartHomeData } from '../pages/api/smarthome';
import { SmartHomeElement } from './SmartHomeElement';
import { WidgetLayout } from './WidgetLayout';

interface Props {
    text: string;
    footnote: string;
}

export function SmartHomeWidget({ text, footnote }: Props) {
    const { data, error } = useSWR<SmartHomeData, string>(
        '/api/smarthome',
        fetcher
    );
    const errorMessage = 'Nicht erreichbar…';

    return (
        <section id="smarthome">
            <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
                Smart Home
            </h2>
            <div
                className="mb-8"
                dangerouslySetInnerHTML={{ __html: text }}></div>
            <WidgetLayout separate transparent>
                <div className="space-y-6 sm:space-y-8">
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
                <div className="-mt-6 space-y-6 sm:space-y-8 sm:mt-0">
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
            </WidgetLayout>
            <div
                className="mt-8 text-sm opacity-60"
                dangerouslySetInnerHTML={{ __html: footnote }}></div>
        </section>
    );
}
