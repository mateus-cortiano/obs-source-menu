'use strict';
import { obsEvents } from './util/types.js';
import { backoff_timer, hasher } from './util/funcs.js';
class OBSWebSocket extends WebSocket {
    constructor(url = 'ws://localhost:4444', password = '', logging = true) {
        super(url);
        this.__uuid = 1;
        this.__buffer = {};
        this.__password = password;
        this.__connected = false;
        this.__callbacks = new Map();
        this.LOG_IO = logging;
        super.onopen = this.connection_handler;
        super.onmessage = this.message_handler;
    }
    get isconnected() { return this.__connected; }
    get password() { return this.__password; }
    set connected(value) { this.__connected = value; }
    isevent(event) { return Boolean(event in obsEvents); }
    next_uuid() { return String(this.__uuid++); }
    get_buffer(index) { return this.__buffer[Number(index)]; }
    add_to_buffer(index, value) { this.__buffer[Number(index)] = value; }
    pop_buffer(index) {
        let message = this.__buffer[Number(index)];
        delete this.__buffer[Number(index)];
        return message;
    }
    async send(request, payload) {
        let message = payload || {};
        message['message-id'] = this.next_uuid();
        message['request-type'] = request;
        super.send(JSON.stringify(message));
        if (this.LOG_IO)
            console.log("<", message);
        return message['message-id'];
    }
    async call(request, payload) {
        let message_id = await this.send(request, payload);
        await backoff_timer(() => { return Boolean(this.get_buffer(message_id)); });
        return this.pop_buffer(message_id);
    }
    async message_handler(event) {
        let message = JSON.parse(event.data);
        let update = message['update-type'];
        this.add_to_buffer(message['message-id'], message);
        if (this.isevent(update) && this.__callbacks.has(update))
            this.emit_event(update);
        if (this.LOG_IO)
            console.log(">", message);
    }
    async connection_handler() {
        let response = await this.call('GetAuthRequired');
        if (response.authRequired)
            response = await this.call('Authenticate', {
                auth: hasher(this.password, response.salt, response.challenge)
            });
        if (response.error)
            throw response.error;
        this.connected = true;
    }
    add_event_listener(event, callback) {
        if (!this.__callbacks.has(event))
            this.__callbacks.set(event, new Array());
        this.__callbacks.get(event).push(callback);
    }
    emit_event(event) {
        this.__callbacks.get(event).forEach(el => el());
    }
    async get_scene_list(exclude = '.') {
        let active;
        let scenes = [];
        let response = await this.call('GetSceneList');
        response.scenes.forEach((el) => {
            if (!el['name'].startsWith(exclude))
                scenes.push(el['name']);
        });
        active = scenes.indexOf(response['current-scene']);
        return { 'scenes': scenes, 'active': active };
    }
    async switch_to_scene(scene) {
        await this.call('SetCurrentScene', { 'scene-name': scene });
    }
}
export default OBSWebSocket;
