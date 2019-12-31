import 'reflect-metadata';
import * as routes from './routes';
import * as appInsights from 'applicationinsights';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './ioc/ioc-container';
import './controllers';
import { bunyanLogger } from './logger';
import { requestLogger } from './middleware';
import { IBlogProvider } from './BlogEntry';
import types from './ioc/types';
const { ApolloServer } = require('apollo-server-express');

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

const typeDefs = `
  type Query {
    hello(name: String): String
    blogEntries: [BlogEntry]
    latestEntry: BlogEntry
    blogEntry(slug: String): BlogEntry
  }

  type BlogEntry {
    slug: String
    title: String
    pub_date: String
    summary: String
    html: String
  }
`;

const resolvers = {
  Query: {
    hello: (_: any, { name }: { name: string }) => {
      const returnValue = `Hello ${name || 'World!'}`
      return returnValue
    },
    blogEntries: (_: any, values: any) => {
      return container.get<IBlogProvider>(types.IBlogProvider).getBlogEntries();
    },
    latestEntry: (_:any, values: any) => {
      return container.get<IBlogProvider>(types.IBlogProvider).getLatestEntry();
    },
    blogEntry: (_:any, { slug }: { slug: string }) => {
      return container.get<IBlogProvider>(types.IBlogProvider).getEntryFromSlug(slug);
    }
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});


const app = server.build();
app.set('port', process.env.PORT || 3001);
apolloServer.applyMiddleware({app});

console.log('Going to try port ' + app.get('port'));
app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
