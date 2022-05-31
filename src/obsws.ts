'use strict'
import { OBSMessage, MessageBuffer, OBSEvent, eOBSEvents } from './util/types'
import { EventMap } from './util/eventmap'
import { wait_for_condition } from './util/timers'
import { hasher } from './util/hash'

/** WebSocket wrapper class that implements the obs-websocket protocol */
export class OBSWebSocket extends WebSocket {
  _: EventMap<OBSEvent>
  protected __password: string
  protected __connected: Boolean
  protected __uuid: number
  protected __buffer: MessageBuffer
  protected LOG_IO: boolean

  get isconnected(): Boolean {
    return this.__connected
  }
  protected get password(): string {
    return this.__password
  }
  protected next_uuid(): string {
    return String(this.__uuid++)
  }

  /**
   * constructs, connects and handles authentication
   * @param url server URI (default = 'ws://localhost:4444).
   * @param password authentication password.
   * @param logging log io messages (default = false).
   */
  constructor(
    url: string = 'ws://localhost:4444',
    password: string = '',
    logging: boolean = false
  ) {
    super(url)

    this._ = new EventMap<OBSEvent>(eOBSEvents)
    this.__uuid = 1
    this.__connected = false
    this.__password = password
    this.__buffer = new MessageBuffer()
    this.LOG_IO = logging

    super.onopen = this.connection_handler
    super.onmessage = this.message_handler
  }

  /**
   * transmits data using the WebSocket connection.
   * @param request the type of the request.
   * @param payload object with the request params.
   * @returns the message id.
   */
  async send(request: string, payload?: OBSMessage): Promise<string> {
    let message = payload || {}
    message['message-id'] = this.next_uuid()
    message['request-type'] = request
    super.send(JSON.stringify(message))

    if (this.LOG_IO) console.log('<', message)

    return message['message-id']
  }

  /**
   * transmits data and returns the response payload.
   * @param request the type of the request.
   * @param payload object with the request params.
   * @returns obs websocket response.
   */
  async call(request: string, payload?: OBSMessage): Promise<OBSMessage> {
    let message_id = await this.send(request, payload)
    await wait_for_condition(() => this.__buffer.has(message_id))
    return this.__buffer.pop(message_id)
  }

  /**
   * adds an event listener for the event.
   * @param event a valid obs event.
   * @param callback the function to be called when the event happens.
   * @param args args of the function be called (optional).
   * @returns the index of the added callback. use it to remove the listener later.
   */
  async add_event_listener(
    event: OBSEvent,
    callback: () => any,
    ...args: any
  ): Promise<number> {
    return await this._.add(event, callback, ...(args || null))
  }

  /* handlers */

  protected async message_handler(event: MessageEvent): Promise<void> {
    let message: OBSMessage = JSON.parse(event.data)
    let update = message['update-type'] as string

    if (message['message-id']) this.__buffer.add(message)

    if (update) this._.emit(update as OBSEvent)

    if (this.LOG_IO) console.log('>', message)
  }

  protected async connection_handler(): Promise<void> {
    let response: OBSMessage = await this.call('GetAuthRequired')

    if (response.authRequired)
      response = await this.call('Authenticate', {
        auth: hasher(
          this.password,
          response.salt as string,
          response.challenge as string
        )
      })

    if (response.error) throw response.error

    this.__connected = true
  }

  /* helper functions */

  /**
   * requests the scene list and returns an object that contains the scene list and the index of the active scene.
   * @param exclude string to exclude from the beggining of the scene list. use it to hide subscenes.
   * @returns object {'scenes': array of scenes, 'active': number index of the active scene}
   */
  async get_scene_list(exclude: string = '.'): Promise<OBSMessage> {
    let active: number
    let scenes: String[] = []
    let response = await this.call('GetSceneList')

    for (let scene of response['scenes'])
      if (!scene['name'].startsWith(exclude)) scenes.push(scene['name'])

    active = scenes.indexOf(response['current-scene'] as string)

    return { scenes: scenes, active: active }
  }

  /**
   * switch to scene...
   * @param scene the scene
   */
  async switch_to_scene(scene: string): Promise<void> {
    await this.call('SetCurrentScene', { 'scene-name': scene })
  }
}
