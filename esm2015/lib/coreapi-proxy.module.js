import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ConfigService } from './config.service';
import { GlobalState } from './global.state';
import { CoreAPIClient, CoreAPIBaseService, coreAPIFactory } from './coreapi-proxy.service';
const ɵ0 = coreAPIFactory;
let CoreAPIProxyModule = class CoreAPIProxyModule {
};
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
                useFactory: ɵ0,
                deps: [ConfigService, GlobalState],
            }
        ],
        exports: []
    })
], CoreAPIProxyModule);
export { CoreAPIProxyModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZWFwaS1wcm94eS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtY29yZWFwaS1wcm94eS8iLCJzb3VyY2VzIjpbImxpYi9jb3JlYXBpLXByb3h5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7V0FlMUUsY0FBYztBQU9oQyxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtDQUFJLENBQUE7QUFBdEIsa0JBQWtCO0lBbEI5QixRQUFRLENBQUM7UUFDUixZQUFZLEVBQUUsRUFDYjtRQUNELE9BQU8sRUFBRSxFQUNSO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsYUFBYTtZQUNiLFdBQVc7WUFDWCxrQkFBa0I7WUFDbEI7Z0JBQ0UsT0FBTyxFQUFFLGFBQWE7Z0JBQ3RCLFVBQVUsSUFBZ0I7Z0JBQzFCLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUM7YUFDbkM7U0FDRjtRQUNELE9BQU8sRUFBRSxFQUNSO0tBQ0YsQ0FBQztHQUNXLGtCQUFrQixDQUFJO1NBQXRCLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBHbG9iYWxTdGF0ZSB9IGZyb20gJy4vZ2xvYmFsLnN0YXRlJztcbmltcG9ydCB7IENvcmVBUElDbGllbnQsIENvcmVBUElCYXNlU2VydmljZSwgY29yZUFQSUZhY3RvcnkgfSBmcm9tICcuL2NvcmVhcGktcHJveHkuc2VydmljZSc7XG5cblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgXSxcbiAgaW1wb3J0czogW1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBDb25maWdTZXJ2aWNlLFxuICAgIEdsb2JhbFN0YXRlLFxuICAgIENvcmVBUElCYXNlU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBDb3JlQVBJQ2xpZW50LFxuICAgICAgdXNlRmFjdG9yeTogY29yZUFQSUZhY3RvcnksXG4gICAgICBkZXBzOiBbQ29uZmlnU2VydmljZSwgR2xvYmFsU3RhdGVdLFxuICAgIH1cbiAgXSxcbiAgZXhwb3J0czogW1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIENvcmVBUElQcm94eU1vZHVsZSB7IH1cbiJdfQ==