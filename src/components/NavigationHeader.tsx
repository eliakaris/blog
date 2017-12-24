import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

function NavigationHeader() {
  return (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <NavLink to="/">Elia Karagiannis</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight={true}>
          <NavItem><NavLink to="/">Home</NavLink></NavItem>
          <NavItem><NavLink to="/about">About</NavLink></NavItem>
          <NavItem><NavLink to="/blog">Archive</NavLink></NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>);
}

export default NavigationHeader;