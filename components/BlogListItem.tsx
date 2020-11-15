import * as React from 'react';
import NavLink from 'next/link';
import { BlogListEntry } from './api';

export interface Props {
  blogItem: BlogListEntry;
}

function BlogListItem({ blogItem }: Props) {
  return (
    <div className="post-preview" blog-slug={blogItem.slug}>
      <NavLink href={`/blog/${blogItem.slug}`}>
        <a href="#">
          <h2 className="post-title">{blogItem.title}</h2>
          <h3 className="post-subtitle" dangerouslySetInnerHTML={{ __html: blogItem.summary }} />
        </a>
      </NavLink>
      <p className="post-meta">
        Posted on {blogItem.pretty_pub_date}
      </p>
    </div>
  );
}

export default BlogListItem;
