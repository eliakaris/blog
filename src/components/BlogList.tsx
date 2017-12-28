import * as React from 'react';
import { BlogListEntry } from '../types/BlogEntry';
import BlogListItem from './BlogListItem';

export interface Props {
  blogEntries: BlogListEntry[];
}

class BlogList extends React.Component<Props> {

  render() {
    var blogItems: JSX.Element[];
    blogItems = [];
    if (this.props.blogEntries && this.props.blogEntries.length > 0) {
      var years = {};
      this.props.blogEntries.map((blogItem) => {
        var year = new Date(blogItem.pub_date).getFullYear();
        if (!years[year]) {
          years[year] = true;
          blogItems.push(<h1 key={year}>{year}</h1>);
        }

        blogItems.push(<BlogListItem blogItem={blogItem} />);
        blogItems.push(<hr />);
      });
    }

    return (
      <div className="col-lg-8 col-md-10 mx-auto">
        {blogItems}
      </div>
    );
  }
}

export default BlogList;