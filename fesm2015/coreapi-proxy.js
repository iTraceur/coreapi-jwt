import { __awaiter } from 'tslib';
import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵinject, Injector, ɵɵdefineNgModule, ɵɵdefineInjector, NgModule } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Promise } from 'bluebird';
import { auth, Client } from 'coreapi';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

class ConfigService {
    constructor() {
        this.data = null;
    }
    set(data) {
        this.data = data;
    }
    get(key) {
        return this.data[key];
    }
}
ConfigService.ɵfac = function ConfigService_Factory(t) { return new (t || ConfigService)(); };
ConfigService.ɵprov = ɵɵdefineInjectable({ token: ConfigService, factory: ConfigService.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ConfigService, [{
        type: Injectable
    }], null, null); })();

class GlobalState {
    constructor() {
        this._data = new Subject();
        this._dataStream$ = this._data.asObservable();
        this._subscriptions = new Map();
        this._dataStream$.subscribe((data) => this._onEvent(data));
    }
    notifyDataChanged(event, value, force = false) {
        const current = this._data[event];
        if (current !== value || force) {
            this._data[event] = value;
            this._data.next({
                event: event,
                data: this._data[event],
            });
        }
    }
    subscribe(event, callback) {
        const subscribers = this._subscriptions.get(event) || [];
        subscribers.push(callback);
        this._subscriptions.set(event, subscribers);
    }
    _onEvent(data) {
        const subscribers = this._subscriptions.get(data['event']) || [];
        subscribers.forEach((callback) => {
            callback.call(null, data['data']);
        });
    }
}
GlobalState.ɵfac = function GlobalState_Factory(t) { return new (t || GlobalState)(); };
GlobalState.ɵprov = ɵɵdefineInjectable({ token: GlobalState, factory: GlobalState.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(GlobalState, [{
        type: Injectable
    }], function () { return []; }, null); })();

class CoreAPIBaseService {
    constructor(client) {
        this.client = client;
    }
    action(keys, params = {}, extraParams = {}) {
        const actionParams = { Params: params, ExtraParams: extraParams };
        return this.client.action(keys, actionParams);
    }
}
CoreAPIBaseService.ɵfac = function CoreAPIBaseService_Factory(t) { return new (t || CoreAPIBaseService)(ɵɵinject(CoreAPIClient)); };
CoreAPIBaseService.ɵprov = ɵɵdefineInjectable({ token: CoreAPIBaseService, factory: CoreAPIBaseService.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(CoreAPIBaseService, [{
        type: Injectable
    }], function () { return [{ type: CoreAPIClient }]; }, null); })();
class CoreAPIConfigConsts {
}
CoreAPIConfigConsts.DEFAULT_HEADER_NAME = 'Authorization';
CoreAPIConfigConsts.HEADER_PREFIX_BEARER = 'JWT';
CoreAPIConfigConsts.DEFAULT_TOKEN_NAME = 'token';
const COREAPI_CONFIG_DEFAULTS = {
    headerName: CoreAPIConfigConsts.DEFAULT_HEADER_NAME,
    headerPrefix: null,
    tokenName: CoreAPIConfigConsts.DEFAULT_TOKEN_NAME,
    tokenGetter: () => localStorage.getItem(COREAPI_CONFIG_DEFAULTS.tokenName),
    noJwtError: false,
    noClientCheck: false,
    globalHeaders: [],
    noTokenScheme: false,
};
/**
 * Helper class to decode and find JWT expiration.
 */
