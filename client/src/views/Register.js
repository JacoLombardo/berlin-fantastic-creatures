import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {
    
    const [validated, setValidated] = useState(false);
    
    const handleSubmit = (event) => {
        console.log(event)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

  return (
      <>
          <NavBar />
          <br />
          <div className="containerDiv">
              <br />
              <h1 style={{textAlign: "center"}}>Register</h1>
              <Form noValidate validated={validated} onSubmit={handleSubmit} style={{padding: "20px"}}>
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="username" placeholder="Enter username" required />
                      <Form.Control.Feedback type="invalid">
                          Username already in use.
                      </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter first name" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter last name" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" required />
                      <Form.Control.Feedback type="invalid">
                          Email already in use.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                          Invalid email format.
                      </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Enter password" required />
                      <Form.Control.Feedback type="invalid">
                          Invalid password format.
                      </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                      <Form.Label>Password confirmation</Form.Label>
                      <Form.Control type="password" placeholder="Confirm password" required />
                      <Form.Control.Feedback type="invalid">
                          The passwords don't match.
                      </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicFile">
                      <Form.Label>Profile picture (optional)</Form.Label>
                      <Form.Control type="file" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  <Button variant="primary" type="submit">Register</Button>
              </Form>
          </div>
      </>
  )
}

export default Register