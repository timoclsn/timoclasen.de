import { useContext, useState } from 'react';
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
import type { Counts } from '../pages/api/control-count';
import type { SmartHomeData } from '../pages/api/smarthome';
import { Button } from './Button';
import { Skeleton } from './Skeleton';
import { SmartHomeElement } from './SmartHomeElement';
import { ThemeContext } from './ThemeContext';
import { WidgetLayout } from './WidgetLayout';

const lightToast = {
    minWidth: '300px',
    borderRadius: '1rem',
    background: '#FFFFFF',
    color: '#000000'
};

const darkToast = {
    minWidth: '300px',
    borderRadius: '1rem',
    background: '#333333',
    color: '#FFFFFF'
};

interface Props {
    text: string;
    footnote: string;
}

type BalconyColors = Record<string, string>;

const balconyColors: BalconyColors = {
    red: '#fa0501',
    green: '#03d304',
    blue: '#002dfb'
};

export function SmartHomeWidget({ text, footnote }: Props) {
    const { darkMode } = useContext(ThemeContext);
    const [disableButtons, setDisableButtons] = useState(false);

    const { data, error } = useSWR<SmartHomeData, string>('/api/smarthome');

    const { data: countData, error: countError } = useSWR<Counts, string>(
        '/api/control-count'
    );

    const errorMessage = 'Nicht erreichbar…';

    async function controlLight(color: string, emoji: string) {
        setDisableButtons(true);

        await toast.promise(
            fetch('/api/smarthome', {
                method: 'PUT',
                body: JSON.stringify({
                    balconyColor: color
                })
            }),
            {
                loading: 'Schalten...',
                success: <b>Balkon wurde eingeschaltet!</b>,
                error: <b>Hat nicht funktioniert.</b>
            },
            {
                style: darkMode ? darkToast : lightToast,
                success: {
                    duration: 5000,
                    icon: emoji
                }
            }
        );

        mutate(
            '/api/smarthome',
            { ...data, balconyColor: balconyColors[color], balconyOnOff: 'An' },
            false
        );

        mutate(
            '/api/control-count',
            async () => {
                return await fetcher('/api/control-count', {
                    method: 'PUT',
                    body: JSON.stringify({
                        color: color
                    })
                });
            },
            false
        );

        setDisableButtons(false);

        splitbee.track('Balcony Light Control', {
            color: `${emoji} ${color}`
        });
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
                                className="flex items-center justify-center flex-none font-bold"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '9999px',
                                    boxShadow:
                                        data.balconyOnOff === 'Aus'
                                            ? 'none'
                                            : `0 0 50px ${data?.balconyColor}`,
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
                            <div className="flex flex-col mb-4 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <Button
                                    variant="ghost"
                                    size="small"
                                    onClick={() => controlLight('red', '🔥')}
                                    disabled={disableButtons}>
                                    <span>🔥</span>Rot
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="small"
                                    onClick={() => controlLight('green', '🌿')}
                                    disabled={disableButtons}>
                                    <span>🌿</span>Grün
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="small"
                                    onClick={() => controlLight('blue', '🌊')}
                                    disabled={disableButtons}>
                                    <span>🌊</span>Blau
                                </Button>
                            </div>
                        </div>
                    </div>
                    {!countError && (
                        <div className="flex justify-center">
                            <p className="text-sm opacity-60">
                                {countData ? (
                                    `Zähler: Rot ${countData.red} | Grün ${countData.green} | Blau ${countData.blue}`
                                ) : (
                                    <Skeleton width="250px" />
                                )}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
