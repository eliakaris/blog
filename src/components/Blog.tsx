import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import BlogEntry from '../containers/BlogEntry';
import BlogList from '../containers/BlogList';

function Blog({ match }: RouteComponentProps<{}>) {
  return (
    <div>
      <Route exact={true} path={`${match.url}`} component={BlogList} />
      <Route path={`${match.url}/:slug`} component={BlogEntry} />
    </div>
  );
}

export default Blog;