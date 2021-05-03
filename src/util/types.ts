export enum eOBSEvents {
  "TransitionBegin",
  "SwitchScenes"
}

export type OBSEvent = keyof typeof eOBSEvents

export interface OBSMessage {
  "message-id"?: string | number,
  "salt"?: string | undefined,
  "challenge"?: string | undefined,
  "request-type"?: string | undefined,
  "update-type"?: string | undefined,
  "error"?: string | undefined,
  "active"?: number | undefined,
  "name"?: string | undefined,
  "scenes"?: any | undefined,
  "scene-name"?: string | undefined,
  "current-scene"?: string | undefined,
  "authRequired"?: string | undefined,
  [key: string]: string | number | string[] | {} | any | undefined,
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