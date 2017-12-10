import * as React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationHeader() {
  return (
  <div>
    <div className="App-header">
        <h2>Welcome to React!!</h2>
    </div>
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/blog">Archive</NavLink></li>
      </ul>
    </nav>
  </div>);
}

export default NavigationHeader;