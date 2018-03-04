import * as api from './controllers/api';
import * as express from 'express';
import * as path from 'path';

export function init (app: express.Application) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.get('/api/blog', api.blogList);
  app.get('/api/blog/latest', api.latestBlogEntry);
  app.get('/api/blog/:slug', api.blogEntry);
  app.use(express.static(path.join(__dirname, '../')));
  app.use(express.static(path.join(__dirname, '../../node_modules/bootstrap/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
  });
}
