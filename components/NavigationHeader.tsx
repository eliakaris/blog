import React, { useState } from 'react';
import NavLink from 'next/link';
import {
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  NavbarToggler
} from 'reactstrap';

function NavigationHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div className="container">
        <NavbarBrand href="/">Elia Karagiannis</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse navbar isOpen={isOpen}>
          <Nav className="ml-auto" navbar>
            <NavItem><NavLink href="/">Home</NavLink></NavItem>
            <NavItem><NavLink href="/about">About</NavLink></NavItem>
            <NavItem><NavLink href="/blog">Archives</NavLink></NavItem>
          </Nav>
        </Collapse>
      </div>
    </nav>
  );
};

export default NavigationHeader;
