import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  NavbarToggler } from 'reactstrap';

interface State {
  isOpen: boolean;
}

interface Props {
}

class NavigationHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  public render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <div className="container">
          <NavbarBrand href="/">Elia Karagiannis</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse navbar isOpen={this.state.isOpen}>
            <Nav className="ml-auto" navbar>
              <NavItem><NavLink to="/">Home</NavLink></NavItem>
              <NavItem><NavLink to="/about">About</NavLink></NavItem>
              <NavItem><NavLink to="/blog">Archive</NavLink></NavItem>
            </Nav>
          </Collapse>
        </div>
      </nav>);
  }
}

export default NavigationHeader;