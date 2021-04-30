
export enum obsEvents { 
  SwitchScenes,
  TransitionBegin
}
export type OBSEvent = [keyof typeof obsEvents][number];



export interface OBSMessage {
  "message-id"?: string | number,
  "salt"?: string,
  "challenge"?: string,
  "request-type"?: string | undefined,
  "update-type"?: string | undefined,
  "error"?: string | undefined,
  "active"?: number | undefined,
  "name"?: "string" | undefined,
  "scenes"?: {[key: string]: any} | undefined,
  "scene-name"?: string | undefined,
  "current-scene"?: string,
  "authRequired"?: string | undefined,
  [key: string]: string | number | string[] | {} | undefined,
}