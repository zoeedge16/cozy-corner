import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row, Button } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const renderForm = () => {
    if (data) {
      return (
      <p>
        Success! You may now head{' '}
        <Link to="/">back to the homepage.</Link>
      </p>
      )
    } 
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h4 className='login-header'>Signup</h4>
            <Form className='form' onSubmit={handleFormSubmit}>
              <Form.Group controlId="username">
                <Form.Label className='m-3'>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter username"
                  name="username"
                  value={formState.username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label className='m-3'>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label className='m-3'>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* <Form.Group controlId="password">
                <Form.Label className='m-3'>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  name="confirm-password"
                />
              </Form.Group> */}

              <Button className='mt-4 mb-4 login-btn' type="submit">
                Submit
              </Button>
            </Form>
            <p>Already have an account? <Link to='/login' className='signup-link'>Login!</Link></p>

            {data && (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            )}
            {error && <div>{error.message}</div>}
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <main>
      <div>
        {renderForm()}
      </div>
    </main>
  );
};

export default Signup;