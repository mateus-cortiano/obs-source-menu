export class OBSWebSocket extends WebSocket {
    constructor(url, password) {
        super(url || "ws://localhost:4444");
        this.__uuid = 0;
        this.__connected = false;
        this.__password = password || "";
        this.__message = {};
        this.addEventListener('message', this.handle);
        super.onopen = this.auth;
    }
    get _nextid() {
        this.__uuid++;
        return this.__uuid.toString();
    }
    async _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    get connected() { return this.__connected; }
    get message() { return this.__message; }
    handle(msg) {
        this.__message = JSON.parse(msg.data);
    }
    async auth() {
        let res = await this.call("GetAuthRequired");
        if (res["authRequired"]) {
        }
        this.__connected = true;
    }
    async send(request, payload) {
        let R = payload || {};
        R["message-id"] = this._nextid;
        R["request-type"] = request;
        super.send(JSON.stringify(R));
        return R["message-id"];
    }
    async call(request, payload) {
        let id = await this.send(request, payload || {});
        let backoff = 50;
        while (this.__message["message-id"] !== id) {
            await this._delay(backoff *= 2);
            if (backoff > 5000)
                return Promise.reject("Response timeout expired");
        }
        return this.__message;
    }
}
