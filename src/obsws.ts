'use strict';
import {OBSMessage, OBSEvent, obsEvents} from './util/types.js';
import {backoff_timer, hasher} from './util/funcs.js';

class OBSWebSocket extends WebSocket {
  protected __password: string;
  protected __connected: Boolean;
  protected __uuid: number;
  protected __buffer: { [index: number]: OBSMessage };
  protected __callbacks: Map <OBSEvent, Function[]>;
  protected LOG_IO: boolean;

  get isconnected(): Boolean { return this.__connected }
  protected get password(): string { return this.__password }
  protected set connected(value: Boolean) { this.__connected = value }
  protected isevent(event: any): event is OBSEvent { return Boolean(event in obsEvents) }
  protected next_uuid(): string { return String(this.__uuid++) }
  protected get_buffer(index: number | string): OBSMessage | Boolean { return this.__buffer[Number(index)] }
  protected add_to_buffer(index: number | string, value: OBSMessage): void {this.__buffer[Number(index)] = value }
  protected pop_buffer(index: number | string): OBSMessage { 
    let message: OBSMessage = this.__buffer[Number(index)];
    delete this.__buffer[Number(index)];
    return message;
  }

  constructor(
    url: string = 'ws://localhost:4444',
    password: string = '',
    logging: boolean = true
  ) {
    super(url);
    this.__uuid = 1;
    this.__buffer = {};
    this.__password = password;
    this.__connected = false;
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
    await backoff_timer(() => {return Boolean(this.get_buffer(message_id))});

    return this.pop_buffer(message_id);
  }

  async message_handler(event: MessageEvent): Promise<void> {
    let message: OBSMessage = JSON.parse(event.data);
    let update: string = message['update-type'];

    this.add_to_buffer(message['message-id'], message);

    if (this.isevent(update) && this.__callbacks.has(update))
      this.emit_event(update);

    if (this.LOG_IO) console.log(">", message);
  }

  async connection_handler(): Promise<void> {
    let response:OBSMessage = await this.call('GetAuthRequired');

    if (response.authRequired)
      response = await this.call('Authenticate', {
        auth: hasher(this.password, response.salt, response.challenge)});
    if (response.error)
      throw response.error;

    this.connected = true;
  }
  
  add_event_listener(event: OBSEvent, callback: Function): void {
    if (!this.__callbacks.has(event))
      this.__callbacks.set(event, new Array());
  
    this.__callbacks.get(event).push(callback);
  }

  emit_event(event: OBSEvent): void {
    this.__callbacks.get(event).forEach(el => el());
  }
  
  async get_scene_list(exclude: string='.'): Promise<OBSMessage> {
    let active: number;
    let scenes: String[] = [];
    let response = await this.call('GetSceneList');

    response.scenes.forEach((el: any[]) => {
      if (!el['name'].startsWith(exclude))
        scenes.push(el['name']);
    })
    active = scenes.indexOf(response['current-scene']);

    return {'scenes': scenes, 'active': active};
  }

  async switch_to_scene(scene: string): Promise<void> {
    await this.call('SetCurrentScene', {'scene-name': scene});
  }

}

export default OBSWebSocket;