import * as React from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import Blog from './Blog';
import BlogEntry from '../containers/BlogEntry';

function Main() {
  return (
    <main className="container">
      <Route exact={true} path="/" component={BlogEntry} />
      <Route exact={true} path="/about" component={About} />
      <Route path="/blog" component={Blog} />
  </main>);
}

export default Main;