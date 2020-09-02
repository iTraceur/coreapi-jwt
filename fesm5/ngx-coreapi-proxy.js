import { __decorate, __awaiter, __generator, __extends } from 'tslib';
import { Injectable, Injector, NgModule } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Promise } from 'bluebird';
import { auth, Client } from 'coreapi';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

var ConfigService = /** @class */ (function () {
    function ConfigService() {
        this.data = null;
    }
    ConfigService.prototype.set = function (data) {
        this.data = data;
    };
    ConfigService.prototype.get = function (key) {
        return this.data[key];
    };
    ConfigService = __decorate([
        Injectable()
    ], ConfigService);
    return ConfigService;
}());

var GlobalState = /** @class */ (function () {
    function GlobalState() {
        var _this = this;
        this.data = new Subject();
        this.dataStream$ = this.data.asObservable();
        this.subscriptions = new Map();
        this.dataStream$.subscribe(function (data) { return _this.onEvent(data); });
    }
    GlobalState.prototype.publish = function (event, value, force) {
        if (force === void 0) { force = false; }
        var current = this.data[event];
        if (current !== value || force) {
            this.data[event] = value;
            this.data.next({
                event: event,
                data: this.data[event],
            });
        }
    };
    GlobalState.prototype.subscribe = function (event, callback) {
        var subscribers = this.subscriptions.get(event) || [];
        if (subscribers.indexOf(callback) < 0) {
            subscribers.push(callback);
        }
        this.subscriptions.set(event, subscribers);
    };
    GlobalState.prototype.onEvent = function (data) {
        var subscribers = this.subscriptions.get(data['event']) || [];
        subscribers.forEach(function (callback) {
            callback.call(null, data['data']);
        });
    };
    GlobalState = __decorate([
        Injectable()
    ], GlobalState);
    return GlobalState;
}());

var CoreAPIBaseService = /** @class */ (function () {
    function CoreAPIBaseService(client) {
        this.client = client;
    }
    CoreAPIBaseService.prototype.action = function (keys, params, extraParams) {
        if (params === void 0) { params = {}; }
        if (extraParams === void 0) { extraParams = {}; }
        var actionParams = { Params: params, ExtraParams: extraParams };
        return this.client.action(keys, actionParams);
    };
    CoreAPIBaseService.ctorParameters = function () { return [
        { type: CoreAPIClient }
    ]; };
    CoreAPIBaseService = __decorate([
        Injectable()
    ], CoreAPIBaseService);
    return CoreAPIBaseService;
}());
var CoreAPIConfigConsts = /** @class */ (function () {
    function CoreAPIConfigConsts() {
    }
    CoreAPIConfigConsts.DEFAULT_HEADER_NAME = 'Authorization';
    CoreAPIConfigConsts.HEADER_PREFIX_BEARER = 'JWT';
    CoreAPIConfigConsts.DEFAULT_TOKEN_NAME = 'token';
    return CoreAPIConfigConsts;
}());
var ɵ0 = function () {
    return localStorage.getItem(COREAPI_CONFIG_DEFAULTS.tokenName);
};
var COREAPI_CONFIG_DEFAULTS = {
    headerName: CoreAPIConfigConsts.DEFAULT_HEADER_NAME,
    headerPrefix: null,
    tokenName: CoreAPIConfigConsts.DEFAULT_TOKEN_NAME,
    tokenGetter: ɵ0,
    noJwtError: false,
    noClientCheck: false,
    globalHeaders: [],
    noTokenScheme: false,
};
/**
 * Helper class to decode and find JWT expiration.
 */
