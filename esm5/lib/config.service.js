import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
    ConfigService.ɵfac = function ConfigService_Factory(t) { return new (t || ConfigService)(); };
    ConfigService.ɵprov = i0.ɵɵdefineInjectable({ token: ConfigService, factory: ConfigService.ɵfac });
    return ConfigService;
}());
export { ConfigService };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ConfigService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtY29yZWFwaS1wcm94eS8iLCJzb3VyY2VzIjpbImxpYi9jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQztJQUFBO1FBRVUsU0FBSSxHQUFXLElBQUksQ0FBQztLQVM3QjtJQVBDLDJCQUFHLEdBQUgsVUFBSSxJQUFJO1FBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELDJCQUFHLEdBQUgsVUFBSSxHQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7OEVBVFUsYUFBYTt5REFBYixhQUFhLFdBQWIsYUFBYTt3QkFIMUI7Q0FhQyxBQVhELElBV0M7U0FWWSxhQUFhO2tEQUFiLGFBQWE7Y0FEekIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbmZpZ1NlcnZpY2Uge1xuICBwcml2YXRlIGRhdGE6IE9iamVjdCA9IG51bGw7XG5cbiAgc2V0KGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgZ2V0KGtleTogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVtrZXldO1xuICB9XG59XG4iXX0=