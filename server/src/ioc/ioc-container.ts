import { Container } from 'inversify';
import types from './types';
import { IBlogProvider } from '../BlogEntry';
import { BlogProvider } from '../BlogProvider';
import { ILogger } from '../blog';
import { interfaces, TYPE } from 'inversify-express-utils';
import { bunyanLogger } from '../logger';

// here is where we do all our object and lifetime matchings
const container = new Container();
container.bind<ILogger>(types.ILogger).toDynamicValue(
  ctx => {
    // check if log already set.
    const httpContext = ctx.container.get<interfaces.HttpContext>(TYPE.HttpContext);
    if (httpContext && httpContext.request && httpContext.request.log) {
      return httpContext.request.log;
    }

    return bunyanLogger();
  },
).inRequestScope();
container.bind<IBlogProvider>(types.IBlogProvider).to(BlogProvider).inSingletonScope();

export { container };
