export interface ILogger {
  info(msg: Error | string | Object, ...params: any[]): void;
  error(msg: Error | string | Object, ...params: any[]): void;
  fields?: any;
}
