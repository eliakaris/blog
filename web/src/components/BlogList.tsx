import React, { useState } from 'react';
import { BlogListEntry } from '../api';
import BlogListItem from './BlogListItem';
import * as API from '../api';

function BlogList() {
  const [blogEntries, setBlogEntries] = useState<BlogListEntry[]>([]);
  React.useEffect(() => {
    API.fetchBlogListings().then(setBlogEntries);
  }, [blogEntries]);

  var blogItems: JSX.Element[];
  blogItems = [];
  if (blogEntries && blogEntries.length > 0) {
    var years: any;
    years = {};
    blogEntries.forEach((blogItem) => {
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