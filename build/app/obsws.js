'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MessageBuffer } from './util/types.js';
import { backoff_timer, hasher } from './util/funcs.js';
class OBSWebSocket extends WebSocket {
    constructor(url = 'ws://localhost:4444', password = '', logging = true) {
        super(url);
        this.__uuid = 1;
        this.__connected = false;
        this.__password = password;
        this.__buffer = new MessageBuffer();
        this.__callbacks = new Map();
        this.LOG_IO = logging;
        super.onopen = this.connection_handler;
        super.onmessage = this.message_handler;
    }
    get isconnected() { return this.__connected; }
    get password() { return this.__password; }
    next_uuid() { return String(this.__uuid++); }
    send(request, payload) {
        const _super = Object.create(null, {
            send: { get: () => super.send }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let message = payload || {};
            message['message-id'] = this.next_uuid();
            message['request-type'] = request;
            _super.send.call(this, JSON.stringify(message));
            if (this.LOG_IO)
                console.log("<", message);
            return message['message-id'];
        });
    }
    call(request, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let message_id = yield this.send(request, payload);
            yield backoff_timer(() => { return Boolean(this.__buffer.has(message_id)); });
            return this.__buffer.pop(message_id);
        });
    }
    message_handler(event) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = JSON.parse(event.data);
            let update = message['update-type'];
            if (message['message-id'])
                this.__buffer.add(message['message-id'], message);
            if (this.__callbacks.has(update))
                this.emit_event(update);
            if (this.LOG_IO)
                console.log(">", message);
        });
    }
    connection_handler() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.call('GetAuthRequired');
            if (response.authRequired)
                response = yield this.call('Authenticate', {
                    auth: hasher(this.password, response.salt, response.challenge)
                });
            if (response.error)
                throw response.error;
            this.__connected = true;
        });
    }
    add_event_listener(event, callback) {
        if (!this.__callbacks.has(event))
            this.__callbacks.set(event, new Array());
        this.__callbacks.get(event).push(callback);
    }
    emit_event(event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.__callbacks.get(event).forEach((el) => __awaiter(this, void 0, void 0, function* () { return yield el(); }));
        });
    }
    get_scene_list(exclude = '.') {
        return __awaiter(this, void 0, void 0, function* () {
            let active;
            let scenes = [];
            let response = yield this.call('GetSceneList');
            response['scenes'].forEach((el) => {
                if (!el['name'].startsWith(exclude))
                    scenes.push(el['name']);
            });
            active = scenes.indexOf(response['current-scene']);
            return { 'scenes': scenes, 'active': active };
        });
    }
    switch_to_scene(scene) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.call('SetCurrentScene', { 'scene-name': scene });
        });
    }
}
export default OBSWebSocket;
