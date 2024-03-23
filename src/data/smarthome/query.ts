import { balconyControl } from "../../../db/schema";
import { AttributeType, NodeState } from "../../lib/enums";
import { formatValue, getHexColor, getNodes, isLight } from "../../lib/homee";
import { createQuery } from "../clients";

const useCachedData = false;

const cache = {
  lights: "An",
  rain: "Kein Regen",
  temperature: "21.8 °C",
  humidity: "45.6 %",
  energy: "11.9 W",
  outsideTemperature: "3.2 °C",
  balconyOnOff: "An",
  balconyColor: "#fa0501",
};

export const data = createQuery({
  cache: {
    noStore: true,
  },
  query: async () => {
    if (useCachedData) {
      return cache;
    }

    const nodes = await getNodes();

    if (!nodes.length) {
      throw new Error("No data available");
    }

    const climateSensorId = 69;
    const climateSensorOutsideId = 72;
    const rainSensorId = 96;
    const balconyLightId = 257;

    const tempAtr = nodes
      .find((node) => node.id === climateSensorId)
      ?.attributes.find(
        (attribute) => attribute.type === AttributeType.Temperature,
      );

    const humidityAtr = nodes
      .find((node) => node.id === climateSensorId)
      ?.attributes.find(
        (attribute) => attribute.type === AttributeType.RelativeHumidity,
      );

    const accumulatedEnergy = nodes
      .flatMap((node) => {
        return (
          node.attributes.find(
            (attribute) => attribute.type === AttributeType.CurrentEnergyUse,
          ) || []
        );
      })
      .reduce((acc: number, attribute) => {
        return acc + attribute.current_value;
      }, 0);

    const lightsOn = nodes
      .flatMap((node) => {
        if (isLight(node) && node.state === NodeState.Available) {
          return node.attributes.find(
            (attribute) => attribute.type === AttributeType.OnOff,
          );
        } else {
          return [];
        }
      })
      .some((attribute) => {
        return attribute && attribute.current_value > 0;
      });

    const outsideTempAtr = nodes
      .find((node) => node.id === climateSensorOutsideId)
      ?.attributes.find(
        (attribute) => attribute.type === AttributeType.Temperature,
      );

    const floodAlarmAtr = nodes
      .find((node) => node.id === rainSensorId)
      ?.attributes.find(
        (attribute) => attribute.type === AttributeType.FloodAlarm,
      );

    const isRaining = floodAlarmAtr ? floodAlarmAtr.current_value > 0 : false;

    const balconyOnOffAtr = nodes
      .find((node) => node.id === balconyLightId)
      ?.attributes.find((attribute) => attribute.type === AttributeType.OnOff);

    const balconyColorAtr = nodes
      .find((node) => node.id === balconyLightId)
      ?.attributes.find((attribute) => attribute.type === AttributeType.Color);

    return {
      lights: lightsOn ? "An" : "Aus",
      rain: outsideTempAtr
        ? isRaining
          ? outsideTempAtr.current_value > 0
            ? "Es regnet"
            : "Es schneit"
          : "Kein Regen"
        : "",
      temperature: tempAtr
        ? formatValue(tempAtr.current_value, tempAtr.unit)
        : "",
      humidity: humidityAtr
        ? formatValue(humidityAtr.current_value, humidityAtr.unit)
        : "",
      energy: accumulatedEnergy ? formatValue(accumulatedEnergy, "W") : "",
      outsideTemperature: outsideTempAtr
        ? formatValue(outsideTempAtr.current_value, outsideTempAtr.unit)
        : "",
      balconyOnOff:
        balconyOnOffAtr && balconyOnOffAtr.current_value ? "An" : "Aus",
      balconyColor: balconyColorAtr
        ? getHexColor(balconyColorAtr.current_value)
        : "",
    };
  },
});

export const controlCount = createQuery({
  cache: {
    keyParts: ["control-count"],
    options: {
      tags: ["control-count"],
    },
  },
  query: async ({ ctx }) => {
    const { db } = ctx;
    const rawCounts = await db.select().from(balconyControl);

    return rawCounts.reduce(
      (acc, count) => ({ ...acc, [count.color]: count.count }),
      {
        red: 0,
        green: 0,
        blue: 0,
      },
    );
  },
});
