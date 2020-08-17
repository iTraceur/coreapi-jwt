import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ConfigService {
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
ConfigService.ɵprov = i0.ɵɵdefineInjectable({ token: ConfigService, factory: ConfigService.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ConfigService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb3JlYXBpLXByb3h5LyIsInNvdXJjZXMiOlsibGliL2NvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRzNDLE1BQU0sT0FBTyxhQUFhO0lBRDFCO1FBRVUsU0FBSSxHQUFXLElBQUksQ0FBQztLQVM3QjtJQVBDLEdBQUcsQ0FBQyxJQUFJO1FBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7OzBFQVRVLGFBQWE7cURBQWIsYUFBYSxXQUFiLGFBQWE7a0RBQWIsYUFBYTtjQUR6QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZmlnU2VydmljZSB7XG4gIHByaXZhdGUgZGF0YTogT2JqZWN0ID0gbnVsbDtcblxuICBzZXQoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICBnZXQoa2V5OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhW2tleV07XG4gIH1cbn1cbiJdfQ==