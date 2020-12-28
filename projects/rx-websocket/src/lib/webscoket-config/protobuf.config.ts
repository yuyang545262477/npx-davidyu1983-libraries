import {WebSocketSubjectConfig} from 'rxjs/webSocket';

export const protobufConfig: Omit<WebSocketSubjectConfig<unknown>, 'url'> = {
  binaryType: 'arraybuffer',
  serializer: v => v as ArrayBuffer,
  deserializer: msg => new Uint8Array(msg.data as ArrayBuffer),
};


