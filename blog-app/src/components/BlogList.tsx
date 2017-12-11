import * as React from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import * as Request from 'superagent';

interface BlogItem {
  title: string;
  slug: string;
  pub_date: Date;
  format: string;
}

interface State {
   blogList: Array<BlogItem>;
}

class BlogList extends React.Component<RouteComponentProps<any>, State> {

  componentWillMount() {
    Request.get('/api/blog').then((response) => {
      this.setState({ blogList: response.body });
    })
  }

  render() {
    const { match } = this.props;
    var blogItems: JSX.Element[];
    blogItems = [];
    if (this.state) {
      var years = {};
      this.state.blogList.map((blogItem) => {
        var year = new Date(blogItem.pub_date).getFullYear();
        if (!years[year]) {
          years[year] = true;
          blogItems.push(<h2>{year}</h2>);
        }

        blogItems.push(<li><NavLink to={`${match.url}/${blogItem.slug}`}>{blogItem.title}</NavLink></li>);
      });
    }

    return (
      <div>
        <ul>
          { blogItems }
        </ul>
    </div>
    );
  }
}

export default BlogList;