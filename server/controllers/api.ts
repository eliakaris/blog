import * as express from 'express';
import { BlogListEntry } from '../BlogEntry';

export function blogList(req: express.Request, res: express.Response) {
  res.json(
    global.entries.map(
      function(e: BlogListEntry) {
        return {
          slug: e.slug,
          title: e.title,
          pub_date: e.pub_date,
          pretty_pub_date: e.pretty_pub_date,
          summary: e.summary
        }
      }));
}

function getBlogEntry(slug: string, res: express.Response) {
  var entry = global.blogData[slug];
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
}

export function blogEntry(req: express.Request, res: express.Response) {
  return getBlogEntry(req.params.slug, res);
}

export function latestBlogEntry(req: express.Request, res: express.Response) {
  return getBlogEntry(global.entries[0].slug, res);
}
