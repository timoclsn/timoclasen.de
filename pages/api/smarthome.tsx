import { AttributeType, NodeState } from '../../lib/enums';
import { formatValue, getNodes, isLight } from '../../lib/homee';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (_: NextApiRequest, res: NextApiResponse) => {
    const nodes = await getNodes();

    if (!nodes.length) {
        return res.status(504).send('Gateway Timeout');
    }

    const climateSensorId = 69;
    const climateSensorOutsideId = 72;
    const rainSensorId = 258;

    const tempAtr = nodes
        .find((node: any) => node.id === climateSensorId)
        .attributes.find(
            (attribute: any) => attribute.type === AttributeType.Temperature
        );

    const humidityAtr = nodes
        .find((node: any) => node.id === climateSensorId)
        .attributes.find(
            (attribute: any) =>
                attribute.type === AttributeType.RelativeHumidity
        );

    const accumulatedEnergy = nodes
        .flatMap((node: any) => {
            return (
                node.attributes.find(
                    (attribute: any) =>
                        attribute.type === AttributeType.CurrentEnergyUse
                ) || []
            );
        })
        .reduce((acc: any, attribute: any) => {
            return acc + attribute.current_value;
        }, 0);

    const lightsOn = nodes
        .flatMap((node: any) => {
            if (isLight(node) && node.state === NodeState.Available) {
                return node.attributes.find(
                    (attribute: any) => attribute.type === AttributeType.OnOff
                );
            } else {
                return [];
            }
        })
        .some((attribute: any) => {
            return attribute.current_value > 0;
        });

    const outsideTempAtr = nodes
        .find((node: any) => node.id === climateSensorOutsideId)
        .attributes.find(
            (attribute: any) => attribute.type === AttributeType.Temperature
        );

    const isRaining =
        nodes
            .find((node: any) => node.id === rainSensorId)
            .attributes.find(
                (attribute: any) => attribute.type === AttributeType.FloodAlarm
            ).current_value > 0;

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=600, stale-while-revalidate=1200'
    );

    return res.status(200).json({
        lights: lightsOn ? 'An' : 'Aus',
        rain: isRaining
            ? outsideTempAtr.current_value > 0
                ? 'Es regnet'
                : 'Es schneit'
            : 'Kein Regen',
        temperature: formatValue(tempAtr.current_value, tempAtr.unit),
        humidity: formatValue(humidityAtr.current_value, humidityAtr.unit),
        energy: formatValue(accumulatedEnergy, 'W'),
        outsideTemperature: formatValue(
            outsideTempAtr.current_value,
            outsideTempAtr.unit
        )
    });
};
