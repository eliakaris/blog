import * as React from 'react';

function NavigationHeader() {
  return (
    <footer>
      <div itemScope itemType="http://data-vocabulary.org/Person" className="hidden">
        <span itemProp="name">Elia Karagiannis</span>,
        <a href="http://www.eliakaris.com" itemProp="url">eliakaris.com</a>
        <span
            itemProp="address"
            itemScope={true}
            itemType="http://data-vocabulary.org/Address">
          <span itemProp="locality">Seattle</span>, 
          <span itemProp="region">Washington</span>
        </span>
        <span itemProp="title">Software Development Engineer</span>
        <span itemProp="affiliation">Pinterest</span>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <ul className="list-inline text-center">
              <li className="list-inline-item">
                <a href="http://twitter.com/eliakaris">
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x"></i>
                    <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://github.com/eliakaris/blog">
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x"></i>
                    <i className="fa fa-github fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
            </ul>
            <p className="copyright text-muted">Copyright © Elia Karagiannis 2017</p>
          </div>
        </div>
      </div>
    </footer>);
}

export default NavigationHeader;