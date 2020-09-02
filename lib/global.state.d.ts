export declare class GlobalState {
    private data;
    private dataStream$;
    private subscriptions;
    constructor();
    publish(event: any, value: any, force?: boolean): void;
    subscribe(event: string, callback: Function): void;
    onEvent(data: any): void;
}
