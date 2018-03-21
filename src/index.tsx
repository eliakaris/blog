import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { AppInsights } from 'applicationinsights-js';

import 'startbootstrap-clean-blog/vendor/bootstrap/css/bootstrap.min.css';
import 'startbootstrap-clean-blog/vendor/font-awesome/css/font-awesome.min.css';
import 'startbootstrap-clean-blog/css/clean-blog.min.css';

import './index.css';

if (process.env.REACT_APP_INSIGHTS_KEY) {
  if (AppInsights && AppInsights.downloadAndSetup) {
    AppInsights.downloadAndSetup({ instrumentationKey: process.env.REACT_APP_INSIGHTS_KEY });
  }
}

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
