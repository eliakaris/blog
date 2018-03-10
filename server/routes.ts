import * as express from 'express';
import * as path from 'path';

export function init (app: express.Application) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.use(express.static(path.join(__dirname, '../')));
  app.use(express.static(path.join(__dirname, '../../node_modules/bootstrap/dist')));
  app.use((req, res, next) => {
    if (!req.path.toLocaleLowerCase().startsWith('/api')) {
      res.sendFile(path.resolve(__dirname, '../index.html'));
    } else {
      next();
    }
  });
}