var JwtHelper = /** @class */ (function () {
    function JwtHelper() {
    }
    JwtHelper.prototype.urlBase64Decode = function (str) {
        var output = str.replace(/-/g, '+').replace(/_/g, '/');
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
    };
    JwtHelper.prototype.decodeToken = function (token) {
        var parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts');
        }
        var decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }
        return JSON.parse(decoded);
    };
    JwtHelper.prototype.getTokenExpirationDate = function (token) {
        var decoded;
        decoded = this.decodeToken(token);
        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }
        var date = new Date(0); // The 0 here is the key, which sets the date to the epoch
        date.setUTCSeconds(decoded.exp);
        return date;
    };
    JwtHelper.prototype.isTokenExpired = function (token, offsetSeconds) {
        var date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date == null) {
            return false;
        }
        // Token expired?
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    };
    // credits for decoder goes to https://github.com/atk
    JwtHelper.prototype.b64decode = function (str) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var output = '';
        str = String(str).replace(/=+$/, '');
        if (str.length % 4 === 1) {
            throw new Error('"atob" failed: The string to be decoded is not correctly encoded.');
        }
        for (
        // initialize result and counters
        var bc = 0, bs = void 0, buffer = void 0, idx = 0; 
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
    };
    // https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
    JwtHelper.prototype.b64DecodeUnicode = function (str) {
        return decodeURIComponent(Array.prototype.map
            .call(this.b64decode(str), function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
            .join(''));
    };
    return JwtHelper;
}());
var injector = Injector.create({ providers: [{ provide: LocalStorageService }] });
var localStorageService = injector.get(LocalStorageService);
/**
 * Checks for presence of token and that token hasn't expired.
 * For use with the @CanActivate router decorator and NgIf
 */
function tokenNotExpired(tokenName, jwt) {
    if (tokenName === void 0) { tokenName = CoreAPIConfigConsts.DEFAULT_TOKEN_NAME; }
    var token = jwt || localStorageService.get(tokenName);
    var jwtHelper = new JwtHelper();
    return token != null && !jwtHelper.isTokenExpired(token);
}
/**
 * Sets up the authentication configuration.
 */
