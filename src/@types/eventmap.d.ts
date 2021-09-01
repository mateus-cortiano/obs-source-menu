declare module 'mtx:eventmap' {
  
  type FunctionDescriptor = {
    func: Function;
    args: any[];
  };

  class EventMap<EventDescriptor extends string> {
    protected type: object;
    protected MAX_LISTENERS: number;
    logging: boolean;
    readonly id: string;
    protected _listeners: number;
    protected _: {
        [k in keyof EventDescriptor as string]?: FunctionDescriptor[];
    };
    get listeners(): number;
    constructor(type: object, MAX_LISTENERS?: number, id?: string, logging?: boolean);
    add(event: EventDescriptor, callback: Function, ...args: any[]): number;
    remove(event: EventDescriptor, index: number): void;
    clear(event: EventDescriptor): void;
    emit(event: EventDescriptor, context?: any): void;
    is_event(event: string): event is EventDescriptor;
    is_function_descriptor(event: any): event is FunctionDescriptor[];
  }

}