import React from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import Blog from './Blog';
import BlogEntry from './BlogEntry';

function Main() {
  return (
    <main className="container">
      <Route exact={true} path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route exact={true} path="/" component={BlogEntry} />
  </main>);
}

export default Main;
