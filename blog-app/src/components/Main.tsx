import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Hello from './Hello';
import BlogEntry from './BlogEntry';

function NavigationHeader() {
  return (
    <main>
      <Switch>
        <Route exact={true} path="/" component={Hello} />
        <Route path="/blog/:slug" component={BlogEntry} />
      </Switch>
  </main>);
}

export default NavigationHeader;