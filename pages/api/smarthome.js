import { AttributeType, NodeState } from '@/lib/enums';
import { formatValue, getNodes, isLight } from '@/lib/homee';

export default async (_, res) => {
    const nodes = await getNodes();

    if (!nodes.length) {
        return res.status(504).send('Gateway Timeout');
    }

    const climateSensorId = 69;
    const climateSensorOutsideId = 72;
    const rainSensorId = 258;

    const tempAtr = nodes
        .find((node) => node.id === climateSensorId)
        .attributes.find(
            (attribute) => attribute.type === AttributeType.Temperature
        );

    const humidityAtr = nodes
        .find((node) => node.id === climateSensorId)
        .attributes.find(
            (attribute) => attribute.type === AttributeType.RelativeHumidity
        );

    const accumulatedEnergy = nodes
        .flatMap((node) => {
            return (
                node.attributes.find(
                    (attribute) =>
                        attribute.type === AttributeType.CurrentEnergyUse
                ) || []
            );
        })
        .reduce((acc, attribute) => {
            return acc + attribute.current_value;
        }, 0);

    const lightsOn = nodes
        .flatMap((node) => {
            if (isLight(node) && node.state === NodeState.Available) {
                return node.attributes.find(
                    (attribute) => attribute.type === AttributeType.OnOff
                );
            } else {
                return [];
            }
        })
        .some((attribute) => {
            return attribute.current_value > 0;
        });

    const outsideTempAtr = nodes
        .find((node) => node.id === climateSensorOutsideId)
        .attributes.find(
            (attribute) => attribute.type === AttributeType.Temperature
        );

    const isRaining =
        nodes
            .find((node) => node.id === rainSensorId)
            .attributes.find(
                (attribute) => attribute.type === AttributeType.FloodAlarm
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
