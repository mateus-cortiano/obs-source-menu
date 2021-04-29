"use strict";
const ENABLE_LOGGING = false;
var SHA256 = new Hashes.SHA256();
class OBSWebSocket extends WebSocket {
    constructor(url, password) {
        super(url || "ws://localhost:4444");
        this.__uuid = 0;
        this.__connected = false;
        this.__password = password || "";
        this.__message = new Map();
        this.__callbacks = new Map();
        this.__callbacks.set("switch-scene", Array());
        this.addEventListener("message", this.messageHandler);
        super.onopen = this.auth;
    }
    get connected() {
        return this.__connected;
    }
    set onswitchscene(callback) {
        this.__callbacks.get("switch-scene").push(callback);
    }
    get _nextid() {
        this.__uuid++;
        return this.__uuid.toString();
    }
    hash(salt, challenge, password) {
        const secret = SHA256.b64(password + salt);
        const auth_response = SHA256.b64(secret + challenge);
        return auth_response;
    }
    async waitFor(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async retry(condition, maxRetries = 6) {
        async function backoff(retries = 0) {
            if (retries)
                await new Promise((resolve) => setTimeout(resolve, 2 ** retries * 100));
            if (condition())
                return Promise.resolve();
            if (retries > maxRetries)
                return Promise.reject("Max retries reached");
            return backoff(retries + 1);
        }
        return backoff();
    }
    async send(request, payload) {
        let R = payload || {};
        R["message-id"] = this._nextid;
        R["request-type"] = request;
        super.send(JSON.stringify(R));
        if (ENABLE_LOGGING)
            console.log(R);
        return R["message-id"];
    }
    async call(request, payload) {
        let id = await this.send(request, payload || {});
        await this.retry(() => {
            return this.__message.get(id);
        });
        let re = this.__message.get(id);
        this.__message.delete(id);
        return re;
    }
    messageHandler(msg) {
        let parsed = JSON.parse(msg.data);
        this.__message.set(parsed["message-id"], parsed);
        switch (parsed["update-type"]) {
            case "SwitchScenes":
                this.emit("switch-scene");
                break;
        }
        if (ENABLE_LOGGING)
            console.log(parsed);
    }
    async auth() {
        let res = await this.call("GetAuthRequired");
        if (res["authRequired"]) {
            res = await this.call("Authenticate", {
                auth: this.hash(res["salt"], res["challenge"], this.__password),
            });
            switch (res["error"]) {
                case undefined:
                    break;
                case "Authentication Failed.":
                    throw Error("Authentication Failed");
                default:
                    throw Error("Authentication Error");
            }
        }
        this.__connected = true;
    }
    async getSceneList(exclude = ".") {
        let scenes = [];
        let res = await this.call("GetSceneList");
        res["scenes"].forEach((el) => {
            if (!el["name"].startsWith(exclude))
                scenes.push(el["name"]);
        });
        let i_active = scenes.indexOf(res["current-scene"]);
        return { scenes: scenes, active: i_active };
    }
    async switchToScene(scene) {
        await this.call("SetCurrentScene", { "scene-name": scene });
    }
    emit(event) {
        this.__callbacks.get(event).forEach((el) => el());
    }
}