class JwtHelper {
    urlBase64Decode(str) {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += '==';
                break;
            }
            case 3: {
                output += '=';
                break;
            }
            default: {
                throw new Error('Illegal base64url string!');
            }
        }
        return this.b64DecodeUnicode(output);
    }
    decodeToken(token) {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts');
        }
        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }
        return JSON.parse(decoded);
    }
    getTokenExpirationDate(token) {
        let decoded;
        decoded = this.decodeToken(token);
        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }
        const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
        date.setUTCSeconds(decoded.exp);
        return date;
    }
    isTokenExpired(token, offsetSeconds) {
        const date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date == null) {
            return false;
        }
        // Token expired?
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    }
    // credits for decoder goes to https://github.com/atk
    b64decode(str) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output = '';
        str = String(str).replace(/=+$/, '');
        if (str.length % 4 === 1) {
            throw new Error('"atob" failed: The string to be decoded is not correctly encoded.');
        }
        for (
        // initialize result and counters
        let bc = 0, bs, buffer, idx = 0; 
        // get next character
        (buffer = str.charAt(idx++)); 
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer &&
            ((bs = bc % 4 ? bs * 64 + buffer : buffer),
                // and if not first of each 4 characters,
                // convert the first 8 bits to one ascii character
                bc++ % 4)
            ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
            : 0) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        return output;
    }
    // https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
    b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map
            .call(this.b64decode(str), (c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
            .join(''));
    }
}
const injector = Injector.create({ providers: [{ provide: LocalStorageService }] });
const localStorageService = injector.get(LocalStorageService);
/**
 * Checks for presence of token and that token hasn't expired.
 * For use with the @CanActivate router decorator and NgIf
 */
function tokenNotExpired(tokenName = CoreAPIConfigConsts.DEFAULT_TOKEN_NAME, jwt) {
    const token = jwt || localStorageService.get(tokenName);
    const jwtHelper = new JwtHelper();
    return token != null && !jwtHelper.isTokenExpired(token);
}
/**
 * Sets up the authentication configuration.
 */
class CoreAPIConfig {
    constructor(config) {
        config = config || {};
        this._config = objectAssign({}, COREAPI_CONFIG_DEFAULTS, config);
        if (this._config.headerPrefix) {
            this._config.headerPrefix += ' ';
        }
        else if (this._config.noTokenScheme) {
            this._config.headerPrefix = '';
        }
        else {
            this._config.headerPrefix = CoreAPIConfigConsts.HEADER_PREFIX_BEARER;
        }
        if (config.tokenName && !config.tokenGetter) {
            this._config.tokenGetter = () => localStorage.getItem(config.tokenName);
        }
    }
    getConfig() {
        return this._config;
    }
}
class CoreAPIClient {
    constructor(options, config, globalState) {
        this.options = options;
        this.config = config;
        this.globalState = globalState;
        this.fetchingSchema = false;
        this.coreAPIConfig = options.getConfig();
        this.tokenStream = new Observable((obs) => {
            obs.next(this.coreAPIConfig.tokenGetter());
        });
        this.globalState.subscribe('user.logout', logout => {
            this._client = null;
            this.schema = null;
        });
        this.globalState.subscribe('user.tokenRefreshed', () => {
            this._client = null;
        });
    }
    get(url) {
        return this.client.get(url);
    }
    sleep(ms) {
        return new Promise((resolve, reject) => setTimeout(resolve, ms));
    }
    waitSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 600; i++) {
                yield this.sleep(100);
                if (this.schema) {
                    return;
                }
            }
        });
    }
    getSchema() {
        return new Promise((resolve, reject) => {
            if (!this.schema) {
                if (this.fetchingSchema) {
                    this.waitSchema()
                        .then(() => {
                        resolve(this.schema);
                    })
                        .catch(error => {
                        console.error(`Fetch schema timeout.`, error);
                        reject(error);
                    });
                }
                else {
                    const url = this.config.get('schemaUrl');
                    this.fetchingSchema = true;
                    this.get(url)
                        .then(data => {
                        this.schema = data;
                        resolve(this.schema);
                        this.fetchingSchema = false;
                    })
                        .catch(error => {
                        console.error(`Fetch schema failed.`, error);
                        reject(error);
                        this.fetchingSchema = false;
                    });
                }
            }
            else {
                resolve(this.schema);
            }
        });
    }
    action(keys, params = {}) {
        this.globalState.notifyDataChanged('http.loading', true);
        return new Promise((resolve, reject) => {
            this.getSchema()
                .then(doc => {
                this.client
                    .action(doc, keys, params.Params, params.ExtraParams)
                    .then(data => {
                    this.globalState.notifyDataChanged('http.loading', false);
                    resolve(data);
                })
                    .catch(error => {
                    let message = '';
                    if (Object.prototype.toString.call(error.content) === '[object Object]') { // Whether it is an Objec object
                        message = error.content.detail;
                    }
                    else {
                        message = error.content;
                    }
                    if (error.response.status === 401) {
                        this.globalState.notifyDataChanged('http.401', message);
                    }
                    else if (error.response.status === 403) {
                        this.globalState.notifyDataChanged('http.403', message, true);
                    }
                    else if (error.response.status === 500) {
                        this.globalState.notifyDataChanged('http.500', message, true);
                    }
                    else if (error.response.status === 501) {
                        this.globalState.notifyDataChanged('http.501', message, true);
                    }
                    this.globalState.notifyDataChanged('http.loading', false);
                    reject(error);
                });
            })
                .catch(error => {
                console.error(`Request ${keys} failed.`, error);
                this.globalState.notifyDataChanged('http.loading', false);
                reject(error);
            });
        });
    }
    get client() {
        if (!this._client) {
            const options = {
                auth: new auth.TokenAuthentication({
                    token: this.coreAPIConfig.tokenGetter(),
                    scheme: this.coreAPIConfig.headerPrefix,
                }),
            };
            this._client = new Client(options);
        }
        return this._client;
    }
}
CoreAPIClient.ɵfac = function CoreAPIClient_Factory(t) { return new (t || CoreAPIClient)(ɵɵinject(CoreAPIConfig), ɵɵinject(ConfigService), ɵɵinject(GlobalState)); };
CoreAPIClient.ɵprov = ɵɵdefineInjectable({ token: CoreAPIClient, factory: CoreAPIClient.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(CoreAPIClient, [{
        type: Injectable
    }], function () { return [{ type: CoreAPIConfig }, { type: ConfigService }, { type: GlobalState }]; }, null); })();
