var express = require('express'),
routes = require('./routes'),
blog = require('./blog'),
path = require('path');

var app = express();
app.set('port', process.env.PORT || 3001);

blog.init();
routes.init(app);

console.log("Going to try port " + app.get('port'));
app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
