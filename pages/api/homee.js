import WebSocket from 'ws';

const homeeID = process.env.HOMEE_ID;
const accessToken = process.env.HOMEE_ACCESS_TOKEN;

export default async (_, res) => {
    const nodes = await getNodes(homeeID, accessToken);

    const livingRoom = nodes.find((node) => node.id === 69);

    return res.status(200).json(livingRoom);
};

function getNodes(homeeID, accessToken) {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(
            `wss://${homeeID}.hom.ee/connection?access_token=${accessToken}`,
            'v2',
            {
                headers: {
                    'User-Agent': 'timoclasen.de'
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
