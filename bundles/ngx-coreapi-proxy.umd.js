(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angular-web-storage'), require('bluebird'), require('coreapi'), require('rxjs'), require('rxjs/Subject')) :
    typeof define === 'function' && define.amd ? define('ngx-coreapi-proxy', ['exports', '@angular/core', 'angular-web-storage', 'bluebird', 'coreapi', 'rxjs', 'rxjs/Subject'], factory) :
    (global = global || self, factory(global['ngx-coreapi-proxy'] = {}, global.ng.core, global.angularWebStorage, global.bluebird, global.coreapi, global.rxjs, global.rxjs.Subject));
}(this, (function (exports, core, angularWebStorage, bluebird, coreapi, rxjs, Subject) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

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
            core.Injectable()
        ], ConfigService);
        return ConfigService;
    }());

    var GlobalState = /** @class */ (function () {
        function GlobalState() {
            var _this = this;
            this.data = new Subject.Subject();
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
            core.Injectable()
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
            core.Injectable()
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
    var injector = core.Injector.create({ providers: [{ provide: angularWebStorage.LocalStorageService }] });
    var localStorageService = injector.get(angularWebStorage.LocalStorageService);
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
            this.tokenStream = new rxjs.Observable(function (obs) {
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
            return new bluebird.Promise(function (resolve, reject) { return setTimeout(resolve, ms); });
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
            return new bluebird.Promise(function (resolve, reject) {
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
            return new bluebird.Promise(function (resolve, reject) {
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
                        auth: new coreapi.auth.TokenAuthentication({
                            token: this.coreAPIConfig.tokenGetter(),
                            scheme: this.coreAPIConfig.headerPrefix,
                        }),
                    };
                    this._client = new coreapi.Client(options);
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
            core.Injectable()
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
            core.NgModule({
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

    exports.ConfigService = ConfigService;
    exports.CoreAPIBaseService = CoreAPIBaseService;
    exports.CoreAPIProxyModule = CoreAPIProxyModule;
    exports.GlobalState = GlobalState;
    exports.tokenNotExpired = tokenNotExpired;
    exports.ɵ0 = ɵ0$1;
    exports.ɵa = CoreAPIConfig;
    exports.ɵb = CoreAPIClient;
    exports.ɵc = coreAPIFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-coreapi-proxy.umd.js.map
