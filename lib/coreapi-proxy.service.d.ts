import { Promise } from 'bluebird';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from "./config.service";
import { GlobalState } from './global.state';
import * as i0 from "@angular/core";
export interface ActionParams {
    Params?: object;
    ExtraParams?: object;
}
export declare class CoreAPIBaseService {
    private client;
    constructor(client: CoreAPIClient);
    action(keys: Array<string>, params?: {}, extraParams?: {}): any;
    static ɵfac: i0.ɵɵFactoryDef<CoreAPIBaseService, never>;
    static ɵprov: i0.ɵɵInjectableDef<CoreAPIBaseService>;
}
export interface ICoreAPIConfig {
    globalHeaders: Array<Object>;
    headerName: string;
    headerPrefix: string;
    noJwtError: boolean;
    noClientCheck: boolean;
    noTokenScheme?: boolean;
    tokenGetter: () => string | Promise<string>;
    tokenName: string;
}
export interface ICoreAPIConfigOptional {
    headerName?: string;
    headerPrefix?: string;
    tokenName?: string;
    tokenGetter?: () => string | Promise<string>;
    noJwtError?: boolean;
    noClientCheck?: boolean;
    globalHeaders?: Array<Object>;
    noTokenScheme?: boolean;
}
export declare class CoreAPIConfigConsts {
    static DEFAULT_HEADER_NAME: string;
    static HEADER_PREFIX_BEARER: string;
    static DEFAULT_TOKEN_NAME: string;
}
/**
 * Helper class to decode and find JWT expiration.
 */
export declare class JwtHelper {
    urlBase64Decode(str: string): string;
    decodeToken(token: string): any;
    getTokenExpirationDate(token: string): Date;
    isTokenExpired(token: string, offsetSeconds?: number): boolean;
    private b64decode;
    private b64DecodeUnicode;
}
/**
 * Checks for presence of token and that token hasn't expired.
 * For use with the @CanActivate router decorator and NgIf
 */
export declare function tokenNotExpired(tokenName?: string, jwt?: string): boolean;
/**
 * Sets up the authentication configuration.
 */
export declare class CoreAPIConfig {
    _config: ICoreAPIConfig;
    constructor(config?: ICoreAPIConfigOptional);
    getConfig(): ICoreAPIConfig;
}
export declare class CoreAPIClient {
    private options;
    private config;
    private globalState;
    tokenStream: Observable<string>;
    private coreAPIConfig;
    private _client;
    private schema;
    private fetchingSchema;
    constructor(options: CoreAPIConfig, config: ConfigService, globalState: GlobalState);
    get(url: string): any;
    sleep(ms: any): any;
    waitSchema(): Promise<void>;
    getSchema(): any;
    action(keys: Array<string>, params?: ActionParams): Promise<any>;
    private get client();
    static ɵfac: i0.ɵɵFactoryDef<CoreAPIClient, never>;
    static ɵprov: i0.ɵɵInjectableDef<CoreAPIClient>;
}
export declare function coreAPIFactory(config: ConfigService, globalState: GlobalState): CoreAPIClient;
export declare class CoreAPIClientHttpError extends Error {
}
