var SHA256 = new Hashes.SHA256;

class OBSWebSocket extends WebSocket {
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
    hash(salt, challenge, password) {
        const secret = SHA256.b64(password + salt) // .create()
        const auth_response = SHA256.b64(secret + challenge) //.create()
        return auth_response;
    }
    get connected() { return this.__connected; }
    get message() { return this.__message; }
    handle(msg) {
        this.__message = JSON.parse(msg.data);
    }
    async auth() {
        let res = await this.call("GetAuthRequired");
        if (res["authRequired"]) {
            this.call("Authenticate", {auth: this.hash(res["salt"], res["challenge"], this.__password)})
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
        for (let backoff = 50; this.__message["message-id"] !== id; backoff *= 2) {
            await this._delay(backoff);
            if (backoff > 5000)
                return Promise.reject(new Error("Response timeout expired"));
        }
        return this.__message;
    }
}
