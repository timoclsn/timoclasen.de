import WebSocket from 'ws';

const homeeID = process.env.HOMEE_ID;
const accessToken = process.env.HOMEE_ACCESS_TOKEN;

export default async (_, res) => {
    // Temperature
    const nodes = await getNodes(homeeID, accessToken);
    const livingRoomNode = nodes.find((node) => node.id === 69);
    const temperatureAttribute = livingRoomNode.attributes.find(
        (attribute) => attribute.type === 5
    );
    const temperature = `${roundValue(
        temperatureAttribute.current_value
    )} ${decodeURIComponent(temperatureAttribute.unit)}`;

    // Himidity
    const humidityAttribute = livingRoomNode.attributes.find(
        (attribute) => attribute.type === 7
    );
    const humidity = `${roundValue(
        humidityAttribute.current_value
    )} ${decodeURIComponent(humidityAttribute.unit)}`;

    // Energy
    const energyAttributes = nodes.flatMap((node) => {
        return node.attributes.find((attribute) => attribute.type === 3) || [];
    });
    const accumulatedEnergy = energyAttributes.reduce((acc, attribute) => {
        return acc + attribute.current_value;
    }, 0);
    const energy = `${roundValue(accumulatedEnergy)} W`;

    // Lights
    const lightAttributes = nodes.flatMap((node) => {
        if (
            node.profile === 1001 ||
            node.profile === 1002 ||
            node.profile === 1003 ||
            node.profile === 14 ||
            (node.profile === 1004 && node.state === 1)
        ) {
            return node.attributes.find((attribute) => attribute.type === 1);
        } else {
            return [];
        }
    });
    const lights = lightAttributes.some((attribute) => {
        return attribute.current_value > 0;
    })
        ? 'An'
        : 'Aus';

    // Outside temparature
    const outsideNode = nodes.find((node) => node.id === 72);
    const outsideTemperatureAttribute = outsideNode.attributes.find(
        (attribute) => attribute.type === 5
    );
    const outsideTemperature = `${roundValue(
        outsideTemperatureAttribute.current_value
    )} ${decodeURIComponent(outsideTemperatureAttribute.unit)}`;

    // Rain
    const rainNode = nodes.find((node) => node.id === 258);
    const rainAttribute = rainNode.attributes.find(
        (attribute) => attribute.type === 12
    );
    const rain = rainAttribute.current_value > 0 ? 'Es regnet' : 'Kein Regen';

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=600, stale-while-revalidate=1200'
    );

    return res.status(200).json({
        temperature,
        humidity,
        energy,
        lights,
        outsideTemperature,
        rain
    });
};

function getNodes(homeeID, accessToken) {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(
            `wss://${homeeID}.hom.ee/connection?access_token=${accessToken}`,
            'v2',
            {
                headers: {
                    'User-Agent': 'timoclasen.de / Smart Home Dashboard'
                }
            }
        );

        let nodes = [];

        ws.on('open', () => {
            ws.send('GET:nodes');
        });

        ws.on('message', (data) => {
            data = JSON.parse(data);

            if (data.nodes) {
                nodes = data.nodes;
                ws.close();
            }
        });

        ws.on('close', () => {
            if (nodes.length) {
                resolve(nodes);
            } else {
                reject();
            }
        });

        ws.on('error', (error) => {
            reject(error);
        });
    });
}

function roundValue(value) {
    return Math.round(value * 10) / 10;
}
