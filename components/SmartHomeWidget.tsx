import { useState } from "react";
import {
  CloudSnow,
  Droplet,
  Sun,
  Thermometer,
  ToggleLeft,
  ToggleRight,
  Umbrella,
  Zap,
} from "react-feather";
import toast from "react-hot-toast";

import { trpc } from "../utils/trpc";
import { Button } from "./Button";
import { Skeleton } from "./Skeleton";
import { SmartHomeElement } from "./SmartHomeElement";
import { useTheme } from "./ThemeContext";
import { WidgetLayout } from "./WidgetLayout";

interface Props {
  text: string;
  footnote: string;
}

export function SmartHomeWidget({ text, footnote }: Props) {
  const { darkMode } = useTheme();
  const [disableButtons, setDisableButtons] = useState(false);

  const utils = trpc.useContext();

  const { data: smartHomeData, error: smartHomeError } =
    trpc.smarthome.smarthome.useQuery({
      cached: false,
    });

  const mutateSmartHome = trpc.smarthome.turnOnBalcony.useMutation();

  const { data: countData, error: countError } =
    trpc.smarthome.controlCount.useQuery();

  const mutateCount = trpc.smarthome.updateControlCount.useMutation({
    onMutate: ({ color }) => {
      const oldData = utils.smarthome.controlCount.getData();
      if (!oldData) return { oldData };

      const newData = {
        ...oldData,
        [color]: oldData[color] + 1,
      };
      utils.smarthome.controlCount.setData(undefined, newData);

      return { oldData };
    },
    onError: (error, input, context) => {
      utils.smarthome.controlCount.setData(undefined, context?.oldData);
    },
  });

  const errorMessage = "Nicht erreichbar…";

  async function controlLight(color: "red" | "green" | "blue", emoji: string) {
    setDisableButtons(true);

    const toastId = toast.loading("Schalten...");
    mutateSmartHome.mutate(
      { balconyColor: color },
      {
        onSuccess: () => {
          toast.remove(toastId);
          toast.success("Balkon wurde eingeschaltet!", {
            icon: emoji,
            duration: 5000,
          });
          utils.smarthome.smarthome.invalidate();
          mutateCount.mutate(
            { color },
            {
              onSuccess: () => {
                setDisableButtons(false);
              },
            },
          );
          splitbee.track("Balcony Light Control", {
            color: `${emoji} ${color}`,
          });
        },
        onError: () => {
          toast.remove(toastId);
          toast.error("Hat nicht funktioniert.");
          setDisableButtons(false);
        },
      },
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
        <div className="-mt-6 space-y-6 sm:mt-0 sm:space-y-8">
          <SmartHomeElement
            Icon={smartHomeData?.lights === "An" ? ToggleRight : ToggleLeft}
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
              smartHomeData?.rain === "Es regnet"
                ? Umbrella
                : smartHomeData?.rain === "Es schneit"
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
        <div className="w-full max-w-screen-sm space-y-2 rounded-3xl bg-dark bg-opacity-10 px-6 py-6 dark:bg-light dark:bg-opacity-10 xl:px-12 xl:py-12">
          <div className="flex space-x-6">
            {smartHomeData ? (
              <div
                className="flex flex-none items-center justify-center font-bold"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "9999px",
                  boxShadow:
                    smartHomeData.balconyOnOff === "Aus"
                      ? "none"
                      : `0 0 50px ${smartHomeData?.balconyColor}`,
                  backgroundColor:
                    smartHomeData.balconyOnOff === "Aus"
                      ? darkMode
                        ? "#000000"
                        : "#FFFFFF"
                      : smartHomeData?.balconyColor,
                }}
              >
                <span>
                  {smartHomeData &&
                    smartHomeData.balconyOnOff === "Aus" &&
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
              <h2 className="text-md mb-2 font-bold md:text-xl lg:text-2xl">
                Balkonbeleuchtung
              </h2>
              <p className="text-md mb-4 opacity-60 md:text-lg lg:text-xl">
                Hinterlasse mir einen Gruß und schalte meine Balkonbeleuchtung
                in eine Farbe deiner Wahl:
              </p>
              <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => controlLight("red", "🔥")}
                  disabled={disableButtons}
                  fullWidth
                >
                  🔥 Rot
                </Button>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => controlLight("green", "🌿")}
                  disabled={disableButtons}
                  fullWidth
                >
                  🌿 Grün
                </Button>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => controlLight("blue", "🌊")}
                  disabled={disableButtons}
                  fullWidth
                >
                  🌊 Blau
                </Button>
              </div>
            </div>
          </div>
          {!countError && (
            <div className="flex justify-center">
              <p className="whitespace-nowrap text-sm opacity-60">
                {countData ? (
                  `Zähler: Rot ${countData.red} | Grün ${countData.green} | Blau ${countData.blue}`
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
