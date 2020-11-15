import * as fs from 'fs';
import * as moment from 'moment';
import * as marked from 'marked';
import * as hljs from 'highlight.js';
import * as path from 'path';
import * as S from 'string';
import { IBlogProvider, BlogData, BlogListEntry, BlogEntryData } from './BlogEntry';

const entriesFilename = path.join(process.cwd(), './data/entries.json');
const postsDirectory = path.join(process.cwd(), './data/posts');

export class BlogProvider implements IBlogProvider {

  private entries: Array<BlogListEntry>;
  private blogData: {};

  constructor() {
    marked.setOptions({
      langPrefix: 'hljs ',
      highlight: function (code: string, lang: string) {
        return hljs.highlight(lang, code).value;
      }
    });

    fs.watchFile(entriesFilename, () => this.loadBlogEntries());
    this.loadBlogEntries();
  }

  loadBlogEntries() {
    const entriesJson = fs.readFileSync(entriesFilename).toString();
    const entriesArray = JSON.parse(entriesJson) as Array<BlogData>;

    const newBlogData = {};
    const newBlogEntries: Array<BlogListEntry> = [];
    for (let i = 0; i < entriesArray.length; i++) {
      const entry = entriesArray[i];
      const slug = entry.slug;
      const title = entry.title;
      const pubDate = new Date(entry.pub_date);
      const prettyPubDate = moment.default(entry.pub_date).format('MMMM Do, YYYY');

      var data = fs.readFileSync(path.resolve(postsDirectory, slug + '.md'), 'utf8');
      const html = marked.default(data);

      const summary = S.default(html).stripTags().truncate(170).toString();
      newBlogData[slug] = {
        pretty_pub_date: prettyPubDate,
        pub_date: pubDate,
        html,
        slug,
        title,
      };

      newBlogEntries.push({
        slug,
        title,
        pub_date: pubDate,
        pretty_pub_date: prettyPubDate,
        summary,
      });
    }

    this.blogData = newBlogData;
    this.entries = newBlogEntries.sort(function (a: BlogListEntry, b: BlogListEntry) {
      if (a.pub_date > b.pub_date) {
        return -1;
      }
      if (a.pub_date < b.pub_date) {
        return 1;
      }

      return 0;
    });
  }

  getBlogEntries(): BlogListEntry[] {
    return this.entries;
  }

  getLatestEntry(): BlogEntryData {
    return this.blogData[this.entries[0].slug];
  }

  getEntryFromSlug(slug: string): BlogEntryData {
    return this.blogData[slug] as BlogEntryData;
  }
}
