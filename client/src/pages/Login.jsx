import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row, Button } from 'react-bootstrap';

import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
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
      // <form onSubmit={handleFormSubmit}>
      //   <input
      //     placeholder="Your email"
      //     name="email"
      //     type="email"
      //     value={formState.email}
      //     onChange={handleChange}
      //   />
      //   <input
      //     placeholder="******"
      //     name="password"
      //     type="password"
      //     value={formState.password}
      //     onChange={handleChange}
      //   />
      //   <button type="submit">
      //     Submit
      //   </button>
      // </form>

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h4 className='login-header'>Login</h4>
            <Form className='form' onSubmit={handleFormSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button className='mt-4 mb-4 login-btn' type="submit">
                Submit
              </Button>
            </Form>
            <p>Don't have an account yet? <Link to='/signup' className='signup-link'>Signup!</Link></p>

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

export default Login;