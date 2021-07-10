import { useContext } from 'react';
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
import toast from 'react-hot-toast';
import useSWR, { mutate } from 'swr';

import { fetcher } from '../lib/fetcher';
import type { SmartHomeData } from '../pages/api/smarthome';
import { Button } from './Button';
import { Skeleton } from './Skeleton';
import { SmartHomeElement } from './SmartHomeElement';
import { ThemeContext } from './ThemeContext';
import { WidgetLayout } from './WidgetLayout';

const lightToast = {
    minWidth: '200px',
    borderRadius: '1rem',
    background: '#FFFFFF',
    color: '#000000'
};

const darkToast = {
    minWidth: '200px',
    borderRadius: '1rem',
    background: '#333333',
    color: '#FFFFFF'
};

interface Props {
    text: string;
    footnote: string;
}

export function SmartHomeWidget({ text, footnote }: Props) {
    const { darkMode } = useContext(ThemeContext);

    const { data, error } = useSWR<SmartHomeData, string>(
        '/api/smarthome',
        fetcher
    );
    const errorMessage = 'Nicht erreichbar…';

    async function controlLight(color: string) {
        await toast.promise(
            fetch('/api/smarthome', {
                method: 'PUT',
                body: JSON.stringify({
                    balconyColor: color
                })
            }),
            {
                loading: 'Schalten...',
                success: <b>Balkon ist an!</b>,
                error: <b>Hat nicht funktioniert.</b>
            },
            { style: darkMode ? darkToast : lightToast }
        );
        mutate('/api/smarthome');
    }

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
                className="my-8 text-sm opacity-60"
                dangerouslySetInnerHTML={{ __html: footnote }}
            />
            <div className="flex justify-center">
                <div className="w-full max-w-screen-sm px-6 py-6 space-y-2 bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 rounded-3xl xl:px-12 xl:py-12">
                    <div className="flex space-x-6">
                        {data ? (
                            <div
                                className="flex items-center justify-center flex-none"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '9999px',
                                    backgroundColor:
                                        data.balconyOnOff === 'Aus'
                                            ? darkMode
                                                ? '#000000'
                                                : '#FFFFFF'
                                            : data?.balconyColor
                                }}>
                                <span>
                                    {data &&
                                        data.balconyOnOff === 'Aus' &&
                                        data.balconyOnOff}
                                </span>
                            </div>
                        ) : (
                            <Skeleton
                                circle
                                width="100px"
                                height="100px"
                                className="flex-none"
                            />
                        )}
                        <div>
                            <h2 className="mb-2 font-bold text-md md:text-xl lg:text-2xl">
                                Balkonbeleuchtung
                            </h2>
                            <p className="mb-4 opacity-60 text-md md:text-lg lg:text-xl">
                                Hinterlasse mir einen Gruß und schalte meine
                                Balkonbeleuchtung in eine Farbe deiner Wahl:
                            </p>
                            <div className="space-x-4">
                                <Button
                                    size="small"
                                    onClick={() => controlLight('red')}>
                                    Rot
                                </Button>
                                <Button
                                    size="small"
                                    onClick={() => controlLight('green')}>
                                    Grün
                                </Button>
                                <Button
                                    size="small"
                                    onClick={() => controlLight('blue')}>
                                    Blau
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
