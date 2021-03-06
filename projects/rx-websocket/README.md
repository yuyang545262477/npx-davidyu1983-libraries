# RxWebsocket

[![npm version](https://badge.fury.io/js/%40davidyu1983%2Frx-websocket.svg)](https://www.npmjs.com/package/@davidyu1983/rx-websocket)

pure rxjs implement websocket. support json and protobuf;

### [ChangeLog](https://github.com/yuyang545262477/npx-davidyu1983-libraries/blob/master/projects/rx-websocket/changeLog.md)

## how to install

`yarn add @davidyu1983/rx-websocket`
or
`npm i @davidyu1983/rx-websocket`

## how to use

* app.module.ts

```typescript
import {RxWebsocketModule} from '@davidyu1983/rx-websocket';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RxWebsocketModule.forRoot({
      wsEndPoint: environment.wsEndPoint,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
```

* app.component.ts

```typescript
import {Component, OnInit} from '@angular/core';
import {RxWebsocketService} from 'rx-websocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  message$ = this.websocketService.messages$;

  constructor(private websocketService: RxWebsocketService) {
  }

  ngOnInit(): void {
    // if you set 'autoConnect:false' you need below code. 
    // this.websocketService.connect();
  }

}
```

* app.component.html

```html

<section>
  <p>{{message$|async}}</p>
</section>
```

## forRoot config

```typescript
RxWebsocketModule.forRoot({
  wsEndPoint: environment.wsEndPoint,// your ws endpoint; required
  dataType: 'json', //'json'|'protobuf';  default is 'json';
  autoConnect: true, // whether auto  connect when construct; default is ture
  reconnectInterval: 1000 * 5, // reconnect  interval  unit is ms ; default is 5s .
  showLog: true, // whether show log; default is true;
})
```

## RxWebsocketService Api

```typescript
export declare class RxWebsocketService {
  messages$: Observable<unknown>; //when client received message; message$ will push data;
  sendMessage(msg: any): void; // send message to ws-server;
  connect(): void; // connect ws-service; if the 'auto-connect' set is false;
}
```
