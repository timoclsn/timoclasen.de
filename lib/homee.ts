import WebSocket from 'ws';

import {
  AttributeBasedOn,
  AttributeChangedBy,
  AttributeState,
  AttributeType,
  CubeType,
  NodeProfile,
  NodeProtocol,
  NodeState,
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

export async function playHomeegram(homeegramID: number) {
  return await fetch(
    `https://${homeeID}.hom.ee/api/v2/homeegrams/${homeegramID}?play=1`,
    {
      method: 'PUT',
      headers: {
        Cookie: accessToken ?? '',
      },
    }
  );
}

export function roundValue(value: number) {
  return Math.round(value * 10) / 10;
}

export function formatValue(value: number, unit: string) {
  return `${roundValue(value)} ${decodeURIComponent(unit)}`;
}

export function isLight(node: Node) {
  switch (node.profile) {
    case NodeProfile.DimmableColorLight:
    case NodeProfile.DimmableExtendedColorLight:
    case NodeProfile.DimmableColorTemperatureLight:
    case NodeProfile.DimmableLight:
    case NodeProfile.DimmableLightWithBrightnessSensor:
    case NodeProfile.DimmableLightWithBrightnessAndPresenceSensor:
    case NodeProfile.DimmableLightWithPresenceSensor:
    case NodeProfile.DimmableRGBWLight:
      return true;
    case NodeProfile.DimmableMeteringSwitch:
    case NodeProfile.MeteringSwitch:
    case NodeProfile.DimmableSwitch:
    case NodeProfile.OnOffSwitch:
    case NodeProfile.DoubleOnOffSwitch:
    case NodeProfile.DimmableColorMeteringPlug:
    case NodeProfile.OnOffSwitchWithBinaryInput:
    case NodeProfile.DoubleMeteringSwitch:
    case NodeProfile.OnOffPlug:
    case NodeProfile.MeteringPlug:
    case NodeProfile.DimmablePlug:
    case NodeProfile.DimmableMeteringPlug:
    case NodeProfile.DoubleOnOffPlug:
    case NodeProfile.ImpulsePlug:
      return node.image.includes('bulb') || node.image.includes('xmas');
    default:
      return false;
  }
}

export function getHexColor(number: number) {
  let hexString = number.toString(16);

  while (hexString.length < 6) {
    hexString = '0' + hexString;
  }

  return '#' + hexString;
}
