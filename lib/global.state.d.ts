export declare class GlobalState {
    private _data;
    private _dataStream$;
    private _subscriptions;
    constructor();
    notifyDataChanged(event: any, value: any, force?: boolean): void;
    subscribe(event: string, callback: Function): void;
    _onEvent(data: any): void;
}
