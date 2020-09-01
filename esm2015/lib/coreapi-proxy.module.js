import { NgModule } from '@angular/core';
import { ConfigService } from './config.service';
import { GlobalState } from './global.state';
import { CoreAPIClient, CoreAPIBaseService, coreAPIFactory } from './coreapi-proxy.service';
import * as i0 from "@angular/core";
export class CoreAPIProxyModule {
}
CoreAPIProxyModule.ɵmod = i0.ɵɵdefineNgModule({ type: CoreAPIProxyModule });
CoreAPIProxyModule.ɵinj = i0.ɵɵdefineInjector({ factory: function CoreAPIProxyModule_Factory(t) { return new (t || CoreAPIProxyModule)(); }, providers: [
        ConfigService,
        GlobalState,
        CoreAPIBaseService,
        {
            provide: CoreAPIClient,
            useFactory: coreAPIFactory,
            deps: [ConfigService, GlobalState],
        }
    ], imports: [[]] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CoreAPIProxyModule, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZWFwaS1wcm94eS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtY29yZWFwaS1wcm94eS8iLCJzb3VyY2VzIjpbImxpYi9jb3JlYXBpLXByb3h5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFzQjVGLE1BQU0sT0FBTyxrQkFBa0I7O3NEQUFsQixrQkFBa0I7bUhBQWxCLGtCQUFrQixtQkFibEI7UUFDVCxhQUFhO1FBQ2IsV0FBVztRQUNYLGtCQUFrQjtRQUNsQjtZQUNFLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLFVBQVUsRUFBRSxjQUFjO1lBQzFCLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUM7U0FDbkM7S0FDRixZQVhRLEVBQ1I7a0RBY1Usa0JBQWtCO2NBbEI5QixRQUFRO2VBQUM7Z0JBQ1IsWUFBWSxFQUFFLEVBQ2I7Z0JBQ0QsT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULGFBQWE7b0JBQ2IsV0FBVztvQkFDWCxrQkFBa0I7b0JBQ2xCO3dCQUNFLE9BQU8sRUFBRSxhQUFhO3dCQUN0QixVQUFVLEVBQUUsY0FBYzt3QkFDMUIsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQztxQkFDbkM7aUJBQ0Y7Z0JBQ0QsT0FBTyxFQUFFLEVBQ1I7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBHbG9iYWxTdGF0ZSB9IGZyb20gJy4vZ2xvYmFsLnN0YXRlJztcbmltcG9ydCB7IENvcmVBUElDbGllbnQsIENvcmVBUElCYXNlU2VydmljZSwgY29yZUFQSUZhY3RvcnkgfSBmcm9tICcuL2NvcmVhcGktcHJveHkuc2VydmljZSc7XG5cblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgXSxcbiAgaW1wb3J0czogW1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBDb25maWdTZXJ2aWNlLFxuICAgIEdsb2JhbFN0YXRlLFxuICAgIENvcmVBUElCYXNlU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBDb3JlQVBJQ2xpZW50LFxuICAgICAgdXNlRmFjdG9yeTogY29yZUFQSUZhY3RvcnksXG4gICAgICBkZXBzOiBbQ29uZmlnU2VydmljZSwgR2xvYmFsU3RhdGVdLFxuICAgIH1cbiAgXSxcbiAgZXhwb3J0czogW1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIENvcmVBUElQcm94eU1vZHVsZSB7IH1cbiJdfQ==