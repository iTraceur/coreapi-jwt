import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ConfigService = class ConfigService {
    constructor() {
        this.data = null;
    }
    set(data) {
        this.data = data;
    }
    get(key) {
        return this.data[key];
    }
};
ConfigService = __decorate([
    Injectable()
], ConfigService);
export { ConfigService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb3JlYXBpLXByb3h5LyIsInNvdXJjZXMiOlsibGliL2NvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFBMUI7UUFDVSxTQUFJLEdBQVcsSUFBSSxDQUFDO0lBUzlCLENBQUM7SUFQQyxHQUFHLENBQUMsSUFBSTtRQUNOLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDO0NBQ0YsQ0FBQTtBQVZZLGFBQWE7SUFEekIsVUFBVSxFQUFFO0dBQ0EsYUFBYSxDQVV6QjtTQVZZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBkYXRhOiBPYmplY3QgPSBudWxsO1xuXG4gIHNldChkYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxuXG4gIGdldChrZXk6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmRhdGFba2V5XTtcbiAgfVxufVxuIl19