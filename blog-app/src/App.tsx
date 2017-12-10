import * as React from 'react';
import NavigationHeader from './components/NavigationHeader';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavigationHeader />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
