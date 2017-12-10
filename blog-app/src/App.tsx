import * as React from 'react';
import NavigationHeader from './components/NavigationHeader';
import Main from './components/Main';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavigationHeader />
        <Main />
      </div>
    );
  }
}

export default App;
