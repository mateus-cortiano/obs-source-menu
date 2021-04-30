'use strict';
// const TYPES = require('./util/types');
// const FUNCS = require('./util/funcs');
import {OBSMessage, MessageBuffer, OBSEvent} from './util/types';
import {backoff_timer, hasher} from './util/funcs';

export class OBSWebSocket extends WebSocket {
  protected __password: string;
  protected __connected: Boolean;
  protected __uuid: number;
  protected __buffer: MessageBuffer;
  protected __callbacks: Map <OBSEvent | undefined, Function[]>;
  protected LOG_IO: boolean;

  get isconnected(): Boolean { return this.__connected }
  protected get password(): string { return this.__password }
  protected next_uuid(): string { return String(this.__uuid++) }

  constructor(
    url: string = 'ws://localhost:4444',
    password: string = '',
    logging: boolean = false
  ) {
    super(url);
    
    this.__uuid = 1;
    this.__connected = false;
    this.__password = password;
    this.__buffer = new MessageBuffer();
    this.__callbacks = new Map <OBSEvent, Function[]>();
    this.LOG_IO = logging;

    super.onopen = this.connection_handler;
    super.onmessage = this.message_handler;
  }

  async send(request: string, payload?: OBSMessage): Promise<string> {
    let message = payload || {};
    message['message-id'] = this.next_uuid();
    message['request-type'] = request;
    super.send(JSON.stringify(message));

    if (this.LOG_IO) console.log("<", message);

    return message['message-id'];
  }

  async call(request: string, payload?: OBSMessage): Promise<OBSMessage> {
    let message_id = await this.send(request, payload);
    await backoff_timer(() => {return this.__buffer.has(message_id)});
    return this.__buffer.pop(message_id);
  }

  async message_handler(event: MessageEvent): Promise<void> {
    let message: OBSMessage = JSON.parse(event.data);
    let update = message['update-type'] as string;

    if (message['message-id'])
      this.__buffer.add(message);

    if (this.__callbacks.has(update as OBSEvent))
      this.emit_event(update as OBSEvent);

    if (this.LOG_IO) console.log(">", message);
  }

  async connection_handler(): Promise<void> {
    let response: OBSMessage = await this.call('GetAuthRequired');

    if (response.authRequired)
      response = await this.call('Authenticate', {
        auth: hasher(this.password, response.salt as string, response.challenge as string)});

    if (response.error)
      throw response.error;

    this.__connected = true;
  }

  add_event_listener(event: OBSEvent, callback: ()=>any): void {
    if (!this.__callbacks.has(event))
      this.__callbacks.set(event, new Array());
    this.__callbacks.get(event)!.push(callback);
  }

  async emit_event(event: OBSEvent): Promise<void> {
    this.__callbacks.get(event)!.forEach(async(el) => await el());
  }

  async get_scene_list(exclude: string='.'): Promise<OBSMessage> {
    let active: number;
    let scenes: String[] = [];
    let response = await this.call('GetSceneList');

    for (let scene of response['scenes'])
      if (!scene['name'].startsWith(exclude))
        scenes.push(scene['name']);
    
    active = scenes.indexOf(response['current-scene'] as string);

    return {'scenes': scenes, 'active': active};
  }

  async switch_to_scene(scene: string): Promise<void> {
    await this.call('SetCurrentScene', {'scene-name': scene});
  }

}