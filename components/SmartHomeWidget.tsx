import { useState } from 'react';
import {
  CloudSnow,
  Droplet,
  Sun,
  Thermometer,
  ToggleLeft,
  ToggleRight,
  Umbrella,
  Zap,
} from 'react-feather';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import { fetcher } from '../lib/fetcher';
import type { Counts } from '../pages/api/control-count';
import type { SmartHomeData } from '../pages/api/smarthome';
import { Button } from './Button';
import { Skeleton } from './Skeleton';
import { SmartHomeElement } from './SmartHomeElement';
import { useTheme } from './ThemeContext';
import { WidgetLayout } from './WidgetLayout';

const apiSecret = process.env.NEXT_PUBLIC_API_SECRET ?? '';

const fetchObj = {
  headers: {
    'api-secret': apiSecret,
  },
};

interface Props {
  text: string;
  footnote: string;
}

type BalconyColors = Record<string, string>;

const balconyColors: BalconyColors = {
  red: '#fa0501',
  green: '#03d304',
  blue: '#002dfb',
};

export function SmartHomeWidget({ text, footnote }: Props) {
  const { darkMode } = useTheme();
  const [disableButtons, setDisableButtons] = useState(false);

  const smartHomeApi = '/api/smarthome';
  const {
    data: smartHomeData,
    error: smartHomeError,
    mutate: mutateSmartHome,
  } = useSWR<SmartHomeData, string>([smartHomeApi, fetchObj]);

  const countApi = '/api/control-count';
  const {
    data: countData,
    error: countError,
    mutate: mutateCount,
  } = useSWR<Counts, string>([countApi, fetchObj]);

  const errorMessage = 'Nicht erreichbar…';

  async function controlLight(color: string, emoji: string) {
    setDisableButtons(true);

    const controlLightRequest = new Promise(async (resolve, reject) => {
      const response = await fetch(smartHomeApi, {
        method: 'PUT',
        headers: {
          'api-secret': apiSecret,
        },
        body: JSON.stringify({
          balconyColor: color,
        }),
      });

      if (response.status >= 400) {
        reject(response);
      } else {
        resolve(response);
      }
    });

    await toast.promise(
      controlLightRequest,
      {
        loading: 'Schalten...',
        success: () => {
          if (smartHomeData) {
            mutateSmartHome(
              {
                ...smartHomeData,
                balconyColor: balconyColors[color],
                balconyOnOff: 'An',
              },
              false
            );
          }
          mutateCount(async () => {
            return await fetcher(countApi, {
              method: 'PUT',
              headers: {
                'api-secret': apiSecret,
              },
              body: JSON.stringify({
                color: color,
              }),
            });
          }, false);

          setDisableButtons(false);

          splitbee.track('Balcony Light Control', {
            color: `${emoji} ${color}`,
          });

          return 'Balkon wurde eingeschaltet!';
        },
        error: () => {
          setDisableButtons(false);
          return 'Hat nicht funktioniert.';
        },
      },
      {
        success: {
          duration: 5000,
          icon: emoji,
        },
      }
    );
  }

  return (
    <section id="smarthome">
      <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
        Smart Home
      </h2>
      <div className="mb-8" dangerouslySetInnerHTML={{ __html: text }}></div>
      <WidgetLayout separate transparent>
        <div className="space-y-6 sm:space-y-8">
          <SmartHomeElement
            Icon={Thermometer}
            title="Raumtemperatur"
            value={smartHomeError ? errorMessage : smartHomeData?.temperature}
          />
          <SmartHomeElement
            Icon={Droplet}
            title="Luftfeuchtigkeit"
            value={smartHomeError ? errorMessage : smartHomeData?.humidity}
          />
          <SmartHomeElement
            Icon={Zap}
            title="Energieverbrauch"
            value={smartHomeError ? errorMessage : smartHomeData?.energy}
          />
        </div>
        <div className="-mt-6 space-y-6 sm:space-y-8 sm:mt-0">
          <SmartHomeElement
            Icon={smartHomeData?.lights === 'An' ? ToggleRight : ToggleLeft}
            title="Lichter"
            value={smartHomeError ? errorMessage : smartHomeData?.lights}
          />
          <SmartHomeElement
            Icon={Thermometer}
            title="Außentemperatur"
            value={
              smartHomeError ? errorMessage : smartHomeData?.outsideTemperature
            }
          />
          <SmartHomeElement
            Icon={
              smartHomeData?.rain === 'Es regnet'
                ? Umbrella
                : smartHomeData?.rain === 'Es schneit'
                ? CloudSnow
                : Sun
            }
            title="Regensensor"
            value={smartHomeError ? errorMessage : smartHomeData?.rain}
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
            {smartHomeData ? (
              <div
                className="flex items-center justify-center flex-none font-bold"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '9999px',
                  boxShadow:
                    smartHomeData.balconyOnOff === 'Aus'
                      ? 'none'
                      : `0 0 50px ${smartHomeData?.balconyColor}`,
                  backgroundColor:
                    smartHomeData.balconyOnOff === 'Aus'
                      ? darkMode
                        ? '#000000'
                        : '#FFFFFF'
                      : smartHomeData?.balconyColor,
                }}
              >
                <span>
                  {smartHomeData &&
                    smartHomeData.balconyOnOff === 'Aus' &&
                    smartHomeData.balconyOnOff}
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
                Hinterlasse mir einen Gruß und schalte meine Balkonbeleuchtung
                in eine Farbe deiner Wahl:
              </p>
              <div className="flex flex-col mb-4 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => controlLight('red', '🔥')}
                  disabled={disableButtons}
                >
                  🔥 Rot
                </Button>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => controlLight('green', '🌿')}
                  disabled={disableButtons}
                >
                  🌿 Grün
                </Button>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => controlLight('blue', '🌊')}
                  disabled={disableButtons}
                >
                  🌊 Blau
                </Button>
              </div>
            </div>
          </div>
          {!countError && (
            <div className="flex justify-center">
              <p className="text-sm opacity-60 whitespace-nowrap">
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
