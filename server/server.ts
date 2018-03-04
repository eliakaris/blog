import * as express from 'express';
import * as routes from './routes';
import * as appInsights from 'applicationinsights';
import * as blog from './blog';

if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
  appInsights.setup();
  appInsights.start();
}

var app = express();
app.set('port', process.env.PORT || 3001);

blog.init();
routes.init(app);

console.log('Going to try port ' + app.get('port'));
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
