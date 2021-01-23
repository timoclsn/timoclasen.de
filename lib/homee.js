import WebSocket from 'ws';

const homeeID = process.env.HOMEE_ID;
const accessToken = process.env.HOMEE_ACCESS_TOKEN;

export function getNodes() {
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

        ws.on('error', () => {
            reject();
        });

        ws.on('unexpected-response', () => {
            reject();
        });
    });
}

export function roundValue(value) {
    return Math.round(value * 10) / 10;
}
