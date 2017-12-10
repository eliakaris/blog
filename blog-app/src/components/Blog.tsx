import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import BlogEntry from './BlogEntry';
import BlogList from './BlogList';

function Blog({ match }: RouteComponentProps<any>) {
  return (
    <div>
      <Route exact={true} path={`${match.url}`} component={BlogList} />
      <Route path={`${match.url}/:slug`} component={BlogEntry} />
    </div>
  );
}

export default Blog;