function coreAPIFactory(config, globalState) {
    const coreAPIConfig = {
        headerName: CoreAPIConfigConsts.DEFAULT_HEADER_NAME,
        headerPrefix: CoreAPIConfigConsts.HEADER_PREFIX_BEARER,
        tokenName: CoreAPIConfigConsts.DEFAULT_TOKEN_NAME,
        tokenGetter() {
            return localStorageService.get(coreAPIConfig.tokenName);
        },
        globalHeaders: [{ 'Content-Type': 'application/json' }],
        noJwtError: false,
        noTokenScheme: false,
    };
    return new CoreAPIClient(new CoreAPIConfig(coreAPIConfig), config, globalState);
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
const propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
    if (val === null || val === undefined) {
        throw new TypeError('Object.assign cannot be called with null or undefined');
    }
    return Object(val);
}
function objectAssign(target, ...source) {
    let from;
    let symbols;
    const to = toObject(target);
    for (let s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (const key in from) {
            if (hasOwnProperty.call(from, key)) {
                to[key] = from[key];
            }
        }
        if (Object.getOwnPropertySymbols) {
            symbols = Object.getOwnPropertySymbols(from);
            for (let i = 0; i < symbols.length; i++) {
                if (propIsEnumerable.call(from, symbols[i])) {
                    to[symbols[i]] = from[symbols[i]];
                }
            }
        }
    }
    return to;
}
class CoreAPIClientHttpError extends Error {
}

class CoreapiProxyModule {
}
CoreapiProxyModule.ɵmod = ɵɵdefineNgModule({ type: CoreapiProxyModule });
CoreapiProxyModule.ɵinj = ɵɵdefineInjector({ factory: function CoreapiProxyModule_Factory(t) { return new (t || CoreapiProxyModule)(); }, providers: [
        ConfigService,
        GlobalState,
        CoreAPIBaseService,
        {
            provide: CoreAPIClient,
            useFactory: coreAPIFactory,
            deps: [ConfigService, GlobalState],
        }
    ], imports: [[]] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(CoreapiProxyModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                imports: [],
                providers: [
                    ConfigService,
                    GlobalState,
                    CoreAPIBaseService,
                    {
                        provide: CoreAPIClient,
                        useFactory: coreAPIFactory,
                        deps: [ConfigService, GlobalState],
                    }
                ],
                exports: []
            }]
    }], null, null); })();

/*
 * Public API Surface of coreapi-proxy
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ConfigService, CoreAPIBaseService, CoreapiProxyModule, GlobalState, tokenNotExpired };
//# sourceMappingURL=coreapi-proxy.js.map
