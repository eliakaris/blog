import * as React from 'react';
import { Route } from 'react-router-dom';
import Hello from './Hello';
import About from './About';
import Blog from './Blog';

function Main() {
  return (
    <main>
      <Route exact={true} path="/" component={Hello} />
      <Route exact={true} path="/about" component={About} />
      <Route path="/blog" component={Blog} />
  </main>);
}

export default Main;