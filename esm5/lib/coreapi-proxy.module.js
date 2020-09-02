import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ConfigService } from './config.service';
import { GlobalState } from './global.state';
import { CoreAPIClient, CoreAPIBaseService, coreAPIFactory } from './coreapi-proxy.service';
var ɵ0 = coreAPIFactory;
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
                    useFactory: ɵ0,
                    deps: [ConfigService, GlobalState],
                }
            ],
            exports: []
        })
    ], CoreAPIProxyModule);
    return CoreAPIProxyModule;
}());
export { CoreAPIProxyModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZWFwaS1wcm94eS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtY29yZWFwaS1wcm94eS8iLCJzb3VyY2VzIjpbImxpYi9jb3JlYXBpLXByb3h5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7U0FlMUUsY0FBYztBQU9oQztJQUFBO0lBQWtDLENBQUM7SUFBdEIsa0JBQWtCO1FBbEI5QixRQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsRUFDYjtZQUNELE9BQU8sRUFBRSxFQUNSO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGFBQWE7Z0JBQ2IsV0FBVztnQkFDWCxrQkFBa0I7Z0JBQ2xCO29CQUNFLE9BQU8sRUFBRSxhQUFhO29CQUN0QixVQUFVLElBQWdCO29CQUMxQixJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDO2lCQUNuQzthQUNGO1lBQ0QsT0FBTyxFQUFFLEVBQ1I7U0FDRixDQUFDO09BQ1csa0JBQWtCLENBQUk7SUFBRCx5QkFBQztDQUFBLEFBQW5DLElBQW1DO1NBQXRCLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBHbG9iYWxTdGF0ZSB9IGZyb20gJy4vZ2xvYmFsLnN0YXRlJztcbmltcG9ydCB7IENvcmVBUElDbGllbnQsIENvcmVBUElCYXNlU2VydmljZSwgY29yZUFQSUZhY3RvcnkgfSBmcm9tICcuL2NvcmVhcGktcHJveHkuc2VydmljZSc7XG5cblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgXSxcbiAgaW1wb3J0czogW1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBDb25maWdTZXJ2aWNlLFxuICAgIEdsb2JhbFN0YXRlLFxuICAgIENvcmVBUElCYXNlU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBDb3JlQVBJQ2xpZW50LFxuICAgICAgdXNlRmFjdG9yeTogY29yZUFQSUZhY3RvcnksXG4gICAgICBkZXBzOiBbQ29uZmlnU2VydmljZSwgR2xvYmFsU3RhdGVdLFxuICAgIH1cbiAgXSxcbiAgZXhwb3J0czogW1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIENvcmVBUElQcm94eU1vZHVsZSB7IH1cbiJdfQ==