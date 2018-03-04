import * as React from 'react';
import { BlogEntryData } from '../../server/BlogEntry';
import './BlogEntry.css';
import 'highlight.js/styles/github.css';

export interface Props {
  blogEntry: BlogEntryData;
}

function BlogEntry({ blogEntry }: Props) {

  const postRoot = 'https://github.com/eliakaris/blog/tree/master/server/data/posts';
  return (
    blogEntry && 
    (
    <article>
      <h1><a href={`/blog/${blogEntry.slug}`} itemProp="url">{blogEntry.title}</a></h1>
      <div className="meta">
        <p>
          <time itemProp="dateCreated" dateTime={`${blogEntry.pub_date}`}>
            {blogEntry.pretty_pub_date}
          </time>
          &nbsp;∙&nbsp;
          <a href={`${postRoot}/${blogEntry.slug}.md`}>
            History
          </a>
        </p>
      </div>
      <div dangerouslySetInnerHTML={{__html: blogEntry.html}} />
    </article>
    )
  );
}

export default BlogEntry;