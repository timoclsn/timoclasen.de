import WebSocket from 'ws';

import { NodeProfile } from '@/lib/enums';

const { HOMEE_ID: homeeID, HOMEE_ACCESS_TOKEN: accessToken } = process.env;

export function getNodes() {
    return new Promise((resolve, reject) => {
        let nodes = [];

        const ws = new WebSocket(
            `wss://${homeeID}.hom.ee/connection?access_token=${accessToken}`,
            'v2'
        );

        ws.on('error', () => {
            reject(nodes);
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

export function formatValue(value, unit) {
    return `${roundValue(value)} ${decodeURIComponent(unit)}`;
}

export function isLight(node) {
    if (
        node.profile === NodeProfile.DimmableColorLight ||
        node.profile === NodeProfile.DimmableExtendedColorLight ||
        node.profile === NodeProfile.DimmableColorTemperatureLight ||
        node.profile === NodeProfile.DimmableLight ||
        node.profile === NodeProfile.DimmableLightWithBrightnessSensor ||
        node.profile ===
            NodeProfile.DimmableLightWithBrightnessAndPresenceSensor ||
        node.profile === NodeProfile.DimmableLightWithPresenceSensor ||
        node.profile === NodeProfile.DimmableRGBWLight
    ) {
        return true;
    }

    if (
        node.profile === NodeProfile.DimmableMeteringSwitch ||
        node.profile === NodeProfile.MeteringSwitch ||
        node.profile === NodeProfile.DimmableSwitch ||
        node.profile === NodeProfile.OnOffSwitch ||
        node.profile === NodeProfile.DoubleOnOffSwitch ||
        node.profile === NodeProfile.DimmableColorMeteringPlug ||
        node.profile === NodeProfile.OnOffSwitchWithBinaryInput ||
        node.profile === NodeProfile.DoubleMeteringSwitch ||
        node.profile === NodeProfile.OnOffPlug ||
        node.profile === NodeProfile.MeteringPlug ||
        node.profile === NodeProfile.DimmablePlug ||
        node.profile === NodeProfile.DimmableMeteringPlug ||
        node.profile === NodeProfile.DoubleOnOffPlug ||
        node.profile === NodeProfile.ImpulsePlug
    ) {
        if (node.image.includes('bulb') || node.image.includes('xmas')) {
            return true;
        }

        return false;
    }

    return false;
}
