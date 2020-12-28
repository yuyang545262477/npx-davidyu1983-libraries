import {ModuleWithProviders, NgModule} from '@angular/core';
import {ILibConfig, initLibConfig, LIB_CONFIG} from './InjectToken';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
})
export class RxWebsocketModule {
  static forRoot(libConfig: ILibConfig): ModuleWithProviders<RxWebsocketModule> {
    return {
      ngModule: RxWebsocketModule,
      providers: [
        {
          provide: LIB_CONFIG,
          useValue: {...initLibConfig, ...libConfig},
        },
      ],
    };
  }
}
