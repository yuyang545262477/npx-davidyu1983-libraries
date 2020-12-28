import {WebSocketSubjectConfig} from 'rxjs/webSocket';

export const jsonConfig: Omit<WebSocketSubjectConfig<unknown>, 'url'> = {
  binaryType: 'blob',
};
