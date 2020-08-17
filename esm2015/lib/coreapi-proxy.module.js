import { NgModule } from '@angular/core';
import { ConfigService } from './config.service';
import { GlobalState } from './global.state';
import { CoreAPIClient, CoreAPIBaseService, coreAPIFactory } from './coreapi-proxy.service';
import * as i0 from "@angular/core";
export class CoreapiProxyModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZWFwaS1wcm94eS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb3JlYXBpLXByb3h5LyIsInNvdXJjZXMiOlsibGliL2NvcmVhcGktcHJveHkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQXNCNUYsTUFBTSxPQUFPLGtCQUFrQjs7c0RBQWxCLGtCQUFrQjttSEFBbEIsa0JBQWtCLG1CQWJsQjtRQUNULGFBQWE7UUFDYixXQUFXO1FBQ1gsa0JBQWtCO1FBQ2xCO1lBQ0UsT0FBTyxFQUFFLGFBQWE7WUFDdEIsVUFBVSxFQUFFLGNBQWM7WUFDMUIsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQztTQUNuQztLQUNGLFlBWFEsRUFDUjtrREFjVSxrQkFBa0I7Y0FsQjlCLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUUsRUFDYjtnQkFDRCxPQUFPLEVBQUUsRUFDUjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsYUFBYTtvQkFDYixXQUFXO29CQUNYLGtCQUFrQjtvQkFDbEI7d0JBQ0UsT0FBTyxFQUFFLGFBQWE7d0JBQ3RCLFVBQVUsRUFBRSxjQUFjO3dCQUMxQixJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDO3FCQUNuQztpQkFDRjtnQkFDRCxPQUFPLEVBQUUsRUFDUjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IEdsb2JhbFN0YXRlIH0gZnJvbSAnLi9nbG9iYWwuc3RhdGUnO1xuaW1wb3J0IHsgQ29yZUFQSUNsaWVudCwgQ29yZUFQSUJhc2VTZXJ2aWNlLCBjb3JlQVBJRmFjdG9yeSB9IGZyb20gJy4vY29yZWFwaS1wcm94eS5zZXJ2aWNlJztcblxuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICBdLFxuICBpbXBvcnRzOiBbXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIENvbmZpZ1NlcnZpY2UsXG4gICAgR2xvYmFsU3RhdGUsXG4gICAgQ29yZUFQSUJhc2VTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IENvcmVBUElDbGllbnQsXG4gICAgICB1c2VGYWN0b3J5OiBjb3JlQVBJRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtDb25maWdTZXJ2aWNlLCBHbG9iYWxTdGF0ZV0sXG4gICAgfVxuICBdLFxuICBleHBvcnRzOiBbXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ29yZWFwaVByb3h5TW9kdWxlIHsgfVxuIl19