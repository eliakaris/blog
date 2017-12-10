import * as React from 'react';
import { Link } from 'react-router-dom';

function NavigationHeader() {
  return (
  <div>
    <div className="App-header">
        <h2>Welcome to React!!</h2>
    </div>
    <nav>
      <ul>
        <li><Link to="/blog/first-blog-item">First blog item</Link></li>
        <li><Link to="/blog/second-blog-item">Second blog item</Link></li>
      </ul>
    </nav>
  </div>);
}

export default NavigationHeader;