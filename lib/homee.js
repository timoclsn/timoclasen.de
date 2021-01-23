import WebSocket from 'ws';

const homeeID = process.env.HOMEE_ID;
const accessToken = process.env.HOMEE_ACCESS_TOKEN;

export function getNodes() {
    return new Promise((resolve) => {
        let nodes = [];

        const ws = new WebSocket(
            `wss://${homeeID}.hom.ee/connection?access_token=${accessToken}`,
            'v2'
        );

        ws.on('error', () => {
            resolve(nodes);
        });

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
            resolve(nodes);
        });
    });
}

export function roundValue(value) {
    return Math.round(value * 10) / 10;
}
