import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import BlogEntry from './BlogEntry';
import BlogList from './BlogList';

function Blog({ match }: RouteComponentProps<{}>) {
  return (
    <div className="container">
      <div className="row">
        <Route exact={true} path={`${match.url}`} component={BlogList} />
        <Route path={`${match.url}/:slug`} component={BlogEntry} />
      </div>
    </div>
  );
}

export default Blog;