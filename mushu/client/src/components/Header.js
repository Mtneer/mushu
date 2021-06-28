import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Header() {
  // import the isLoggedIn state variable and logout function from
  // the UserProfileContext
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  
  // Define a state variable and function to manage the dropdown
  // menu functionality
  const [isOpen, setIsOpen] = useState(false);

  // Define a toggle method to change the state of isOpen variable 
  // when the user engages with the dropdown menu
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">Tabloid</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Main App Navigation Links */ }
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/" onClick={toggle}>Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/post" onClick={toggle}>Posts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/myposts" onClick={toggle}>My Posts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/post/add" onClick={toggle}>New Post</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/tags" onClick={toggle}>Tag Management</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/categories" onClick={toggle}>Category Management</NavLink>
                </NavItem>
                
              </>
            }
          </Nav>
          <Nav navbar>
            {/* When isLoggedIn === true, we will separately render the Logout button */}
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {/* When isLoggedIn === false, we will render the Login and Register buttons */}
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
