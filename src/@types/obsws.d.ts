import { EventMap } from 'mtx:eventmap';

declare module 'mtx:obsws' {

  enum eOBSEvents {
    "TransitionBegin",
    "SwitchScenes",
    "SourceCreated"
  }

  type OBSEvent = keyof typeof eOBSEvents

  interface OBSMessage {
    "message-id"?: string | number;
    "salt"?: string;
    "challenge"?: string;
    "request-type"?: string;
    "update-type"?: string;
    "error"?: string;
    "active"?: number;
    "name"?: string;
    "scenes"?: any;
    "scene-name"?: string;
    "current-scene"?: string;
    "authRequired"?: string;
    [key: string]: any;
  }

  class MessageBuffer {
    [index: number]: OBSMessage;
    has(index: number | string): Boolean;
    add(value: OBSMessage): void;
    get(index: number | string): OBSMessage;
    pop(index: number | string): OBSMessage;
  }

  /** WebSocket wrapper class that implements the obs-websocket protocol */
   class OBSWebSocket extends WebSocket {
      _: EventMap<OBSEvent>;
      protected __password: string;
      protected __connected: Boolean;
      protected __uuid: number;
      protected __buffer: MessageBuffer;
      protected LOG_IO: boolean;
      get isconnected(): Boolean;
      protected get password(): string;
      protected next_uuid(): string;
      /**
       * constructs, connects and handles authentication
       * @param url server URI (default = 'ws://localhost:4444).
       * @param password authentication password.
       * @param logging log io messages (default = false).
       */
      constructor(url?: string, password?: string, logging?: boolean);
      /**
       * transmits data using the WebSocket connection.
       * @param request the type of the request.
       * @param payload object with the request params.
       * @returns the message id.
       */
      send(request: string, payload?: OBSMessage): Promise<string>;
      /**
       * transmits data and returns the response payload.
       * @param request the type of the request.
       * @param payload object with the request params.
       * @returns obs websocket response.
       */
      call(request: string, payload?: OBSMessage): Promise<OBSMessage>;
      /**
       * adds an event listener for the event.
       * @param event a valid obs event.
       * @param callback the function to be called when the event happens.
       * @param args args of the function be called (optional).
       * @returns the index of the added callback. use it to remove the listener later.
       */
      add_event_listener(event: OBSEvent, callback: () => any, ...args: any): Promise<number>;
      protected message_handler(event: MessageEvent): Promise<void>;
      protected connection_handler(): Promise<void>;
      /**
       * requests the scene list and returns an object that contains the scene list and the index of the active scene.
       * @param exclude string to exclude from the beggining of the scene list. use it to hide subscenes.
       * @returns object {'scenes': array of scenes, 'active': number index of the active scene}
       */
      get_scene_list(exclude?: string): Promise<OBSMessage>;
      /**
       * switch to scene...
       * @param scene the scene
       */
      switch_to_scene(scene: string): Promise<void>;
  }
}