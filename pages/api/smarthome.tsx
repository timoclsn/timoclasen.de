import { AttributeType, NodeState } from '../../lib/enums';
import {
    Attribute,
    formatValue,
    getNodes,
    isLight,
    Node
} from '../../lib/homee';
import { NextApiRequest, NextApiResponse } from 'next';

export interface SmartHomeData {
    lights: string;
    rain: string;
    temperature: string;
    humidity: string;
    energy: string;
    outsideTemperature: string;
}

export default async (
    _: NextApiRequest,
    res: NextApiResponse<SmartHomeData | string>
) => {
    const nodes = await getNodes();

    if (!nodes.length) {
        return res.status(504).send('Gateway Timeout');
    }

    const climateSensorId = 69;
    const climateSensorOutsideId = 72;
    const rainSensorId = 258;

    const tempAtr = nodes
        .find((node: Node) => node.id === climateSensorId)
        ?.attributes.find(
            (attribute: Attribute) =>
                attribute.type === AttributeType.Temperature
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
                    (attribute: Attribute) =>
                        attribute.type === AttributeType.OnOff
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
            (attribute: Attribute) =>
                attribute.type === AttributeType.Temperature
        );

    const floodAlarmAtr = nodes
        .find((node: Node) => node.id === rainSensorId)
        ?.attributes.find(
            (attribute: Attribute) =>
                attribute.type === AttributeType.FloodAlarm
        );

    const isRaining = floodAlarmAtr ? floodAlarmAtr.current_value > 0 : false;

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
            : ''
    });
};
