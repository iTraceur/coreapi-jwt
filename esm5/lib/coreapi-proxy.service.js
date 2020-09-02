import { __awaiter, __decorate, __extends, __generator } from "tslib";
import { Injectable, Injector } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Promise } from 'bluebird';
import * as coreapi from 'coreapi';
import { Observable } from 'rxjs';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZWFwaS1wcm94eS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWNvcmVhcGktcHJveHkvIiwic291cmNlcyI6WyJsaWIvY29yZWFwaS1wcm94eS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ25DLE9BQU8sS0FBSyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQ25DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVE3QztJQUNFLDRCQUFvQixNQUFxQjtRQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlO0lBQ3pDLENBQUM7SUFFRCxtQ0FBTSxHQUFOLFVBQU8sSUFBbUIsRUFBRSxNQUFXLEVBQUUsV0FBZ0I7UUFBN0IsdUJBQUEsRUFBQSxXQUFXO1FBQUUsNEJBQUEsRUFBQSxnQkFBZ0I7UUFDdkQsSUFBTSxZQUFZLEdBQWlCLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLENBQUM7UUFDaEYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Z0JBTjJCLGFBQWE7O0lBRDlCLGtCQUFrQjtRQUQ5QixVQUFVLEVBQUU7T0FDQSxrQkFBa0IsQ0FROUI7SUFBRCx5QkFBQztDQUFBLEFBUkQsSUFRQztTQVJZLGtCQUFrQjtBQWdDL0I7SUFBQTtJQUlBLENBQUM7SUFIZSx1Q0FBbUIsR0FBRyxlQUFlLENB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LENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQzNDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ25DO2FBQ0Y7U0FDRjtLQUNGO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDO0FBRUQ7SUFBNEMsMENBQUs7SUFBakQ7O0lBQ0EsQ0FBQztJQUFELDZCQUFDO0FBQUQsQ0FBQyxBQURELENBQTRDLEtBQUssR0FDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlU2VydmljZSB9IGZyb20gJ2FuZ3VsYXItd2ViLXN0b3JhZ2UnO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCAqIGFzIGNvcmVhcGkgZnJvbSAnY29yZWFwaSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tIFwiLi9jb25maWcuc2VydmljZVwiO1xuaW1wb3J0IHsgR2xvYmFsU3RhdGUgfSBmcm9tICcuL2dsb2JhbC5zdGF0ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uUGFyYW1zIHtcbiAgUGFyYW1zPzogb2JqZWN0LFxuICBFeHRyYVBhcmFtcz86IG9iamVjdFxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29yZUFQSUJhc2VTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGllbnQ6IENvcmVBUElDbGllbnQpIHtcbiAgfVxuXG4gIGFjdGlvbihrZXlzOiBBcnJheTxzdHJpbmc+LCBwYXJhbXMgPSB7fSwgZXh0cmFQYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGFjdGlvblBhcmFtczogQWN0aW9uUGFyYW1zID0geyBQYXJhbXM6IHBhcmFtcywgRXh0cmFQYXJhbXM6IGV4dHJhUGFyYW1zIH07XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmFjdGlvbihrZXlzLCBhY3Rpb25QYXJhbXMpO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvcmVBUElDb25maWcge1xuICBnbG9iYWxIZWFkZXJzOiBBcnJheTxPYmplY3Q+O1xuICBoZWFkZXJOYW1lOiBzdHJpbmc7XG4gIGhlYWRlclByZWZpeDogc3RyaW5nO1xuICBub0p3dEVycm9yOiBib29sZWFuO1xuICBub0NsaWVudENoZWNrOiBib29sZWFuO1xuICBub1Rva2VuU2NoZW1lPzogYm9vbGVhbjtcbiAgdG9rZW5HZXR0ZXI6ICgpID0+IHN0cmluZyB8IFByb21pc2U8c3RyaW5nPjtcbiAgdG9rZW5OYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvcmVBUElDb25maWdPcHRpb25hbCB7XG4gIGhlYWRlck5hbWU/OiBzdHJpbmc7XG4gIGhlYWRlclByZWZpeD86IHN0cmluZztcbiAgdG9rZW5OYW1lPzogc3RyaW5nO1xuICB0b2tlbkdldHRlcj86ICgpID0+IHN0cmluZyB8IFByb21pc2U8c3RyaW5nPjtcbiAgbm9Kd3RFcnJvcj86IGJvb2xlYW47XG4gIG5vQ2xpZW50Q2hlY2s/OiBib29sZWFuO1xuICBnbG9iYWxIZWFkZXJzPzogQXJyYXk8T2JqZWN0PjtcbiAgbm9Ub2tlblNjaGVtZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBDb3JlQVBJQ29uZmlnQ29uc3RzIHtcbiAgcHVibGljIHN0YXRpYyBERUZBVUxUX0hFQURFUl9OQU1FID0gJ0F1dGhvcml6YXRpb24nO1xuICBwdWJsaWMgc3RhdGljIEhFQURFUl9QUkVGSVhfQkVBUkVSID0gJ0pXVCc7XG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9UT0tFTl9OQU1FID0gJ3Rva2VuJztcbn1cblxuY29uc3QgQ09SRUFQSV9DT05GSUdfREVGQVVMVFM6IElDb3JlQVBJQ29uZmlnID0ge1xuICBoZWFkZXJOYW1lOiBDb3JlQVBJQ29uZmlnQ29uc3RzLkRFRkFVTFRfSEVBREVSX05BTUUsXG4gIGhlYWRlclByZWZpeDogbnVsbCxcbiAgdG9rZW5OYW1lOiBDb3JlQVBJQ29uZmlnQ29uc3RzLkRFRkFVTFRfVE9LRU5fTkFNRSxcbiAgdG9rZW5HZXR0ZXI6ICgpID0+XG4gICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oQ09SRUFQSV9DT05GSUdfREVGQVVMVFMudG9rZW5OYW1lKSBhcyBzdHJpbmcsXG4gIG5vSnd0RXJyb3I6IGZhbHNlLFxuICBub0NsaWVudENoZWNrOiBmYWxzZSxcbiAgZ2xvYmFsSGVhZGVyczogW10sXG4gIG5vVG9rZW5TY2hlbWU6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBIZWxwZXIgY2xhc3MgdG8gZGVjb2RlIGFuZCBmaW5kIEpXVCBleHBpcmF0aW9uLlxuICovXG5cbmV4cG9ydCBjbGFzcyBKd3RIZWxwZXIge1xuICBwdWJsaWMgdXJsQmFzZTY0RGVjb2RlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgb3V0cHV0ID0gc3RyLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJyk7XG4gICAgc3dpdGNoIChvdXRwdXQubGVuZ3RoICUgNCkge1xuICAgICAgY2FzZSAwOiB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAyOiB7XG4gICAgICAgIG91dHB1dCArPSAnPT0nO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgMzoge1xuICAgICAgICBvdXRwdXQgKz0gJz0nO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbGxlZ2FsIGJhc2U2NHVybCBzdHJpbmchJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmI2NERlY29kZVVuaWNvZGUob3V0cHV0KTtcbiAgfVxuXG4gIHB1YmxpYyBkZWNvZGVUb2tlbih0b2tlbjogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBwYXJ0cyA9IHRva2VuLnNwbGl0KCcuJyk7XG5cbiAgICBpZiAocGFydHMubGVuZ3RoICE9PSAzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0pXVCBtdXN0IGhhdmUgMyBwYXJ0cycpO1xuICAgIH1cblxuICAgIGNvbnN0IGRlY29kZWQgPSB0aGlzLnVybEJhc2U2NERlY29kZShwYXJ0c1sxXSk7XG4gICAgaWYgKCFkZWNvZGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBkZWNvZGUgdGhlIHRva2VuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZGVjb2RlZCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0VG9rZW5FeHBpcmF0aW9uRGF0ZSh0b2tlbjogc3RyaW5nKTogRGF0ZSB7XG4gICAgbGV0IGRlY29kZWQ6IGFueTtcbiAgICBkZWNvZGVkID0gdGhpcy5kZWNvZGVUb2tlbih0b2tlbik7XG5cbiAgICBpZiAoIWRlY29kZWQuaGFzT3duUHJvcGVydHkoJ2V4cCcpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCk7IC8vIFRoZSAwIGhlcmUgaXMgdGhlIGtleSwgd2hpY2ggc2V0cyB0aGUgZGF0ZSB0byB0aGUgZXBvY2hcbiAgICBkYXRlLnNldFVUQ1NlY29uZHMoZGVjb2RlZC5leHApO1xuXG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cblxuICBwdWJsaWMgaXNUb2tlbkV4cGlyZWQodG9rZW46IHN0cmluZywgb2Zmc2V0U2Vjb25kcz86IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGUgPSB0aGlzLmdldFRva2VuRXhwaXJhdGlvbkRhdGUodG9rZW4pO1xuICAgIG9mZnNldFNlY29uZHMgPSBvZmZzZXRTZWNvbmRzIHx8IDA7XG5cbiAgICBpZiAoZGF0ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gVG9rZW4gZXhwaXJlZD9cbiAgICByZXR1cm4gIShkYXRlLnZhbHVlT2YoKSA+IG5ldyBEYXRlKCkudmFsdWVPZigpICsgb2Zmc2V0U2Vjb25kcyAqIDEwMDApO1xuICB9XG5cbiAgLy8gY3JlZGl0cyBmb3IgZGVjb2RlciBnb2VzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9hdGtcbiAgcHJpdmF0ZSBiNjRkZWNvZGUoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNoYXJzID1cbiAgICAgICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG4gICAgbGV0IG91dHB1dCA9ICcnO1xuXG4gICAgc3RyID0gU3RyaW5nKHN0cikucmVwbGFjZSgvPSskLywgJycpO1xuXG4gICAgaWYgKHN0ci5sZW5ndGggJSA0ID09PSAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdcImF0b2JcIiBmYWlsZWQ6IFRoZSBzdHJpbmcgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZm9yIChcbiAgICAgIC8vIGluaXRpYWxpemUgcmVzdWx0IGFuZCBjb3VudGVyc1xuICAgICAgbGV0IGJjID0gMCwgYnM6IGFueSwgYnVmZmVyOiBhbnksIGlkeCA9IDA7XG4gICAgICAvLyBnZXQgbmV4dCBjaGFyYWN0ZXJcbiAgICAgIChidWZmZXIgPSBzdHIuY2hhckF0KGlkeCsrKSk7XG4gICAgICAvLyBjaGFyYWN0ZXIgZm91bmQgaW4gdGFibGU/IGluaXRpYWxpemUgYml0IHN0b3JhZ2UgYW5kIGFkZCBpdHMgYXNjaWkgdmFsdWU7XG4gICAgICB+YnVmZmVyICYmXG4gICAgICAoKGJzID0gYmMgJSA0ID8gYnMgKiA2NCArIGJ1ZmZlciA6IGJ1ZmZlciksXG4gICAgICAgIC8vIGFuZCBpZiBub3QgZmlyc3Qgb2YgZWFjaCA0IGNoYXJhY3RlcnMsXG4gICAgICAgIC8vIGNvbnZlcnQgdGhlIGZpcnN0IDggYml0cyB0byBvbmUgYXNjaWkgY2hhcmFjdGVyXG4gICAgICBiYysrICUgNClcbiAgICAgICAgPyAob3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMjU1ICYgKGJzID4+ICgoLTIgKiBiYykgJiA2KSkpKVxuICAgICAgICA6IDBcbiAgICApIHtcbiAgICAgIC8vIHRyeSB0byBmaW5kIGNoYXJhY3RlciBpbiB0YWJsZSAoMC02Mywgbm90IGZvdW5kID0+IC0xKVxuICAgICAgYnVmZmVyID0gY2hhcnMuaW5kZXhPZihidWZmZXIpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG5cbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvQVBJL1dpbmRvd0Jhc2U2NC9CYXNlNjRfZW5jb2RpbmdfYW5kX2RlY29kaW5nI1RoZV9Vbmljb2RlX1Byb2JsZW1cbiAgcHJpdmF0ZSBiNjREZWNvZGVVbmljb2RlKHN0cjogYW55KSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChcbiAgICAgIEFycmF5LnByb3RvdHlwZS5tYXBcbiAgICAgICAgLmNhbGwodGhpcy5iNjRkZWNvZGUoc3RyKSwgKGM6IGFueSkgPT4ge1xuICAgICAgICAgIHJldHVybiAnJScgKyAoJzAwJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmpvaW4oJycpLFxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgaW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoeyBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IExvY2FsU3RvcmFnZVNlcnZpY2UgfV0gfSk7XG5jb25zdCBsb2NhbFN0b3JhZ2VTZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KExvY2FsU3RvcmFnZVNlcnZpY2UpO1xuXG4vKipcbiAqIENoZWNrcyBmb3IgcHJlc2VuY2Ugb2YgdG9rZW4gYW5kIHRoYXQgdG9rZW4gaGFzbid0IGV4cGlyZWQuXG4gKiBGb3IgdXNlIHdpdGggdGhlIEBDYW5BY3RpdmF0ZSByb3V0ZXIgZGVjb3JhdG9yIGFuZCBOZ0lmXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2tlbk5vdEV4cGlyZWQoXG4gIHRva2VuTmFtZSA9IENvcmVBUElDb25maWdDb25zdHMuREVGQVVMVF9UT0tFTl9OQU1FLFxuICBqd3Q/OiBzdHJpbmcsXG4pOiBib29sZWFuIHtcbiAgY29uc3QgdG9rZW46IHN0cmluZyA9IGp3dCB8fCBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCh0b2tlbk5hbWUpO1xuICBjb25zdCBqd3RIZWxwZXIgPSBuZXcgSnd0SGVscGVyKCk7XG4gIHJldHVybiB0b2tlbiAhPSBudWxsICYmICFqd3RIZWxwZXIuaXNUb2tlbkV4cGlyZWQodG9rZW4pO1xufVxuXG4vKipcbiAqIFNldHMgdXAgdGhlIGF1dGhlbnRpY2F0aW9uIGNvbmZpZ3VyYXRpb24uXG4gKi9cblxuZXhwb3J0IGNsYXNzIENvcmVBUElDb25maWcge1xuICBfY29uZmlnOiBJQ29yZUFQSUNvbmZpZztcblxuICBjb25zdHJ1Y3Rvcihjb25maWc/OiBJQ29yZUFQSUNvbmZpZ09wdGlvbmFsKSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgIHRoaXMuX2NvbmZpZyA9IG9iamVjdEFzc2lnbih7fSwgQ09SRUFQSV9DT05GSUdfREVGQVVMVFMsIGNvbmZpZyk7XG4gICAgaWYgKHRoaXMuX2NvbmZpZy5oZWFkZXJQcmVmaXgpIHtcbiAgICAgIHRoaXMuX2NvbmZpZy5oZWFkZXJQcmVmaXggKz0gJyAnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY29uZmlnLm5vVG9rZW5TY2hlbWUpIHtcbiAgICAgIHRoaXMuX2NvbmZpZy5oZWFkZXJQcmVmaXggPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY29uZmlnLmhlYWRlclByZWZpeCA9IENvcmVBUElDb25maWdDb25zdHMuSEVBREVSX1BSRUZJWF9CRUFSRVI7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy50b2tlbk5hbWUgJiYgIWNvbmZpZy50b2tlbkdldHRlcikge1xuICAgICAgdGhpcy5fY29uZmlnLnRva2VuR2V0dGVyID0gKCkgPT5cbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oY29uZmlnLnRva2VuTmFtZSkgYXMgc3RyaW5nO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25maWcoKTogSUNvcmVBUElDb25maWcge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvcmVBUElDbGllbnQge1xuICBwdWJsaWMgdG9rZW5TdHJlYW06IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICBwcml2YXRlIGNvcmVBUElDb25maWc6IElDb3JlQVBJQ29uZmlnO1xuICBwcml2YXRlIF9jbGllbnQ6IGFueTtcbiAgcHJpdmF0ZSBzY2hlbWE7XG4gIHByaXZhdGUgZmV0Y2hpbmdTY2hlbWEgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG9wdGlvbnM6IENvcmVBUElDb25maWcsXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBnbG9iYWxTdGF0ZTogR2xvYmFsU3RhdGUsXG4gICkge1xuICAgIHRoaXMuY29yZUFQSUNvbmZpZyA9IG9wdGlvbnMuZ2V0Q29uZmlnKCk7XG5cbiAgICB0aGlzLnRva2VuU3RyZWFtID0gbmV3IE9ic2VydmFibGU8c3RyaW5nPigob2JzOiBhbnkpID0+IHtcbiAgICAgIG9icy5uZXh0KHRoaXMuY29yZUFQSUNvbmZpZy50b2tlbkdldHRlcigpKTtcbiAgICB9KTtcbiAgICB0aGlzLmdsb2JhbFN0YXRlLnN1YnNjcmliZSgndXNlci5sb2dvdXQnLCBsb2dvdXQgPT4ge1xuICAgICAgdGhpcy5fY2xpZW50ID0gbnVsbDtcbiAgICAgIHRoaXMuc2NoZW1hID0gbnVsbDtcbiAgICB9KTtcbiAgICB0aGlzLmdsb2JhbFN0YXRlLnN1YnNjcmliZSgndXNlci50b2tlblJlZnJlc2hlZCcsICgpID0+IHtcbiAgICAgIHRoaXMuX2NsaWVudCA9IG51bGw7XG4gICAgfSk7XG4gIH1cblxuICBnZXQodXJsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuZ2V0KHVybCk7XG4gIH1cblxuICBzbGVlcChtcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG4gIH1cblxuICBhc3luYyB3YWl0U2NoZW1hKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjAwOyBpKyspIHtcbiAgICAgIGF3YWl0IHRoaXMuc2xlZXAoMTAwKTtcbiAgICAgIGlmICh0aGlzLnNjaGVtYSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0U2NoZW1hKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIXRoaXMuc2NoZW1hKSB7XG4gICAgICAgIGlmICh0aGlzLmZldGNoaW5nU2NoZW1hKSB7XG4gICAgICAgICAgdGhpcy53YWl0U2NoZW1hKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnNjaGVtYSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRmV0Y2ggc2NoZW1hIHRpbWVvdXQuYCwgZXJyb3IpO1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jb25maWcuZ2V0KCdzY2hlbWFVcmwnKTtcbiAgICAgICAgICB0aGlzLmZldGNoaW5nU2NoZW1hID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmdldCh1cmwpXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zY2hlbWEgPSBkYXRhO1xuICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuc2NoZW1hKTtcbiAgICAgICAgICAgICAgdGhpcy5mZXRjaGluZ1NjaGVtYSA9IGZhbHNlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEZldGNoIHNjaGVtYSBmYWlsZWQuYCwgZXJyb3IpO1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICB0aGlzLmZldGNoaW5nU2NoZW1hID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLnNjaGVtYSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhY3Rpb24oXG4gICAga2V5czogQXJyYXk8c3RyaW5nPixcbiAgICBwYXJhbXM6IEFjdGlvblBhcmFtcyA9IHt9LFxuICApOiBQcm9taXNlPGFueT4ge1xuICAgIHRoaXMuZ2xvYmFsU3RhdGUucHVibGlzaCgnaHR0cC5sb2FkaW5nJywgdHJ1ZSk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5nZXRTY2hlbWEoKVxuICAgICAgICAudGhlbihkb2MgPT4ge1xuICAgICAgICAgIHRoaXMuY2xpZW50XG4gICAgICAgICAgICAuYWN0aW9uKGRvYywga2V5cywgcGFyYW1zLlBhcmFtcywgcGFyYW1zLkV4dHJhUGFyYW1zKVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZ2xvYmFsU3RhdGUucHVibGlzaCgnaHR0cC5sb2FkaW5nJywgZmFsc2UpO1xuICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJyc7XG4gICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZXJyb3IuY29udGVudCkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7ICAvLyBXaGV0aGVyIGl0IGlzIGFuIE9iamVjIG9iamVjdFxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5jb250ZW50LmRldGFpbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IuY29udGVudDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsU3RhdGUucHVibGlzaCgnaHR0cC40MDEnLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsU3RhdGUucHVibGlzaCgnaHR0cC40MDMnLCBtZXNzYWdlLCB0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDUwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsU3RhdGUucHVibGlzaCgnaHR0cC41MDAnLCBtZXNzYWdlLCB0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDUwMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsU3RhdGUucHVibGlzaCgnaHR0cC41MDEnLCBtZXNzYWdlLCB0cnVlKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMuZ2xvYmFsU3RhdGUucHVibGlzaCgnaHR0cC5sb2FkaW5nJywgZmFsc2UpO1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgUmVxdWVzdCAke2tleXN9IGZhaWxlZC5gLCBlcnJvcik7XG5cbiAgICAgICAgICB0aGlzLmdsb2JhbFN0YXRlLnB1Ymxpc2goJ2h0dHAubG9hZGluZycsIGZhbHNlKTtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNsaWVudCgpIHtcbiAgICBpZiAoIXRoaXMuX2NsaWVudCkge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgYXV0aDogbmV3IGNvcmVhcGkuYXV0aC5Ub2tlbkF1dGhlbnRpY2F0aW9uKHtcbiAgICAgICAgICB0b2tlbjogdGhpcy5jb3JlQVBJQ29uZmlnLnRva2VuR2V0dGVyKCksXG4gICAgICAgICAgc2NoZW1lOiB0aGlzLmNvcmVBUElDb25maWcuaGVhZGVyUHJlZml4LFxuICAgICAgICB9KSxcbiAgICAgIH07XG4gICAgICB0aGlzLl9jbGllbnQgPSBuZXcgY29yZWFwaS5DbGllbnQob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29yZUFQSUZhY3RvcnkoXG4gIGNvbmZpZzogQ29uZmlnU2VydmljZSxcbiAgZ2xvYmFsU3RhdGU6IEdsb2JhbFN0YXRlLFxuKSB7XG4gIGNvbnN0IGNvcmVBUElDb25maWcgPSB7XG4gICAgaGVhZGVyTmFtZTogQ29yZUFQSUNvbmZpZ0NvbnN0cy5ERUZBVUxUX0hFQURFUl9OQU1FLFxuICAgIGhlYWRlclByZWZpeDogQ29yZUFQSUNvbmZpZ0NvbnN0cy5IRUFERVJfUFJFRklYX0JFQVJFUixcbiAgICB0b2tlbk5hbWU6IENvcmVBUElDb25maWdDb25zdHMuREVGQVVMVF9UT0tFTl9OQU1FLFxuICAgIHRva2VuR2V0dGVyKCkge1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KGNvcmVBUElDb25maWcudG9rZW5OYW1lKTtcbiAgICB9LFxuICAgIGdsb2JhbEhlYWRlcnM6IFt7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfV0sXG4gICAgbm9Kd3RFcnJvcjogZmFsc2UsXG4gICAgbm9Ub2tlblNjaGVtZTogZmFsc2UsXG4gIH07XG4gIHJldHVybiBuZXcgQ29yZUFQSUNsaWVudChcbiAgICBuZXcgQ29yZUFQSUNvbmZpZyhjb3JlQVBJQ29uZmlnKSxcbiAgICBjb25maWcsXG4gICAgZ2xvYmFsU3RhdGUsXG4gICk7XG59XG5cbmNvbnN0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbmNvbnN0IHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWw6IGFueSkge1xuICBpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcsXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gb2JqZWN0QXNzaWduKHRhcmdldDogYW55LCAuLi5zb3VyY2U6IGFueVtdKSB7XG4gIGxldCBmcm9tOiBhbnk7XG4gIGxldCBzeW1ib2xzOiBhbnk7XG4gIGNvbnN0IHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblxuICBmb3IgKGxldCBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuICAgIGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGZyb20pIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcbiAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoKDxhbnk+T2JqZWN0KS5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgIHN5bWJvbHMgPSAoPGFueT5PYmplY3QpLmdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG4gICAgICAgICAgdG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0bztcbn1cblxuZXhwb3J0IGNsYXNzIENvcmVBUElDbGllbnRIdHRwRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG59XG4iXX0=