import React, { useState, useContext } from "react";
import { Box, Button, Form, Icon } from 'react-bulma-components';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import "./Form.css";

export default function Register() {
  const history = useHistory();
  const { register } = useContext(UserProfileContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { email };
      register(userProfile, password)
        .then(() => history.push("/transactions"));
    }
 };

  return (
    <Box className="form">
      <form onSubmit={registerClick}>
        <Form.Field>
          <Form.Label for="email">Email</Form.Label>
          <Form.Control>
            <Form.Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
          </Form.Control>
          <Form.Label for="password">Password</Form.Label>
          <Form.Control>
            <Form.Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Control>
          <Form.Label for="confirmPassword">Confirm Password</Form.Label>
          <Form.Control>
            <Form.Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
          </Form.Control>
          <Form.Control className="form-group" kind="group">
            <Button className="form-group-element">
              <Icon>
                <FontAwesomeIcon icon={faUserEdit} /> 
              </Icon>
              <span>Register</span>
            </Button>
          </Form.Control>
        </Form.Field>
      </form>
    </Box>
  );
}