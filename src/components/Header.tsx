import * as React from 'react';

function Header() {
  return (
    <header className="masthead">
      <div className="overlay" />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading">
                <h1>Elia's blog</h1>
                <span className="subheading">A blog about learnings in web technology</span>
              </div>
            </div>
          </div>
        </div>
    </header>
  );
}

export default Header;