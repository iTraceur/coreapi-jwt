import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ConfigService } from './config.service';
import { GlobalState } from './global.state';
import { CoreAPIClient, CoreAPIBaseService, coreAPIFactory } from './coreapi-proxy.service';
var ɵ0 = coreAPIFactory;
var CoreapiProxyModule = /** @class */ (function () {
    function CoreapiProxyModule() {
    }
    CoreapiProxyModule = __decorate([
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
    ], CoreapiProxyModule);
    return CoreapiProxyModule;
}());
export { CoreapiProxyModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZWFwaS1wcm94eS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb3JlYXBpLXByb3h5LyIsInNvdXJjZXMiOlsibGliL2NvcmVhcGktcHJveHkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztTQWUxRSxjQUFjO0FBT2hDO0lBQUE7SUFBa0MsQ0FBQztJQUF0QixrQkFBa0I7UUFsQjlCLFFBQVEsQ0FBQztZQUNSLFlBQVksRUFBRSxFQUNiO1lBQ0QsT0FBTyxFQUFFLEVBQ1I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsYUFBYTtnQkFDYixXQUFXO2dCQUNYLGtCQUFrQjtnQkFDbEI7b0JBQ0UsT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLFVBQVUsSUFBZ0I7b0JBQzFCLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUM7aUJBQ25DO2FBQ0Y7WUFDRCxPQUFPLEVBQUUsRUFDUjtTQUNGLENBQUM7T0FDVyxrQkFBa0IsQ0FBSTtJQUFELHlCQUFDO0NBQUEsQUFBbkMsSUFBbUM7U0FBdEIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IEdsb2JhbFN0YXRlIH0gZnJvbSAnLi9nbG9iYWwuc3RhdGUnO1xuaW1wb3J0IHsgQ29yZUFQSUNsaWVudCwgQ29yZUFQSUJhc2VTZXJ2aWNlLCBjb3JlQVBJRmFjdG9yeSB9IGZyb20gJy4vY29yZWFwaS1wcm94eS5zZXJ2aWNlJztcblxuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICBdLFxuICBpbXBvcnRzOiBbXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIENvbmZpZ1NlcnZpY2UsXG4gICAgR2xvYmFsU3RhdGUsXG4gICAgQ29yZUFQSUJhc2VTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IENvcmVBUElDbGllbnQsXG4gICAgICB1c2VGYWN0b3J5OiBjb3JlQVBJRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtDb25maWdTZXJ2aWNlLCBHbG9iYWxTdGF0ZV0sXG4gICAgfVxuICBdLFxuICBleHBvcnRzOiBbXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ29yZWFwaVByb3h5TW9kdWxlIHsgfVxuIl19