var CoreAPIConfig = /** @class */ (function () {
    function CoreAPIConfig(config) {
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
            this._config.tokenGetter = function () {
                return localStorage.getItem(config.tokenName);
            };
        }
    }
    CoreAPIConfig.prototype.getConfig = function () {
        return this._config;
    };
    return CoreAPIConfig;
}());
var CoreAPIClient = /** @class */ (function () {
    function CoreAPIClient(options, config, globalState) {
        var _this = this;
        this.options = options;
        this.config = config;
        this.globalState = globalState;
        this.fetchingSchema = false;
        this.coreAPIConfig = options.getConfig();
        this.tokenStream = new Observable(function (obs) {
            obs.next(_this.coreAPIConfig.tokenGetter());
        });
        this.globalState.subscribe('user.logout', function (logout) {
            _this._client = null;
            _this.schema = null;
        });
        this.globalState.subscribe('user.tokenRefreshed', function () {
            _this._client = null;
        });
    }
    CoreAPIClient.prototype.get = function (url) {
        return this.client.get(url);
    };
    CoreAPIClient.prototype.sleep = function (ms) {
        return new Promise(function (resolve, reject) { return setTimeout(resolve, ms); });
    };
    CoreAPIClient.prototype.waitSchema = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 600)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.sleep(100)];
                    case 2:
                        _a.sent();
                        if (this.schema) {
                            return [2 /*return*/];
                        }
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CoreAPIClient.prototype.getSchema = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.schema) {
                if (_this.fetchingSchema) {
                    _this.waitSchema()
                        .then(function () {
                        resolve(_this.schema);
                    })
                        .catch(function (error) {
                        console.error("Fetch schema timeout.", error);
                        reject(error);
                    });
                }
                else {
                    var url = _this.config.get('schemaUrl');
                    _this.fetchingSchema = true;
                    _this.get(url)
                        .then(function (data) {
                        _this.schema = data;
                        resolve(_this.schema);
                        _this.fetchingSchema = false;
                    })
                        .catch(function (error) {
                        console.error("Fetch schema failed.", error);
                        reject(error);
                        _this.fetchingSchema = false;
                    });
                }
            }
            else {
                resolve(_this.schema);
            }
        });
    };
    CoreAPIClient.prototype.action = function (keys, params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        this.globalState.publish('http.loading', true);
        return new Promise(function (resolve, reject) {
            _this.getSchema()
                .then(function (doc) {
                _this.client
                    .action(doc, keys, params.Params, params.ExtraParams)
                    .then(function (data) {
                    _this.globalState.publish('http.loading', false);
                    resolve(data);
                })
                    .catch(function (error) {
                    console.error(error);
                    var message = '';
                    if (Object.prototype.toString.call(error.content) === '[object Object]') { // Whether it is an Objec object
                        message = error.content.detail;
                    }
                    else {
                        message = error.content;
                    }
                    if (error.response.status === 401) {
                        _this.globalState.publish('http.401', message);
                    }
                    else if (error.response.status === 403) {
                        _this.globalState.publish('http.403', message, true);
                    }
                    else if (error.response.status === 500) {
                        _this.globalState.publish('http.500', message, true);
                    }
                    else if (error.response.status === 501) {
                        _this.globalState.publish('http.501', message, true);
                    }
                    _this.globalState.publish('http.loading', false);
                    reject(error);
                });
            })
                .catch(function (error) {
                console.error("Request " + keys + " failed.", error);
                _this.globalState.publish('http.loading', false);
                reject(error);
            });
        });
    };
    Object.defineProperty(CoreAPIClient.prototype, "client", {
        get: function () {
            if (!this._client) {
                var options = {
                    auth: new auth.TokenAuthentication({
                        token: this.coreAPIConfig.tokenGetter(),
                        scheme: this.coreAPIConfig.headerPrefix,
                    }),
                };
                this._client = new Client(options);
            }
            return this._client;
        },
        enumerable: true,
        configurable: true
    });
    CoreAPIClient.ctorParameters = function () { return [
        { type: CoreAPIConfig },
        { type: ConfigService },
        { type: GlobalState }
    ]; };
    CoreAPIClient = __decorate([
        Injectable()
    ], CoreAPIClient);
    return CoreAPIClient;
}());
function coreAPIFactory(config, globalState) {
    var coreAPIConfig = {
        headerName: CoreAPIConfigConsts.DEFAULT_HEADER_NAME,
        headerPrefix: CoreAPIConfigConsts.HEADER_PREFIX_BEARER,
        tokenName: CoreAPIConfigConsts.DEFAULT_TOKEN_NAME,
        tokenGetter: function () {
            return localStorageService.get(coreAPIConfig.tokenName);
        },
        globalHeaders: [{ 'Content-Type': 'application/json' }],
        noJwtError: false,
        noTokenScheme: false,
    };
    return new CoreAPIClient(new CoreAPIConfig(coreAPIConfig), config, globalState);
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
    if (val === null || val === undefined) {
        throw new TypeError('Object.assign cannot be called with null or undefined');
    }
    return Object(val);
}
function objectAssign(target) {
    var source = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        source[_i - 1] = arguments[_i];
    }
    var from;
    var symbols;
    var to = toObject(target);
    for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
                to[key] = from[key];
            }
        }
        if (Object.getOwnPropertySymbols) {
            symbols = Object.getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
                if (propIsEnumerable.call(from, symbols[i])) {
                    to[symbols[i]] = from[symbols[i]];
                }
            }
        }
    }
    return to;
}
var CoreAPIClientHttpError = /** @class */ (function (_super) {
    __extends(CoreAPIClientHttpError, _super);
    function CoreAPIClientHttpError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CoreAPIClientHttpError;
}(Error));

var ɵ0$1 = coreAPIFactory;
var CoreAPIProxyModule = /** @class */ (function () {
    function CoreAPIProxyModule() {
    }
    CoreAPIProxyModule = __decorate([
        NgModule({
            declarations: [],
            imports: [],
            providers: [
                ConfigService,
                GlobalState,
                CoreAPIBaseService,
                {
                    provide: CoreAPIClient,
                    useFactory: ɵ0$1,
                    deps: [ConfigService, GlobalState],
                }
            ],
            exports: []
        })
    ], CoreAPIProxyModule);
    return CoreAPIProxyModule;
}());

/*
 * Public API Surface of coreapi-proxy
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ConfigService, CoreAPIBaseService, CoreAPIProxyModule, GlobalState, tokenNotExpired, ɵ0$1 as ɵ0, CoreAPIConfig as ɵa, CoreAPIClient as ɵb, coreAPIFactory as ɵc };
//# sourceMappingURL=ngx-coreapi-proxy.js.map
