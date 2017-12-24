import * as React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationHeader() {
  return (
  <footer className="footer">
      <div className="container navbar">
        <hr />

        <div itemScope itemType="http://data-vocabulary.org/Person" className="hidden">
          <span itemProp="name">Elia Karagiannis</span>,
          <a href="http://www.eliakaris.com" itemProp="url">eliakaris.com</a>
          <span
              itemProp="address"
              itemScope={true}
              itemType="http://data-vocabulary.org/Address"
          >
            <span itemProp="locality">Seattle</span>, 
            <span itemProp="region">Washington</span>
          </span>
          <span itemProp="title">Software Development Engineer</span>
          <span itemProp="affiliation">Pinterest</span>
        </div>

        <p>© 2013 - 2017 <NavLink to="/about">Elia Karagiannis</NavLink>
         ∙ <a href="http://twitter.com/eliakaris">Follow @eliakaris</a>
          ∙ <a href="https://github.com/eliakaris/blog">View source</a>
        </p>
      </div>
    </footer>);
}

export default NavigationHeader;