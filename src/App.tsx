import * as React from 'react';
import NavigationHeader from './components/NavigationHeader';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { AppInsights } from 'applicationinsights-js';
import { History, Location, UnregisterCallback } from 'history';
import { withRouter } from 'react-router-dom';
import './App.css';

interface Props {
  history: History;
}

class App extends React.Component<Props> {

  unlisten: UnregisterCallback;

  componentDidMount() {
    this.handleLocationChange(this.props.history.location);
    this.unlisten = this.props.history.listen(this.handleLocationChange);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  handleLocationChange(location: Location) {
    // your staff here
    if (process.env.REACT_APP_INSIGHTS_KEY
      && AppInsights && AppInsights.downloadAndSetup) {
      AppInsights.trackPageView();
    }
  }

  public render() {
    return (
      <div className="App">
        <NavigationHeader />
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

/* tslint:disable */
export default withRouter(App as any);
/* tslint:enable */
