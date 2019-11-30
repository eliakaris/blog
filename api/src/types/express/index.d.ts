export {};

import * as Bunyan from 'bunyan';

// extend the request object of express to add the logger
declare global {
  namespace Express {
    interface Request {
      log: Bunyan;
    }
  }
}
