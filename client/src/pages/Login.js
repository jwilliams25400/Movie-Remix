import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from "../utils/mutations";

import Auth from '../utils/auth';

const chatEng = process.env.REACT_APP_CHATENGINE

const LoginForm = () => {
  //  const [username, setUsename] = useState("");
  // const [password, setPassword] = useState("");
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, {error}] = useMutation(LOGIN_USER);

  useEffect (() => {
    if (error) {
      setShowAlert(true)
    }
    else {
      setShowAlert(false);
    }
  }, [error])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const authObject = {
      "Project-ID": "a21f0c74-83f4-4fa8-becc-d97091a24144",
      // "User-Name": username,
      // "User-Secret": password 
    };

    try {
      const response = await chatEng(authObject);
      console.log(response);
      if (!response) {
        throw new Error("Invalid Credentials");
      };
    } catch(error) {
      console.log(error);
    }


    try {
      const { data } = await login({
        variables: { ...userFormData }
      })

      console.log("handleFormSubmit: data: ", data);
      Auth.login(data.login.token);

    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
