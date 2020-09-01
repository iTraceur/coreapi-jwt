import { NgModule } from '@angular/core';
import { ConfigService } from './config.service';
import { GlobalState } from './global.state';
import { CoreAPIClient, CoreAPIBaseService, coreAPIFactory } from './coreapi-proxy.service';
import * as i0 from "@angular/core";
var CoreAPIProxyModule = /** @class */ (function () {
    function CoreAPIProxyModule() {
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
    return CoreAPIProxyModule;
}());
export { CoreAPIProxyModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZWFwaS1wcm94eS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtY29yZWFwaS1wcm94eS8iLCJzb3VyY2VzIjpbImxpYi9jb3JlYXBpLXByb3h5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFJNUY7SUFBQTtLQWtCbUM7MERBQXRCLGtCQUFrQjt1SEFBbEIsa0JBQWtCLG1CQWJsQjtZQUNULGFBQWE7WUFDYixXQUFXO1lBQ1gsa0JBQWtCO1lBQ2xCO2dCQUNFLE9BQU8sRUFBRSxhQUFhO2dCQUN0QixVQUFVLEVBQUUsY0FBYztnQkFDMUIsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQzthQUNuQztTQUNGLFlBWFEsRUFDUjs2QkFYSDtDQXlCbUMsQUFsQm5DLElBa0JtQztTQUF0QixrQkFBa0I7a0RBQWxCLGtCQUFrQjtjQWxCOUIsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRSxFQUNiO2dCQUNELE9BQU8sRUFBRSxFQUNSO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxhQUFhO29CQUNiLFdBQVc7b0JBQ1gsa0JBQWtCO29CQUNsQjt3QkFDRSxPQUFPLEVBQUUsYUFBYTt3QkFDdEIsVUFBVSxFQUFFLGNBQWM7d0JBQzFCLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUM7cUJBQ25DO2lCQUNGO2dCQUNELE9BQU8sRUFBRSxFQUNSO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2xvYmFsU3RhdGUgfSBmcm9tICcuL2dsb2JhbC5zdGF0ZSc7XG5pbXBvcnQgeyBDb3JlQVBJQ2xpZW50LCBDb3JlQVBJQmFzZVNlcnZpY2UsIGNvcmVBUElGYWN0b3J5IH0gZnJvbSAnLi9jb3JlYXBpLXByb3h5LnNlcnZpY2UnO1xuXG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ29uZmlnU2VydmljZSxcbiAgICBHbG9iYWxTdGF0ZSxcbiAgICBDb3JlQVBJQmFzZVNlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogQ29yZUFQSUNsaWVudCxcbiAgICAgIHVzZUZhY3Rvcnk6IGNvcmVBUElGYWN0b3J5LFxuICAgICAgZGVwczogW0NvbmZpZ1NlcnZpY2UsIEdsb2JhbFN0YXRlXSxcbiAgICB9XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDb3JlQVBJUHJveHlNb2R1bGUgeyB9XG4iXX0=