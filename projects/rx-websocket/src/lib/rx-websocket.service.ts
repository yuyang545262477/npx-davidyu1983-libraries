import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, switchAll, tap} from 'rxjs/operators';
import {webSocket, WebSocketSubject, WebSocketSubjectConfig} from 'rxjs/webSocket';
import {ILibConfig, LIB_CONFIG} from './InjectToken';
import {reconnect} from './reconnect.operate';
import {jsonConfig, protobufConfig} from './webscoket-config';

/** @dynamic */
@Injectable({
  providedIn: 'root',
})
export class RxWebsocketService {
  private socket$: WebSocketSubject<unknown> | undefined;
  private messagesSubject$ = new BehaviorSubject<Observable<unknown>>(new Observable());
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(err => {
    throw err;
  }));

  private window: Window;
  private setTimeId: undefined | number;

  constructor(@Inject(LIB_CONFIG) private libConfig: ILibConfig,
              @Inject(DOCUMENT) private  document: Document) {
    this.window = this.document.defaultView as Window;
    if (this.libConfig.autoConnect) {
      this.connect();
    }
  }

  sendMessage(msg: any): void {
    if (!this.socket$) {
      return;
    }
    this.socket$.next(msg);
  }

  close(): void {
    if (!this.socket$) {
      return;
    }
    this.socket$.complete();
    this.socket$ = undefined;
  }

  connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      const websocketConfig = this._getWebsocketConfig();
      this.socket$ = webSocket(websocketConfig);

      const messages = this.socket$.pipe(
        reconnect(this.libConfig.reconnectInterval!, this.libConfig.showLog!),
        tap({
          error: error => console.error(error),
        }), catchError(_ => EMPTY));
      this.messagesSubject$.next(messages);
    }
  }

  private _getWebsocketConfig(): WebSocketSubjectConfig<unknown> {
    const initWebsocketConfig = {
      openObserver: {
        next: () => {
          if (this.libConfig.showLog) {
            console.log(`[webSocket]: connect success`);
          }
        },
      },
      closeObserver: {
        next: () => {
          if (this.libConfig.showLog) {
            console.log('[webSocket]: connection closed');
          }
          this.socket$ = undefined;
          if (this.setTimeId) {
            return;
          }
          this.setTimeId = this.window.setTimeout(() => {
            this.setTimeId = undefined;
            this.connect();
          }, this.libConfig.reconnectInterval);
        },
      },
    };
    const dateTypeConfig = this.libConfig.dataType === 'json' ? jsonConfig : protobufConfig;
    return {...initWebsocketConfig, ...dateTypeConfig, url: this.libConfig.wsEndPoint};
  }
}
