import React, { useState, useEffect } from 'react';
import { BlogListEntry } from '../../../server/BlogEntry';
import BlogListItem from './BlogListItem';
import * as Request from 'superagent';

function BlogList() {
  const [blogEntries, setBlogEntries] = useState([] as BlogListEntry[]);
  useEffect(() => {
    Request.get('http://localhost:3001/api/v1/blog').then(
      (response) => {
        setBlogEntries(response.body);
      });
  });

  var blogItems: JSX.Element[];
  blogItems = [];
  if (blogEntries && blogEntries.length > 0) {
    var years: any;
    years = {};
    blogEntries.map((blogItem) => {
      var year = new Date(blogItem.pub_date).getFullYear();
      if (!years[year]) {
        years[year] = true;
        blogItems.push(<h1 key={year}>{year}</h1>);
      }

      blogItems.push(<BlogListItem blogItem={blogItem} key={blogItem.slug} />);
      blogItems.push(<hr key={blogItem.slug + 'hr'} />);
    });
  }

  return (
    <div className="col-lg-8 col-md-10 mx-auto">
      {blogItems}
    </div>
  );
}

export default BlogList;