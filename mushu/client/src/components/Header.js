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
        <NavbarBrand tag={RRNavLink} to="/">mushu</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Main App Navigation Links */ }
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/accounts" onClick={toggle}>Accounts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/transactions" onClick={toggle}>Transactions</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/categories" onClick={toggle}>Categories</NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink tag={RRNavLink} to="/portfolio" onClick={toggle}>Portfolio</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/spending" onClick={toggle}>Spending</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/budgets" onClick={toggle}>Budgets</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/markets" onClick={toggle}>Markets</NavLink>
                </NavItem> */}
                
              </>
            }
          </Nav>
          <Nav navbar>
            {/* When isLoggedIn === true, we will separately render the Logout button */}
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout} href=" ">Logout</a>
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
