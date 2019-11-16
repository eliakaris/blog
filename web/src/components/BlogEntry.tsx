import React, {useState, useEffect} from 'react';
import { BlogEntryData } from '../../../server/BlogEntry';
import * as Request from 'superagent';
import './BlogEntry.css';
import 'highlight.js/styles/github.css';

interface BlogEntryContainerProps {
  match: {
    params: {
      slug: string;
    }
  };
}

function BlogEntry(props: BlogEntryContainerProps) {
  const initialData: any = null;
  const [blogEntry, setBlogEntry] = useState<BlogEntryData>(initialData);

  useEffect(() => {
    const slug = props.match.params.slug || 'latest';
    Request.get(`http://localhost:3001/api/v1/blog/${slug}`).then(
      (response) => {
        setBlogEntry(response.body);
      });
  });

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
};

export default BlogEntry;