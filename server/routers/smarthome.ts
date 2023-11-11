import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { AttributeType, NodeState } from "../../lib/enums";
import {
  formatValue,
  getHexColor,
  getNodes,
  isLight,
  playHomeegram,
} from "../../lib/homee";
import { prisma } from "../../lib/prisma";
import { publicProcedure, router } from "../trpc";

type ColorHomeegramIds = Record<string, number>;

const colorSchema = z.enum(["red", "green", "blue"]);

export const smarthomeRouter = router({
  smarthome: publicProcedure
    .input(
      z
        .object({
          cached: z.boolean(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      if (input?.cached) {
        return cache;
      }

      const nodes = await getNodes();

      if (!nodes.length) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not get nodes.",
        });
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
        ?.attributes.find(
          (attribute) => attribute.type === AttributeType.OnOff,
        );

      const balconyColorAtr = nodes
        .find((node) => node.id === balconyLightId)
        ?.attributes.find(
          (attribute) => attribute.type === AttributeType.Color,
        );

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
    }),
  turnOnBalcony: publicProcedure
    .input(
      z.object({
        balconyColor: colorSchema,
      }),
    )
    .mutation(async ({ input }) => {
      const colorHomeegramIds: ColorHomeegramIds = {
        red: 239,
        green: 240,
        blue: 241,
      };

      const homeegramId = colorHomeegramIds[input.balconyColor];
      const response = await playHomeegram(homeegramId);

      await waitFor(2000); // Delay needed because HG also has a delay of 1 sec.

      return response.status;
    }),
  controlCount: publicProcedure.query(async () => {
    const rawCounts = await prisma.balcony_control.findMany();

    return rawCounts.reduce(
      (acc, count) => ({ ...acc, [count.color]: count.count }),
      {
        red: 0,
        green: 0,
        blue: 0,
      },
    );
  }),
  updateControlCount: publicProcedure
    .input(
      z.object({
        color: colorSchema,
      }),
    )
    .mutation(async ({ input }) => {
      const data = await prisma.balcony_control.update({
        where: {
          color: input.color,
        },
        data: {
          count: {
            increment: 1,
          },
        },
      });

      return data;
    }),
});

async function waitFor(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

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
