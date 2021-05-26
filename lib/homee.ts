import WebSocket from 'ws';

import {
    AttributeBasedOn,
    AttributeChangedBy,
    AttributeState,
    AttributeType,
    CubeType,
    NodeProfile,
    NodeProtocol,
    NodeState
} from '../lib/enums';

const { HOMEE_ID: homeeID, HOMEE_ACCESS_TOKEN: accessToken } = process.env;

export interface Node {
    id: number;
    name: string;
    profile: NodeProfile;
    image: string;
    favorite: number;
    order: number;
    protocol: NodeProtocol;
    routing: number;
    state: NodeState;
    state_changed: number;
    added: number;
    history: number;
    cube_type: CubeType;
    note: string;
    services: number;
    phonetic_name: string;
    owner: number;
    security: number;
    attributes: Attribute[];
}

export interface Attribute {
    id: number;
    node_id: number;
    instance: number;
    minimum: number;
    maximum: number;
    current_value: number;
    target_value: number;
    last_value: number;
    unit: string;
    step_value: number;
    editable: number;
    type: AttributeType;
    state: AttributeState;
    last_changed: number;
    changed_by: AttributeChangedBy;
    changed_by_id: number;
    based_on: AttributeBasedOn;
    data: string;
    name: string;
    options: unknown;
}

export function getNodes() {
    return new Promise<Node[]>((resolve, reject) => {
        let nodes: Node[] = [];

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

        ws.on('message', (data: string) => {
            const dataObj: { nodes: Node[] } = JSON.parse(data);

            if (dataObj.nodes) {
                nodes = dataObj.nodes;
                ws.close();
            }
        });

        ws.on('close', () => {
            resolve(nodes);
        });
    });
}

export function roundValue(value: number) {
    return Math.round(value * 10) / 10;
}

export function formatValue(value: number, unit: string) {
    return `${roundValue(value)} ${decodeURIComponent(unit)}`;
}

export function isLight(node: Node) {
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
