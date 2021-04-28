// var sha256 = require( "sha.js/sha256" );

export class OBSWebSocket extends WebSocket {

  protected __connected: boolean;
  protected __uuid: number;
  protected __password: string;
  protected __message: any;

  protected get _nextid(): string {
    this.__uuid++;
    return this.__uuid.toString();
  }

  protected async _delay(ms: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // protected hash(salt:string, challenge:string, password:string) {
  //   const secret = new sha256()
  //     .update(password)
  //     .update(salt)
  //     .digest('base64');
  //   const auth_response = new sha256()
  //     .update(secret)
  //     .update(challenge)
  //     .digest('base64');
  //   return auth_response;
  // }

  constructor(url?: string, password?: string) {
    super(url || "ws://localhost:4444");

    this.__uuid = 0;
    this.__connected = false;
    this.__password = password || "";
    this.__message = {};
    this.addEventListener('message', this.handle);

    super.onopen = this.auth;
  }

  get connected(): boolean { return this.__connected; }
  get message()  : {}      { return this.__message; }

  handle(msg: MessageEvent<any>): void {
    this.__message = JSON.parse(msg.data);
  }

  async auth() {
    let res = await this.call("GetAuthRequired");
    if (res["authRequired"]) {
      // res = await this.call("Authenticate", {
      //   auth: this.hash(res["salt"], res["challenge"], this.__password)})
    }
    this.__connected = true;
  }

  async send(request:string, payload?: any): Promise<string> {
    let R = payload || {};
    R["message-id"] = this._nextid;
    R["request-type"] = request;
    super.send(JSON.stringify(R));
    return R["message-id"];
  }

  async call(request:string, payload?: any): Promise<any> {
    let id = await this.send(request, payload || {});
    let backoff = 50;
    while (this.__message["message-id"] !== id) {
      await this._delay(backoff *= 2);
      if (backoff > 5000) return Promise.reject("Response timeout expired");
    }
    return this.__message;
  }
}