var api = require('./controllers/api'),
path = require('path'),
express = require('express');

exports.init = function (app) {
  app.get('/api/blog', api.blogList);
  app.get('/api/blog/:slug', api.blogEntry);
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
};
