import 'reflect-metadata';
import * as routes from './routes';
import * as appInsights from 'applicationinsights';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './ioc/ioc-container';
import './controllers';
import { bunyanLogger } from './logger';
import { requestLogger } from './middleware';

if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
  appInsights.setup();
  appInsights.start();
}

const logger = bunyanLogger();
const server = new InversifyExpressServer(container);
server.setConfig(a => {
  a.use(requestLogger(logger));
  routes.init(a);
});

const app = server.build();
app.set('port', process.env.PORT || 3001);

console.log('Going to try port ' + app.get('port'));
app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
