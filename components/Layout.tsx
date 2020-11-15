import * as React from 'react';
import NavigationHeader from './NavigationHeader';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="App">
      <NavigationHeader />
      <Header />
      <main className="container">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
