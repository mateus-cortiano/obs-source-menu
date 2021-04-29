const ENABLE_LOGGING: boolean = false;

var SHA256 = new Hashes.SHA256();

class OBSWebSocket extends WebSocket {
  /* properties, getters and setters */
  protected __connected: boolean;
  protected __uuid: number;
  protected __password: string;
  protected __message: Map<any, any>;
  protected __callbacks: Map<string, Array<Function>>;

  get connected(): boolean {
    return this.__connected;
  }

  set onswitchscene(callback: Function) {
    this.__callbacks.get("switch-scene").push(callback);
  }

  protected get _nextid(): string {
    this.__uuid++;
    return this.__uuid.toString();
  }

  protected hash(salt: string, challenge: string, password: string) {
    const secret = SHA256.b64(password + salt);
    const auth_response = SHA256.b64(secret + challenge);
    return auth_response;
  }

  async waitFor(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async retry(
    condition: (args?: any) => boolean,
    maxRetries: number = 6
  ): Promise<any> {
    async function backoff(retries: number = 0): Promise<any> {
      if (retries)
        await new Promise((resolve) => setTimeout(resolve, 2 ** retries * 100));
      if (condition()) return Promise.resolve();
      if (retries > maxRetries) return Promise.reject("Max retries reached");
      return backoff(retries + 1);
    }
    return backoff();
  }

  constructor(url?: string, password?: string) {
    super(url || "ws://localhost:4444");

    this.__uuid = 0;
    this.__connected = false;
    this.__password = password || "";
    this.__message = new Map<Number, object>();
    this.__callbacks = new Map<string, Function[]>();
    this.__callbacks.set("switch-scene", Array<Function>())!;
    this.addEventListener("message", this.messageHandler);

    super.onopen = this.auth;
  }

  /* base functions and handlers */
  async send(request: string, payload?: any): Promise<string> {
    let R = payload || {};
    R["message-id"] = this._nextid;
    R["request-type"] = request;
    super.send(JSON.stringify(R));
    if (ENABLE_LOGGING) console.log(R);
    return R["message-id"];
  }

  async call(request: string, payload?: any): Promise<any> {
    let id = await this.send(request, payload || {});
    await this.retry(() => {
      return this.__message.get(id);
    });
    let re = this.__message.get(id);
    this.__message.delete(id);
    return re;
  }

  messageHandler(msg: MessageEvent<any>): void {
    let parsed = JSON.parse(msg.data);
    this.__message.set(parsed["message-id"], parsed);
    switch (parsed["update-type"]) {
      case "SwitchScenes":
        this.emit("switch-scene");
        break;
    }
    if (ENABLE_LOGGING) console.log(parsed);
  }

  /* implemented functions */
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

  async getSceneList(exclude: string = "."): Promise<object> {
    let scenes: Array<string> = [];
    let res = await this.call("GetSceneList");
    res["scenes"].forEach((el: any) => {
      if (!el["name"].startsWith(exclude)) scenes.push(el["name"]);
    });
    let i_active = scenes.indexOf(res["current-scene"]);
    return { scenes: scenes, active: i_active };
  }

  async switchToScene(scene: string) {
    await this.call("SetCurrentScene", { "scene-name": scene });
  }

  /* emit events */
  protected emit(event: string) {
    this.__callbacks.get(event).forEach((el: Function) => el());
  }
}
