import WebSocket from 'ws';

const homeeID = process.env.HOMEE_ID;
const accessToken = process.env.HOMEE_ACCESS_TOKEN;

export default async (_, res) => {
    const nodes = await getNodes(homeeID, accessToken);

    const livingRoom = nodes.find((node) => node.id === 69);

    const temperature = livingRoom.attributes.find(
        (attribute) => attribute.type === 5
    );

    const humidity = livingRoom.attributes.find(
        (attribute) => attribute.type === 7
    );

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=600, stale-while-revalidate=1200'
    );

    return res.status(200).json({
        temperature: `${
            Math.round(temperature.current_value * 10) / 10
        } ${decodeURIComponent(temperature.unit)}`,
        humidity: `${
            Math.round(humidity.current_value * 10) / 10
        } ${decodeURIComponent(humidity.unit)}`
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
