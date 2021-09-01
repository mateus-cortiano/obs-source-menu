export type FunctionDescriptor = {func: Function, args: any[]}

export class EventMap<EventDescriptor extends string> {

  readonly id: string;
  protected _listeners: number;
  protected _: { [k in keyof EventDescriptor as string]?: FunctionDescriptor[] };

  get listeners(): number { return this._listeners };

  constructor(
    protected type: object,
    protected MAX_LISTENERS = 50,
    id?: string,
    public logging: boolean = false
  ) {
    this.id = id || String(Math.trunc(Math.random()*789456));
    this._listeners = 0;
    this._ = {};
  }

  async add(event: EventDescriptor, callback: Function, ...args: any[]): Promise<number> {
    let success:number = -1;
    try {
      if (this._listeners >= this.MAX_LISTENERS)
        console.error(`EventMap:${this.id}> max listners reached (max=${this.MAX_LISTENERS})`);
      else if (this.is_event(event)) {
        success = this._[event]!.push({func: callback, args: [...args]})! - 1;
        this._listeners++;
      }
    } catch (TypeError) {
      if (this.is_event(event)) {
        this._[event] = new Array<FunctionDescriptor>();
        success = this._[event]!.push({func: callback, args: [...args]})! - 1;
        this._listeners++;
      } else {
        console.error(`EventMap:${this.id}> invalid event: ${event}`);
      }
    } finally {
      return success;
    }
  }

  async remove(event: EventDescriptor, index: number) { this._listeners--; this._[event]!.splice(index, 1); }

  async clear(event: EventDescriptor) {
    while (this._[event]?.pop()) {
      this._listeners--;
    }
    this._[event] = new Array<FunctionDescriptor>();
  }

  async emit(event: EventDescriptor, context?: any) {
    try {
      if (this.is_event(event) && this.is_function_descriptor(this._[event])) { 
          if (context)
            for (let callback of this._[event]!)
              await callback.func(context, ...callback.args);
          else
            for (let callback of this._[event]!)
              await callback.func(...callback.args);
      }
      else
        throw TypeError;
    } catch (TypeError) {
      if (this.logging) console.log(`EventMap:${this.id}> no callbacks associated with event: ${event}`);
    }
  }

  is_event(event: string): event is EventDescriptor {
    return Object.keys(this.type).some((value) => { return event == value; })
  }

  is_function_descriptor(event: any): event is FunctionDescriptor[] {
    return event.some((value: any) => { return Boolean(value); })
  }

}