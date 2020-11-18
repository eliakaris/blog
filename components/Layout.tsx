import * as React from 'react';
import NavigationHeader from './NavigationHeader';
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head'

const Layout: React.FC = ({ children }) => {
  return (
    <div className="App">
      <Head>
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="p:domain_verify" content="f802abe7ab114ffc842143c2dcaad350" />
        <link rel="apple-touch-icon" href="logo192.png" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <title>Elia Karagiannis</title>
      </Head>
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
