import { Container } from 'inversify';
import types from './types';
import { IBlogProvider } from '../BlogEntry';
import { BlogProvider } from '../BlogProvider';

// here is where we do all our object and lifetime matchings
const container = new Container();
container.bind<IBlogProvider>(types.IBlogProvider).to(BlogProvider).inSingletonScope();

export { container };
