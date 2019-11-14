import React, { useState } from 'react';
import { NavLink } from '../packages/react-router-dom';
import {
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  NavbarToggler } from '../packages/reactstrap';

function NavigationHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div className="container">
        <NavbarBrand href="/">Elia Karagiannis</NavbarBrand>
          <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
          <Collapse navbar isOpen={isOpen}>
            <Nav className="ml-auto" navbar>
              <NavItem><NavLink to="/">Home</NavLink></NavItem>
              <NavItem><NavLink to="/about">About</NavLink></NavItem>
              <NavItem><NavLink to="/blog">Archive</NavLink></NavItem>
            </Nav>
          </Collapse>
      </div>
    </nav>
  );
};

export default NavigationHeader;
