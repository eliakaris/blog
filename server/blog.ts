import * as fs from 'fs';
import * as moment from 'moment';
import * as marked from 'marked';
import * as hljs from 'highlight.js';
import * as path from 'path';
import * as S from 'string';
import { BlogData, BlogListEntry } from './BlogEntry';

const entriesFilename = path.resolve(__dirname, '../../server/data/entries.json');
const postsDirectory = path.resolve(__dirname, '../../server/data/posts');

function loadBlogEntries() {
  console.log('loading blog entries');
  const entriesJson = fs.readFileSync(entriesFilename);
  const entries = JSON.parse(entriesJson.toString()) as Array<BlogData>;

  const blogData = {};
  const blogEntries: Array<BlogListEntry> = [];
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const slug = entry.slug;
    const title = entry.title;
    const pubDate = new Date(entry.pub_date);
    const prettyPubDate = moment(entry.pub_date).format('MMMM Do, YYYY');

    var data = fs.readFileSync(path.resolve(postsDirectory, slug + '.md'), 'utf8');
    const html = marked(data);
    
    const summary = S(html).stripTags().truncate(170).toString();
    blogData[slug] = {
      pretty_pub_date: prettyPubDate,
      pub_date: pubDate,
      html,
      slug,
      title,
    };

    blogEntries.push({
      slug,
      title,
      pub_date: pubDate,
      pretty_pub_date: prettyPubDate,
      summary,
    });
  }

  global.blogData = blogData;
  global.entries = blogEntries.sort(function (a: BlogListEntry, b: BlogListEntry) {
    if (a.pub_date > b.pub_date) {
      return -1;
    }
    if (a.pub_date < b.pub_date) {
      return 1;
    }

    return 0;
  });
}

export function init() {
  marked.setOptions({
    langPrefix: 'hljs ',
    highlight: function (code: string, lang: string) {
      return hljs.highlight(lang, code).value;
    }
  });

  fs.watchFile(entriesFilename, loadBlogEntries);
  loadBlogEntries();
}
