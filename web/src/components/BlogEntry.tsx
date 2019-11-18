import React, { useState } from 'react';
import { BlogEntryData } from '../../../server/BlogEntry';
import './BlogEntry.css';
import * as API from '../api';
import 'highlight.js/styles/github.css';

interface BlogEntryContainerProps {
  match: {
    params: {
      slug: string;
    }
  };
}

function BlogEntry(props: BlogEntryContainerProps) {
  const [blogEntry, setBlogEntry] = useState<BlogEntryData>();

  React.useEffect(() => {
    const slug = props.match.params.slug || 'latest';
    API.fetchBlogPost(slug).then(setBlogEntry);
  }, []);

  const postRoot = 'https://github.com/eliakaris/blog/tree/master/server/data/posts';
  return (
    blogEntry ?
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
    ) : null
  );
};

export default BlogEntry;