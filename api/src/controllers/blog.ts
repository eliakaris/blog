import {
  controller,
  inject,
  types,
  httpGet,
  requestParam
} from '../ioc';

import {
  IBlogProvider
} from '../BlogEntry';

@controller('/api/v1/blog')
export class BlogController {
  constructor(@inject(types.IBlogProvider) private blogProvider: IBlogProvider) {
  }

  @httpGet('/')
  public index() {
    return this.blogProvider.getBlogEntries();
  }

  @httpGet('/latest')
  public latest() {
    return this.blogProvider.getLatestEntry();
  }

  @httpGet('/:slug')
  public getById(@requestParam('slug') slug: string) {
    return this.blogProvider.getEntryFromSlug(slug);
  }
}
