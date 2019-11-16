import React from 'react';
import { Route } from 'react-router-dom';
import About from './About';

function Main() {
  return (
    <main className="container">
      <Route exact={true} path="/about" component={About} />
  </main>);
}

export default Main;
