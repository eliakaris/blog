import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { BlogListEntry } from '../types/BlogEntry';

export interface Props {
  blogItem: BlogListEntry;
}

function BlogListItem({ blogItem }: Props) {
  return (
    <div className="post-preview" key={blogItem.slug}>
      <NavLink to={`/blog/${blogItem.slug}`}>
        <h2 className="post-title">{blogItem.title}</h2>
        <h3 className="post-subtitle" dangerouslySetInnerHTML={{__html: blogItem.summary}} />
      </NavLink>
      <p className="post-meta">
        Posted on {blogItem.pretty_pub_date}
      </p>
    </div>
  );
}

export default BlogListItem;
