import * as React from 'react';
import NavigationHeader from './components/NavigationHeader';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavigationHeader />
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
