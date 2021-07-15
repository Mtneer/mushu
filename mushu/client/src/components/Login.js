import React, { useState, useContext } from "react";
import { Box, Button, Form, Icon } from 'react-bulma-components';
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from "@fortawesome/free-solid-svg-icons";
import "./Form.css";

export default function Login() {
  const history = useHistory();
  const { login } = useContext(UserProfileContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/transactions"))
      
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <Box className="form">
      <form onSubmit={loginSubmit}>
        <Form.Field>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control>
            <Form.Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
          </Form.Control>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control>
            <Form.Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Control>
          <Form.Control className="form-group" kind="group">
            <Button className="form-group-element">
              <Icon>
                <FontAwesomeIcon icon={faKey} /> 
              </Icon>
              <span>Login</span>
            </Button>
            <em className="form-group-element">
              Not registered? <Link to="register">Register</Link>
            </em>
          </Form.Control>
        </Form.Field>
      </form>
    </Box>
  );
}