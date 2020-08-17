import { NgModule } from '@angular/core';
import { ConfigService } from './config.service';
import { GlobalState } from './global.state';
import { CoreAPIClient, CoreAPIBaseService, coreAPIFactory } from './coreapi-proxy.service';
import * as i0 from "@angular/core";
var CoreapiProxyModule = /** @class */ (function () {
    function CoreapiProxyModule() {
    }
    CoreapiProxyModule.ɵmod = i0.ɵɵdefineNgModule({ type: CoreapiProxyModule });
    CoreapiProxyModule.ɵinj = i0.ɵɵdefineInjector({ factory: function CoreapiProxyModule_Factory(t) { return new (t || CoreapiProxyModule)(); }, providers: [
            ConfigService,
            GlobalState,
            CoreAPIBaseService,
            {
                provide: CoreAPIClient,
                useFactory: coreAPIFactory,
                deps: [ConfigService, GlobalState],
            }
        ], imports: [[]] });
    return CoreapiProxyModule;
}());
export { CoreapiProxyModule };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CoreapiProxyModule, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZWFwaS1wcm94eS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb3JlYXBpLXByb3h5LyIsInNvdXJjZXMiOlsibGliL2NvcmVhcGktcHJveHkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQUk1RjtJQUFBO0tBa0JtQzswREFBdEIsa0JBQWtCO3VIQUFsQixrQkFBa0IsbUJBYmxCO1lBQ1QsYUFBYTtZQUNiLFdBQVc7WUFDWCxrQkFBa0I7WUFDbEI7Z0JBQ0UsT0FBTyxFQUFFLGFBQWE7Z0JBQ3RCLFVBQVUsRUFBRSxjQUFjO2dCQUMxQixJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDO2FBQ25DO1NBQ0YsWUFYUSxFQUNSOzZCQVhIO0NBeUJtQyxBQWxCbkMsSUFrQm1DO1NBQXRCLGtCQUFrQjtrREFBbEIsa0JBQWtCO2NBbEI5QixRQUFRO2VBQUM7Z0JBQ1IsWUFBWSxFQUFFLEVBQ2I7Z0JBQ0QsT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULGFBQWE7b0JBQ2IsV0FBVztvQkFDWCxrQkFBa0I7b0JBQ2xCO3dCQUNFLE9BQU8sRUFBRSxhQUFhO3dCQUN0QixVQUFVLEVBQUUsY0FBYzt3QkFDMUIsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQztxQkFDbkM7aUJBQ0Y7Z0JBQ0QsT0FBTyxFQUFFLEVBQ1I7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBHbG9iYWxTdGF0ZSB9IGZyb20gJy4vZ2xvYmFsLnN0YXRlJztcbmltcG9ydCB7IENvcmVBUElDbGllbnQsIENvcmVBUElCYXNlU2VydmljZSwgY29yZUFQSUZhY3RvcnkgfSBmcm9tICcuL2NvcmVhcGktcHJveHkuc2VydmljZSc7XG5cblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgXSxcbiAgaW1wb3J0czogW1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBDb25maWdTZXJ2aWNlLFxuICAgIEdsb2JhbFN0YXRlLFxuICAgIENvcmVBUElCYXNlU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBDb3JlQVBJQ2xpZW50LFxuICAgICAgdXNlRmFjdG9yeTogY29yZUFQSUZhY3RvcnksXG4gICAgICBkZXBzOiBbQ29uZmlnU2VydmljZSwgR2xvYmFsU3RhdGVdLFxuICAgIH1cbiAgXSxcbiAgZXhwb3J0czogW1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIENvcmVhcGlQcm94eU1vZHVsZSB7IH1cbiJdfQ==