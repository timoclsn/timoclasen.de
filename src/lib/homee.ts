import { Effect } from "effect";
import WebSocket from "ws";
import { z } from "zod";

import { PlayHomeegramError } from "./effect";
import { AttributeType, NodeProfile, NodeState } from "./enums";

const { HOMEE_ID, HOMEE_ACCESS_TOKEN } = process.env;

const attributeSchema = z.object({
  type: z.nativeEnum(AttributeType).or(z.unknown()),
  current_value: z.number(),
  unit: z.string(),
});

const nodeSchema = z.object({
  id: z.number(),
  profile: z.nativeEnum(NodeProfile).or(z.unknown()),
  state: z.nativeEnum(NodeState).or(z.unknown()),
  image: z.string(),
  attributes: z.array(attributeSchema),
});
type Node = z.infer<typeof nodeSchema>;

export function getNodes() {
  return new Promise<Array<Node>>((resolve, reject) => {
    let nodes: Array<Node> = [];

    const ws = new WebSocket(
      `wss://${HOMEE_ID}.hom.ee/connection?access_token=${HOMEE_ACCESS_TOKEN}`,
      "v2",
    );

    ws.on("error", () => {
      reject(nodes);
    });

    ws.on("open", () => {
      ws.send("GET:nodes");
    });

    ws.on("message", (data: string) => {
      const dataJson = JSON.parse(data);

      if (dataJson.nodes) {
        nodes = z.array(nodeSchema).parse(dataJson.nodes);
        ws.close();
      }
    });

    ws.on("close", () => {
      resolve(nodes);
    });
  });
}

export const playHomeegram = (homeegramID: number) =>
  Effect.tryPromise({
    try: async () => {
      const response = await fetch(
        `https://${HOMEE_ID}.hom.ee/api/v2/homeegrams/${homeegramID}?play=1`,
        {
          method: "PUT",
          headers: {
            Cookie: HOMEE_ACCESS_TOKEN,
          },
        },
      );

      if (!response.ok) {
        throw new Error();
      }
    },
    catch: (error) =>
      new PlayHomeegramError({
        cause: error,
      }),
  });

export function roundValue(value: number) {
  return Math.round(value * 10) / 10;
}

export function formatValue(value: number, unit: string) {
  return `${roundValue(value)} ${decodeURIComponent(unit)}`;
}

export function isLight(node: Node) {
  switch (node.profile) {
    case NodeProfile.DimmableColorLight:
    case NodeProfile.DimmableExtendedColorLight:
    case NodeProfile.DimmableColorTemperatureLight:
    case NodeProfile.DimmableLight:
    case NodeProfile.DimmableLightWithBrightnessSensor:
    case NodeProfile.DimmableLightWithBrightnessAndPresenceSensor:
    case NodeProfile.DimmableLightWithPresenceSensor:
    case NodeProfile.DimmableRGBWLight:
      return true;
    case NodeProfile.DimmableMeteringSwitch:
    case NodeProfile.MeteringSwitch:
    case NodeProfile.DimmableSwitch:
    case NodeProfile.OnOffSwitch:
    case NodeProfile.DoubleOnOffSwitch:
    case NodeProfile.DimmableColorMeteringPlug:
    case NodeProfile.OnOffSwitchWithBinaryInput:
    case NodeProfile.DoubleMeteringSwitch:
    case NodeProfile.OnOffPlug:
    case NodeProfile.MeteringPlug:
    case NodeProfile.DimmablePlug:
    case NodeProfile.DimmableMeteringPlug:
    case NodeProfile.DoubleOnOffPlug:
    case NodeProfile.ImpulsePlug:
      return node.image.includes("bulb") || node.image.includes("xmas");
    default:
      return false;
  }
}

export function getHexColor(number: number) {
  let hexString = number.toString(16);

  while (hexString.length < 6) {
    hexString = "0" + hexString;
  }

  return "#" + hexString;
}
