import type { NextApiRequest, NextApiResponse } from 'next';

import { AttributeType, NodeState } from '../../lib/enums';
import type { Attribute, Node } from '../../lib/homee';
import {
  formatValue,
  getHexColor,
  getNodes,
  isLight,
  playHomeegram,
} from '../../lib/homee';
import { rateLimit } from '../../lib/rate-limit';

export interface SmartHomeData {
  lights: string;
  rain: string;
  temperature: string;
  humidity: string;
  energy: string;
  outsideTemperature: string;
  balconyOnOff: string;
  balconyColor: string;
}

type ColorHomeegramIds = Record<string, number>;

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Cache Size
});

export default async function smartHome(
  req: NextApiRequest,
  res: NextApiResponse<SmartHomeData | string>
) {
  if (req.method === 'PUT') {
    try {
      await limiter.check(res, 10, 'CACHE_SMART_HOME'); // 10 requests per minute

      const colorHomeegramIds: ColorHomeegramIds = {
        red: 239,
        green: 240,
        blue: 241,
      };

      const body = JSON.parse(req.body);
      const homeegramId = colorHomeegramIds[body.balconyColor];
      const response = await playHomeegram(homeegramId);

      await waitFor(2000); // Delay needed because HG also has a delay of 1 sec.

      return res.status(response.status).send('homee response');
    } catch {
      return res.status(429).send('Rate limit exceeded');
    }
  } else {
    const nodes = await getNodes();

    if (!nodes.length) {
      return res.status(504).send('Gateway Timeout');
    }

    const climateSensorId = 69;
    const climateSensorOutsideId = 72;
    const rainSensorId = 96;
    const balconyLightId = 257;

    const tempAtr = nodes
      .find((node: Node) => node.id === climateSensorId)
      ?.attributes.find(
        (attribute: Attribute) => attribute.type === AttributeType.Temperature
      );

    const humidityAtr = nodes
      .find((node: Node) => node.id === climateSensorId)
      ?.attributes.find(
        (attribute: Attribute) =>
          attribute.type === AttributeType.RelativeHumidity
      );

    const accumulatedEnergy = nodes
      .flatMap((node: Node) => {
        return (
          node.attributes.find(
            (attribute: Attribute) =>
              attribute.type === AttributeType.CurrentEnergyUse
          ) || []
        );
      })
      .reduce((acc: number, attribute: Attribute) => {
        return acc + attribute.current_value;
      }, 0);

    const lightsOn = nodes
      .flatMap((node: Node) => {
        if (isLight(node) && node.state === NodeState.Available) {
          return node.attributes.find(
            (attribute: Attribute) => attribute.type === AttributeType.OnOff
          );
        } else {
          return [];
        }
      })
      .some((attribute: Attribute | undefined) => {
        return attribute && attribute.current_value > 0;
      });

    const outsideTempAtr = nodes
      .find((node: Node) => node.id === climateSensorOutsideId)
      ?.attributes.find(
        (attribute: Attribute) => attribute.type === AttributeType.Temperature
      );

    const floodAlarmAtr = nodes
      .find((node: Node) => node.id === rainSensorId)
      ?.attributes.find(
        (attribute: Attribute) => attribute.type === AttributeType.FloodAlarm
      );

    const isRaining = floodAlarmAtr ? floodAlarmAtr.current_value > 0 : false;

    const balconyOnOffAtr = nodes
      .find((node: Node) => node.id === balconyLightId)
      ?.attributes.find(
        (attribute: Attribute) => attribute.type === AttributeType.OnOff
      );

    const balconyColorAtr = nodes
      .find((node: Node) => node.id === balconyLightId)
      ?.attributes.find(
        (attribute: Attribute) => attribute.type === AttributeType.Color
      );

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate=1200'
    );

    return res.status(200).json({
      lights: lightsOn ? 'An' : 'Aus',
      rain: outsideTempAtr
        ? isRaining
          ? outsideTempAtr.current_value > 0
            ? 'Es regnet'
            : 'Es schneit'
          : 'Kein Regen'
        : '',
      temperature: tempAtr
        ? formatValue(tempAtr.current_value, tempAtr.unit)
        : '',
      humidity: humidityAtr
        ? formatValue(humidityAtr.current_value, humidityAtr.unit)
        : '',
      energy: accumulatedEnergy ? formatValue(accumulatedEnergy, 'W') : '',
      outsideTemperature: outsideTempAtr
        ? formatValue(outsideTempAtr.current_value, outsideTempAtr.unit)
        : '',
      balconyOnOff:
        balconyOnOffAtr && balconyOnOffAtr.current_value ? 'An' : 'Aus',
      balconyColor: balconyColorAtr
        ? getHexColor(balconyColorAtr.current_value)
        : '',
    });
  }
}

async function waitFor(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
