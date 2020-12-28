import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RxWebsocketModule} from 'rx-websocket';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RxWebsocketModule.forRoot({
      wsEndPoint: 'ws://192.168.31.53:18080/',
      autoConnect: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
