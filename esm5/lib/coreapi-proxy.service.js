import { __awaiter, __decorate, __extends, __generator } from "tslib";
import { Injectable, Injector } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Promise } from 'bluebird';
import * as coreapi from 'coreapi';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from "./config.service";
import { GlobalState } from './global.state';
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
export { CoreAPIBaseService };
var CoreAPIConfigConsts = /** @class */ (function () {
    function CoreAPIConfigConsts() {
    }
    CoreAPIConfigConsts.DEFAULT_HEADER_NAME = 'Authorization';
    CoreAPIConfigConsts.HEADER_PREFIX_BEARER = 'JWT';
    CoreAPIConfigConsts.DEFAULT_TOKEN_NAME = 'token';
    return CoreAPIConfigConsts;
}());
export { CoreAPIConfigConsts };
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
export { JwtHelper };
var injector = Injector.create({ providers: [{ provide: LocalStorageService }] });
var localStorageService = injector.get(LocalStorageService);
/**
 * Checks for presence of token and that token hasn't expired.
 * For use with the @CanActivate router decorator and NgIf
 */
export function tokenNotExpired(tokenName, jwt) {
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
export { CoreAPIConfig };
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
        this.globalState.notifyDataChanged('http.loading', true);
        return new Promise(function (resolve, reject) {
            _this.getSchema()
                .then(function (doc) {
                _this.client
                    .action(doc, keys, params.Params, params.ExtraParams)
                    .then(function (data) {
                    _this.globalState.notifyDataChanged('http.loading', false);
                    resolve(data);
                })
                    .catch(function (error) {
                    var message = '';
                    if (Object.prototype.toString.call(error.content) === '[object Object]') { // Whether it is an Objec object
                        message = error.content.detail;
                    }
                    else {
                        message = error.content;
                    }
                    if (error.response.status === 401) {
                        _this.globalState.notifyDataChanged('http.401', message);
                    }
                    else if (error.response.status === 403) {
                        _this.globalState.notifyDataChanged('http.403', message, true);
                    }
                    else if (error.response.status === 500) {
                        _this.globalState.notifyDataChanged('http.500', message, true);
                    }
                    else if (error.response.status === 501) {
                        _this.globalState.notifyDataChanged('http.501', message, true);
                    }
                    _this.globalState.notifyDataChanged('http.loading', false);
                    reject(error);
                });
            })
                .catch(function (error) {
                console.error("Request " + keys + " failed.", error);
                _this.globalState.notifyDataChanged('http.loading', false);
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
        Injectable()
    ], CoreAPIClient);
    return CoreAPIClient;
}());
export { CoreAPIClient };
export function coreAPIFactory(config, globalState) {
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
export { CoreAPIClientHttpError };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZWFwaS1wcm94eS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY29yZWFwaS1wcm94eS8iLCJzb3VyY2VzIjpbImxpYi9jb3JlYXBpLXByb3h5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbkMsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRN0M7SUFDRSw0QkFBb0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUN6QyxDQUFDO0lBRUQsbUNBQU0sR0FBTixVQUFPLElBQW1CLEVBQUUsTUFBVyxFQUFFLFdBQWdCO1FBQTdCLHVCQUFBLEVBQUEsV0FBVztRQUFFLDRCQUFBLEVBQUEsZ0JBQWdCO1FBQ3ZELElBQU0sWUFBWSxHQUFpQixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxDQUFDO1FBQ2hGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ2hELENBQUM7O2dCQU4yQixhQUFhOztJQUQ5QixrQkFBa0I7UUFEOUIsVUFBVSxFQUFFO09BQ0Esa0JBQWtCLENBUTlCO0lBQUQseUJBQUM7Q0FBQSxBQVJELElBUUM7U0FSWSxrQkFBa0I7QUFnQy9CO0lBQUE7SUFJQSxDQUFDO0lBSGUsdUNBQW1CLEdBQUcsZUFBZSxDQUFD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RUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbkM7YUFDRjtTQUNGO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFFRDtJQUE0QywwQ0FBSztJQUFqRDs7SUFDQSxDQUFDO0lBQUQsNkJBQUM7QUFBRCxDQUFDLEFBREQsQ0FBNEMsS0FBSyxHQUNoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnYW5ndWxhci13ZWItc3RvcmFnZSc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0ICogYXMgY29yZWFwaSBmcm9tICdjb3JlYXBpJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSBcIi4vY29uZmlnLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdsb2JhbFN0YXRlIH0gZnJvbSAnLi9nbG9iYWwuc3RhdGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvblBhcmFtcyB7XG4gIFBhcmFtcz86IG9iamVjdCxcbiAgRXh0cmFQYXJhbXM/OiBvYmplY3Rcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvcmVBUElCYXNlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50OiBDb3JlQVBJQ2xpZW50KSB7XG4gIH1cblxuICBhY3Rpb24oa2V5czogQXJyYXk8c3RyaW5nPiwgcGFyYW1zID0ge30sIGV4dHJhUGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBhY3Rpb25QYXJhbXM6IEFjdGlvblBhcmFtcyA9IHsgUGFyYW1zOiBwYXJhbXMsIEV4dHJhUGFyYW1zOiBleHRyYVBhcmFtcyB9O1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5hY3Rpb24oa2V5cywgYWN0aW9uUGFyYW1zKTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb3JlQVBJQ29uZmlnIHtcbiAgZ2xvYmFsSGVhZGVyczogQXJyYXk8T2JqZWN0PjtcbiAgaGVhZGVyTmFtZTogc3RyaW5nO1xuICBoZWFkZXJQcmVmaXg6IHN0cmluZztcbiAgbm9Kd3RFcnJvcjogYm9vbGVhbjtcbiAgbm9DbGllbnRDaGVjazogYm9vbGVhbjtcbiAgbm9Ub2tlblNjaGVtZT86IGJvb2xlYW47XG4gIHRva2VuR2V0dGVyOiAoKSA9PiBzdHJpbmcgfCBQcm9taXNlPHN0cmluZz47XG4gIHRva2VuTmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb3JlQVBJQ29uZmlnT3B0aW9uYWwge1xuICBoZWFkZXJOYW1lPzogc3RyaW5nO1xuICBoZWFkZXJQcmVmaXg/OiBzdHJpbmc7XG4gIHRva2VuTmFtZT86IHN0cmluZztcbiAgdG9rZW5HZXR0ZXI/OiAoKSA9PiBzdHJpbmcgfCBQcm9taXNlPHN0cmluZz47XG4gIG5vSnd0RXJyb3I/OiBib29sZWFuO1xuICBub0NsaWVudENoZWNrPzogYm9vbGVhbjtcbiAgZ2xvYmFsSGVhZGVycz86IEFycmF5PE9iamVjdD47XG4gIG5vVG9rZW5TY2hlbWU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgQ29yZUFQSUNvbmZpZ0NvbnN0cyB7XG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9IRUFERVJfTkFNRSA9ICdBdXRob3JpemF0aW9uJztcbiAgcHVibGljIHN0YXRpYyBIRUFERVJfUFJFRklYX0JFQVJFUiA9ICdKV1QnO1xuICBwdWJsaWMgc3RhdGljIERFRkFVTFRfVE9LRU5fTkFNRSA9ICd0b2tlbic7XG59XG5cbmNvbnN0IENPUkVBUElfQ09ORklHX0RFRkFVTFRTOiBJQ29yZUFQSUNvbmZpZyA9IHtcbiAgaGVhZGVyTmFtZTogQ29yZUFQSUNvbmZpZ0NvbnN0cy5ERUZBVUxUX0hFQURFUl9OQU1FLFxuICBoZWFkZXJQcmVmaXg6IG51bGwsXG4gIHRva2VuTmFtZTogQ29yZUFQSUNvbmZpZ0NvbnN0cy5ERUZBVUxUX1RPS0VOX05BTUUsXG4gIHRva2VuR2V0dGVyOiAoKSA9PlxuICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKENPUkVBUElfQ09ORklHX0RFRkFVTFRTLnRva2VuTmFtZSkgYXMgc3RyaW5nLFxuICBub0p3dEVycm9yOiBmYWxzZSxcbiAgbm9DbGllbnRDaGVjazogZmFsc2UsXG4gIGdsb2JhbEhlYWRlcnM6IFtdLFxuICBub1Rva2VuU2NoZW1lOiBmYWxzZSxcbn07XG5cbi8qKlxuICogSGVscGVyIGNsYXNzIHRvIGRlY29kZSBhbmQgZmluZCBKV1QgZXhwaXJhdGlvbi5cbiAqL1xuXG5leHBvcnQgY2xhc3MgSnd0SGVscGVyIHtcbiAgcHVibGljIHVybEJhc2U2NERlY29kZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IG91dHB1dCA9IHN0ci5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpO1xuICAgIHN3aXRjaCAob3V0cHV0Lmxlbmd0aCAlIDQpIHtcbiAgICAgIGNhc2UgMDoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgMjoge1xuICAgICAgICBvdXRwdXQgKz0gJz09JztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIDM6IHtcbiAgICAgICAgb3V0cHV0ICs9ICc9JztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBiYXNlNjR1cmwgc3RyaW5nIScpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5iNjREZWNvZGVVbmljb2RlKG91dHB1dCk7XG4gIH1cblxuICBwdWJsaWMgZGVjb2RlVG9rZW4odG9rZW46IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3QgcGFydHMgPSB0b2tlbi5zcGxpdCgnLicpO1xuXG4gICAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdKV1QgbXVzdCBoYXZlIDMgcGFydHMnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWNvZGVkID0gdGhpcy51cmxCYXNlNjREZWNvZGUocGFydHNbMV0pO1xuICAgIGlmICghZGVjb2RlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZGVjb2RlIHRoZSB0b2tlbicpO1xuICAgIH1cblxuICAgIHJldHVybiBKU09OLnBhcnNlKGRlY29kZWQpO1xuICB9XG5cbiAgcHVibGljIGdldFRva2VuRXhwaXJhdGlvbkRhdGUodG9rZW46IHN0cmluZyk6IERhdGUge1xuICAgIGxldCBkZWNvZGVkOiBhbnk7XG4gICAgZGVjb2RlZCA9IHRoaXMuZGVjb2RlVG9rZW4odG9rZW4pO1xuXG4gICAgaWYgKCFkZWNvZGVkLmhhc093blByb3BlcnR5KCdleHAnKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKDApOyAvLyBUaGUgMCBoZXJlIGlzIHRoZSBrZXksIHdoaWNoIHNldHMgdGhlIGRhdGUgdG8gdGhlIGVwb2NoXG4gICAgZGF0ZS5zZXRVVENTZWNvbmRzKGRlY29kZWQuZXhwKTtcblxuICAgIHJldHVybiBkYXRlO1xuICB9XG5cbiAgcHVibGljIGlzVG9rZW5FeHBpcmVkKHRva2VuOiBzdHJpbmcsIG9mZnNldFNlY29uZHM/OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRlID0gdGhpcy5nZXRUb2tlbkV4cGlyYXRpb25EYXRlKHRva2VuKTtcbiAgICBvZmZzZXRTZWNvbmRzID0gb2Zmc2V0U2Vjb25kcyB8fCAwO1xuXG4gICAgaWYgKGRhdGUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFRva2VuIGV4cGlyZWQ/XG4gICAgcmV0dXJuICEoZGF0ZS52YWx1ZU9mKCkgPiBuZXcgRGF0ZSgpLnZhbHVlT2YoKSArIG9mZnNldFNlY29uZHMgKiAxMDAwKTtcbiAgfVxuXG4gIC8vIGNyZWRpdHMgZm9yIGRlY29kZXIgZ29lcyB0byBodHRwczovL2dpdGh1Yi5jb20vYXRrXG4gIHByaXZhdGUgYjY0ZGVjb2RlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBjaGFycyA9XG4gICAgICAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuICAgIGxldCBvdXRwdXQgPSAnJztcblxuICAgIHN0ciA9IFN0cmluZyhzdHIpLnJlcGxhY2UoLz0rJC8sICcnKTtcblxuICAgIGlmIChzdHIubGVuZ3RoICUgNCA9PT0gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnXCJhdG9iXCIgZmFpbGVkOiBUaGUgc3RyaW5nIHRvIGJlIGRlY29kZWQgaXMgbm90IGNvcnJlY3RseSBlbmNvZGVkLicsXG4gICAgICApO1xuICAgIH1cblxuICAgIGZvciAoXG4gICAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlcnNcbiAgICAgIGxldCBiYyA9IDAsIGJzOiBhbnksIGJ1ZmZlcjogYW55LCBpZHggPSAwO1xuICAgICAgLy8gZ2V0IG5leHQgY2hhcmFjdGVyXG4gICAgICAoYnVmZmVyID0gc3RyLmNoYXJBdChpZHgrKykpO1xuICAgICAgLy8gY2hhcmFjdGVyIGZvdW5kIGluIHRhYmxlPyBpbml0aWFsaXplIGJpdCBzdG9yYWdlIGFuZCBhZGQgaXRzIGFzY2lpIHZhbHVlO1xuICAgICAgfmJ1ZmZlciAmJlxuICAgICAgKChicyA9IGJjICUgNCA/IGJzICogNjQgKyBidWZmZXIgOiBidWZmZXIpLFxuICAgICAgICAvLyBhbmQgaWYgbm90IGZpcnN0IG9mIGVhY2ggNCBjaGFyYWN0ZXJzLFxuICAgICAgICAvLyBjb252ZXJ0IHRoZSBmaXJzdCA4IGJpdHMgdG8gb25lIGFzY2lpIGNoYXJhY3RlclxuICAgICAgYmMrKyAlIDQpXG4gICAgICAgID8gKG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDI1NSAmIChicyA+PiAoKC0yICogYmMpICYgNikpKSlcbiAgICAgICAgOiAwXG4gICAgKSB7XG4gICAgICAvLyB0cnkgdG8gZmluZCBjaGFyYWN0ZXIgaW4gdGFibGUgKDAtNjMsIG5vdCBmb3VuZCA9PiAtMSlcbiAgICAgIGJ1ZmZlciA9IGNoYXJzLmluZGV4T2YoYnVmZmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0FQSS9XaW5kb3dCYXNlNjQvQmFzZTY0X2VuY29kaW5nX2FuZF9kZWNvZGluZyNUaGVfVW5pY29kZV9Qcm9ibGVtXG4gIHByaXZhdGUgYjY0RGVjb2RlVW5pY29kZShzdHI6IGFueSkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoXG4gICAgICBBcnJheS5wcm90b3R5cGUubWFwXG4gICAgICAgIC5jYWxsKHRoaXMuYjY0ZGVjb2RlKHN0ciksIChjOiBhbnkpID0+IHtcbiAgICAgICAgICByZXR1cm4gJyUnICsgKCcwMCcgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMik7XG4gICAgICAgIH0pXG4gICAgICAgIC5qb2luKCcnKSxcbiAgICApO1xuICB9XG59XG5cbmNvbnN0IGluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHsgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH1dIH0pO1xuY29uc3QgbG9jYWxTdG9yYWdlU2VydmljZSA9IGluamVjdG9yLmdldChMb2NhbFN0b3JhZ2VTZXJ2aWNlKTtcblxuLyoqXG4gKiBDaGVja3MgZm9yIHByZXNlbmNlIG9mIHRva2VuIGFuZCB0aGF0IHRva2VuIGhhc24ndCBleHBpcmVkLlxuICogRm9yIHVzZSB3aXRoIHRoZSBAQ2FuQWN0aXZhdGUgcm91dGVyIGRlY29yYXRvciBhbmQgTmdJZlxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9rZW5Ob3RFeHBpcmVkKFxuICB0b2tlbk5hbWUgPSBDb3JlQVBJQ29uZmlnQ29uc3RzLkRFRkFVTFRfVE9LRU5fTkFNRSxcbiAgand0Pzogc3RyaW5nLFxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IHRva2VuOiBzdHJpbmcgPSBqd3QgfHwgbG9jYWxTdG9yYWdlU2VydmljZS5nZXQodG9rZW5OYW1lKTtcbiAgY29uc3Qgand0SGVscGVyID0gbmV3IEp3dEhlbHBlcigpO1xuICByZXR1cm4gdG9rZW4gIT0gbnVsbCAmJiAhand0SGVscGVyLmlzVG9rZW5FeHBpcmVkKHRva2VuKTtcbn1cblxuLyoqXG4gKiBTZXRzIHVwIHRoZSBhdXRoZW50aWNhdGlvbiBjb25maWd1cmF0aW9uLlxuICovXG5cbmV4cG9ydCBjbGFzcyBDb3JlQVBJQ29uZmlnIHtcbiAgX2NvbmZpZzogSUNvcmVBUElDb25maWc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnPzogSUNvcmVBUElDb25maWdPcHRpb25hbCkge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICB0aGlzLl9jb25maWcgPSBvYmplY3RBc3NpZ24oe30sIENPUkVBUElfQ09ORklHX0RFRkFVTFRTLCBjb25maWcpO1xuICAgIGlmICh0aGlzLl9jb25maWcuaGVhZGVyUHJlZml4KSB7XG4gICAgICB0aGlzLl9jb25maWcuaGVhZGVyUHJlZml4ICs9ICcgJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2NvbmZpZy5ub1Rva2VuU2NoZW1lKSB7XG4gICAgICB0aGlzLl9jb25maWcuaGVhZGVyUHJlZml4ID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NvbmZpZy5oZWFkZXJQcmVmaXggPSBDb3JlQVBJQ29uZmlnQ29uc3RzLkhFQURFUl9QUkVGSVhfQkVBUkVSO1xuICAgIH1cblxuICAgIGlmIChjb25maWcudG9rZW5OYW1lICYmICFjb25maWcudG9rZW5HZXR0ZXIpIHtcbiAgICAgIHRoaXMuX2NvbmZpZy50b2tlbkdldHRlciA9ICgpID0+XG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGNvbmZpZy50b2tlbk5hbWUpIGFzIHN0cmluZztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29uZmlnKCk6IElDb3JlQVBJQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb3JlQVBJQ2xpZW50IHtcbiAgcHVibGljIHRva2VuU3RyZWFtOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgcHJpdmF0ZSBjb3JlQVBJQ29uZmlnOiBJQ29yZUFQSUNvbmZpZztcbiAgcHJpdmF0ZSBfY2xpZW50OiBhbnk7XG4gIHByaXZhdGUgc2NoZW1hO1xuICBwcml2YXRlIGZldGNoaW5nU2NoZW1hID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBvcHRpb25zOiBDb3JlQVBJQ29uZmlnLFxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgZ2xvYmFsU3RhdGU6IEdsb2JhbFN0YXRlLFxuICApIHtcbiAgICB0aGlzLmNvcmVBUElDb25maWcgPSBvcHRpb25zLmdldENvbmZpZygpO1xuXG4gICAgdGhpcy50b2tlblN0cmVhbSA9IG5ldyBPYnNlcnZhYmxlPHN0cmluZz4oKG9iczogYW55KSA9PiB7XG4gICAgICBvYnMubmV4dCh0aGlzLmNvcmVBUElDb25maWcudG9rZW5HZXR0ZXIoKSk7XG4gICAgfSk7XG4gICAgdGhpcy5nbG9iYWxTdGF0ZS5zdWJzY3JpYmUoJ3VzZXIubG9nb3V0JywgbG9nb3V0ID0+IHtcbiAgICAgIHRoaXMuX2NsaWVudCA9IG51bGw7XG4gICAgICB0aGlzLnNjaGVtYSA9IG51bGw7XG4gICAgfSk7XG4gICAgdGhpcy5nbG9iYWxTdGF0ZS5zdWJzY3JpYmUoJ3VzZXIudG9rZW5SZWZyZXNoZWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLl9jbGllbnQgPSBudWxsO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0KHVybDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmdldCh1cmwpO1xuICB9XG5cbiAgc2xlZXAobXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuICB9XG5cbiAgYXN5bmMgd2FpdFNjaGVtYSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDYwMDsgaSsrKSB7XG4gICAgICBhd2FpdCB0aGlzLnNsZWVwKDEwMCk7XG4gICAgICBpZiAodGhpcy5zY2hlbWEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFNjaGVtYSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnNjaGVtYSkge1xuICAgICAgICBpZiAodGhpcy5mZXRjaGluZ1NjaGVtYSkge1xuICAgICAgICAgIHRoaXMud2FpdFNjaGVtYSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUodGhpcy5zY2hlbWEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEZldGNoIHNjaGVtYSB0aW1lb3V0LmAsIGVycm9yKTtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY29uZmlnLmdldCgnc2NoZW1hVXJsJyk7XG4gICAgICAgICAgdGhpcy5mZXRjaGluZ1NjaGVtYSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5nZXQodXJsKVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc2NoZW1hID0gZGF0YTtcbiAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnNjaGVtYSk7XG4gICAgICAgICAgICAgIHRoaXMuZmV0Y2hpbmdTY2hlbWEgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGZXRjaCBzY2hlbWEgZmFpbGVkLmAsIGVycm9yKTtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgdGhpcy5mZXRjaGluZ1NjaGVtYSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUodGhpcy5zY2hlbWEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWN0aW9uKFxuICAgIGtleXM6IEFycmF5PHN0cmluZz4sXG4gICAgcGFyYW1zOiBBY3Rpb25QYXJhbXMgPSB7fSxcbiAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0aGlzLmdsb2JhbFN0YXRlLm5vdGlmeURhdGFDaGFuZ2VkKCdodHRwLmxvYWRpbmcnLCB0cnVlKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmdldFNjaGVtYSgpXG4gICAgICAgIC50aGVuKGRvYyA9PiB7XG4gICAgICAgICAgdGhpcy5jbGllbnRcbiAgICAgICAgICAgIC5hY3Rpb24oZG9jLCBrZXlzLCBwYXJhbXMuUGFyYW1zLCBwYXJhbXMuRXh0cmFQYXJhbXMpXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5nbG9iYWxTdGF0ZS5ub3RpZnlEYXRhQ2hhbmdlZCgnaHR0cC5sb2FkaW5nJywgZmFsc2UpO1xuICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJyc7XG4gICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZXJyb3IuY29udGVudCkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7ICAvLyBXaGV0aGVyIGl0IGlzIGFuIE9iamVjIG9iamVjdFxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5jb250ZW50LmRldGFpbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IuY29udGVudDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsU3RhdGUubm90aWZ5RGF0YUNoYW5nZWQoJ2h0dHAuNDAxJywgbWVzc2FnZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbFN0YXRlLm5vdGlmeURhdGFDaGFuZ2VkKCdodHRwLjQwMycsIG1lc3NhZ2UsIHRydWUpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PT0gNTAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxTdGF0ZS5ub3RpZnlEYXRhQ2hhbmdlZCgnaHR0cC41MDAnLCBtZXNzYWdlLCB0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDUwMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsU3RhdGUubm90aWZ5RGF0YUNoYW5nZWQoJ2h0dHAuNTAxJywgbWVzc2FnZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLmdsb2JhbFN0YXRlLm5vdGlmeURhdGFDaGFuZ2VkKCdodHRwLmxvYWRpbmcnLCBmYWxzZSk7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBSZXF1ZXN0ICR7a2V5c30gZmFpbGVkLmAsIGVycm9yKTtcblxuICAgICAgICAgIHRoaXMuZ2xvYmFsU3RhdGUubm90aWZ5RGF0YUNoYW5nZWQoJ2h0dHAubG9hZGluZycsIGZhbHNlKTtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNsaWVudCgpIHtcbiAgICBpZiAoIXRoaXMuX2NsaWVudCkge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgYXV0aDogbmV3IGNvcmVhcGkuYXV0aC5Ub2tlbkF1dGhlbnRpY2F0aW9uKHtcbiAgICAgICAgICB0b2tlbjogdGhpcy5jb3JlQVBJQ29uZmlnLnRva2VuR2V0dGVyKCksXG4gICAgICAgICAgc2NoZW1lOiB0aGlzLmNvcmVBUElDb25maWcuaGVhZGVyUHJlZml4LFxuICAgICAgICB9KSxcbiAgICAgIH07XG4gICAgICB0aGlzLl9jbGllbnQgPSBuZXcgY29yZWFwaS5DbGllbnQob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29yZUFQSUZhY3RvcnkoXG4gIGNvbmZpZzogQ29uZmlnU2VydmljZSxcbiAgZ2xvYmFsU3RhdGU6IEdsb2JhbFN0YXRlLFxuKSB7XG4gIGNvbnN0IGNvcmVBUElDb25maWcgPSB7XG4gICAgaGVhZGVyTmFtZTogQ29yZUFQSUNvbmZpZ0NvbnN0cy5ERUZBVUxUX0hFQURFUl9OQU1FLFxuICAgIGhlYWRlclByZWZpeDogQ29yZUFQSUNvbmZpZ0NvbnN0cy5IRUFERVJfUFJFRklYX0JFQVJFUixcbiAgICB0b2tlbk5hbWU6IENvcmVBUElDb25maWdDb25zdHMuREVGQVVMVF9UT0tFTl9OQU1FLFxuICAgIHRva2VuR2V0dGVyKCkge1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KGNvcmVBUElDb25maWcudG9rZW5OYW1lKTtcbiAgICB9LFxuICAgIGdsb2JhbEhlYWRlcnM6IFt7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfV0sXG4gICAgbm9Kd3RFcnJvcjogZmFsc2UsXG4gICAgbm9Ub2tlblNjaGVtZTogZmFsc2UsXG4gIH07XG4gIHJldHVybiBuZXcgQ29yZUFQSUNsaWVudChcbiAgICBuZXcgQ29yZUFQSUNvbmZpZyhjb3JlQVBJQ29uZmlnKSxcbiAgICBjb25maWcsXG4gICAgZ2xvYmFsU3RhdGUsXG4gICk7XG59XG5cbmNvbnN0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbmNvbnN0IHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWw6IGFueSkge1xuICBpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcsXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gb2JqZWN0QXNzaWduKHRhcmdldDogYW55LCAuLi5zb3VyY2U6IGFueVtdKSB7XG4gIGxldCBmcm9tOiBhbnk7XG4gIGxldCBzeW1ib2xzOiBhbnk7XG4gIGNvbnN0IHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblxuICBmb3IgKGxldCBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuICAgIGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGZyb20pIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcbiAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoKDxhbnk+T2JqZWN0KS5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgIHN5bWJvbHMgPSAoPGFueT5PYmplY3QpLmdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG4gICAgICAgICAgdG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0bztcbn1cblxuZXhwb3J0IGNsYXNzIENvcmVBUElDbGllbnRIdHRwRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG59XG4iXX0=