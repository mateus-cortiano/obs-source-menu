export enum eOBSEvents {
  "TransitionBegin",
  "SwitchScenes",
  "SourceCreated"
}

export type OBSEvent = keyof typeof eOBSEvents

export interface OBSMessage {
  "message-id"?: string | number,
  "salt"?: string,
  "challenge"?: string,
  "request-type"?: string,
  "update-type"?: string,
  "error"?: string,
  "active"?: number,
  "name"?: string,
  "scenes"?: any,
  "scene-name"?: string,
  "current-scene"?: string,
  "authRequired"?: string,
  [key: string]: any,
}

export class MessageBuffer {
  [index: number]: OBSMessage;

  has(index: number | string): Boolean { return Boolean(this[index as number]); }
  add(value: OBSMessage) { this[value["message-id"] as number] = value }
  get(index: number | string): OBSMessage { return this[index as number]; }
  pop(index: number | string): OBSMessage {
    let message: OBSMessage = this[index as number];
    delete this[index as number];
    return message;
  }
}

export interface CallbackMap extends Map<OBSEvent, Function[]> {

}