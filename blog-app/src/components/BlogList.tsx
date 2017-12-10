import * as React from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';

function BlogList({ match }: RouteComponentProps<any>) {
  return (
    <div>
      <ul>
        <li><NavLink to={`${match.url}/first-blog-item`}>First blog item</NavLink></li>
        <li><NavLink to={`${match.url}/second-blog-item`}>Second blog item</NavLink></li>
      </ul>
    </div>
  );
}

export default BlogList;