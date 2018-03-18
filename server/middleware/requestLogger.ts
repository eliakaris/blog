import * as Bunyan from 'bunyan';
import * as BunyanRequest from 'bunyan-request';

export function requestLogger(logger: Bunyan) {
  return BunyanRequest({ logger });
}
