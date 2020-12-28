import {RECONNECT_INTERVAL} from './reconnect_interval';

export interface ILibConfig {
  wsEndPoint: string; // ws端口
  dataType?: 'json' | 'protobuf'; // 数据结构类型:'json'|'protobuf'
  autoConnect?: boolean; // 是否自动连接
  reconnectInterval?: number; // 重连时间设定
  showLog?: boolean; // 是否显示日志
}

export const initLibConfig: ILibConfig = {
  wsEndPoint: '',
  dataType: 'json',
  autoConnect: true,
  reconnectInterval: RECONNECT_INTERVAL,
  showLog: true,
};









