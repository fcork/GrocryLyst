import React from 'react';
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap';


const NavBar = (props) => {
  return (
    <Navbar inverse collapseOnSelect staticTop className='nav-margin'>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#home">GrocryLyst</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
        { !props.googleUserData
        ?
        <Nav pullRight>
            <NavItem onClick={ props.googleSignIn }>
              Sign In With Google
            </NavItem>
        </Nav>
        :
        <Nav pullRight>
            <NavItem onClick={ props.googleSignOut }>
              Sign Out
            </NavItem>
        </Nav>
      }
        
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
