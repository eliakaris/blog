import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import 'startbootstrap-clean-blog/vendor/bootstrap/css/bootstrap.min.css';
import 'startbootstrap-clean-blog/vendor/fontawesome-free/css/fontawesome.min.css';
import 'startbootstrap-clean-blog/css/clean-blog.min.css';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
