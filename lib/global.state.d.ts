import * as i0 from "@angular/core";
export declare class GlobalState {
    private data;
    private dataStream$;
    private subscriptions;
    constructor();
    publish(event: any, value: any, force?: boolean): void;
    subscribe(event: string, callback: Function): void;
    onEvent(data: any): void;
    static ɵfac: i0.ɵɵFactoryDef<GlobalState, never>;
    static ɵprov: i0.ɵɵInjectableDef<GlobalState>;
}
