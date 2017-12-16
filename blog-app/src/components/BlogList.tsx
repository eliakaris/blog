import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { BlogEntryData } from '../types/BlogEntry';
import * as actions from '../actions/index';

interface Props {
  blogEntries: BlogEntryData[];
}

class BlogList extends React.Component<Props> {

  componentDidMount() {
    actions.getBlogEntries();
  }

  render() {
    // const { match } = this.props;
    var blogItems: JSX.Element[];
    blogItems = [];
    if (this.props.blogEntries && this.props.blogEntries.length > 0) {
      var years = {};
      this.props.blogEntries.map((blogItem) => {
        var year = new Date(blogItem.pub_date).getFullYear();
        if (!years[year]) {
          years[year] = true;
          blogItems.push(<h2>{year}</h2>);
        }

        blogItems.push(<li key={blogItem.slug}><NavLink to={`/blog/${blogItem.slug}`}>{blogItem.title}</NavLink></li>);
      });
    }

    return (
      <div>
        <ul>
          {blogItems}
        </ul>
    </div>
    );
  }
}

export default BlogList;