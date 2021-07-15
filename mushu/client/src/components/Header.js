import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Navbar,
  Button,
  Icon
} from 'react-bulma-components';
import { UserProfileContext } from "../providers/UserProfileProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faKey, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import logo from './logo.png';


export const Header = () => {
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
      <Navbar aria-label="main navigation"  
            fixed='top' 
            active={isOpen}>
        <Navbar.Brand>
          <div className="logo-container">  
            <img className="logo"
            alt="Bulma: a modern CSS framework based on Flexbox"
            src={logo}/>
          </div>
          <h1 className="logo-title">mushu</h1>
        </Navbar.Brand>
        <Navbar.Burger className="nav-burger"
          onClick={toggle} />
        <Navbar.Menu>
            <Navbar.Container position='start' tabs='true'>
              {/* <Navbar.Dropdown> */}
                { /* When isLoggedIn === true, we will render the Main App Navigation Links */ }
                {isLoggedIn &&
                  <>
                    <Navbar.Link renderAs={RRNavLink} to={'/accounts'} onClick={toggle} arrowless='true'>Accounts</Navbar.Link>
                    <Navbar.Link renderAs={RRNavLink} to={'/transactions'} onClick={toggle} arrowless='true'>Transactions</Navbar.Link>
                    <Navbar.Link renderAs={RRNavLink} to={'/categories'} onClick={toggle} arrowless='true'>Categories</Navbar.Link>
                    {/* <Navbar.Item>
                      <Navbar.Link renderAs={RRNavbar.Link} to="/portfolio" onClick={toggle}>Portfolio</Navbar.Link>
                    </Navbar.Item> */}
                    <Navbar.Link renderAs={RRNavLink} to={'/spending'} onClick={toggle} arrowless='true'>Spending</Navbar.Link>
                    <Navbar.Link renderAs={RRNavLink} to={'/budgets'} onClick={toggle} arrowless='true'>Budgets</Navbar.Link>
                    {/* <Navbar.Item>
                      <Navbar.Link renderAs={RRNavbar.Link} to="/markets" onClick={toggle}>Markets</Navbar.Link>
                    </Navbar.Item> */}
                    
                  </>
                }
              {/* </Navbar.Dropdown> */}
            </Navbar.Container>
            <Navbar.Container align="end" className="form-group">
                {/* When isLoggedIn === true, we will separately render the Logout button */}
                {isLoggedIn ?
                  <>
                    <Button onClick={logout}>
                      <Icon>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                      </Icon>
                      <span>Logout</span>
                    </Button>
                  </>
                :
                  <>
                    <Button className="login-button form-group-element" renderAs={RRNavLink} to={'/login'} color="primary">
                      <Icon>
                        <FontAwesomeIcon icon={faKey} />
                      </Icon>
                      <span>Login</span>
                    </Button>
                    <Button className="register-button form-group-element" renderAs={RRNavLink} to={'/register'}>
                      <Icon>
                        <FontAwesomeIcon icon={faUserEdit} />
                      </Icon>
                      <span>Register</span>
                    </Button>
                  </>
                }
            </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    </div>
  );
}
