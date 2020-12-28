import {Observable} from 'rxjs';
import {delay, retryWhen, tap} from 'rxjs/operators';


export const reconnect = (reconnectInterval: number, showLog: boolean) => (source: Observable<unknown>) => source.pipe(
  retryWhen(errors => errors.pipe(
    tap(() => {
      if (showLog) {
        console.log('[webSocket] Try to reconnect');
      }
    }),
    delay(reconnectInterval),
  )),
);

