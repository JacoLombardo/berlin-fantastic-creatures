import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LogIn() {

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
              <h1 style={{textAlign: "center"}}>Log In</h1>
              <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ padding: "20px" }}>
                  <div className="formFlex">
                      <Form.Group className="mb-3" controlId="formBasicUsername">
                          <Form.Label>Username</Form.Label>
                          <Form.Control type="username" placeholder="Enter username" required />
                          <Form.Control.Feedback type="invalid">
                              Wrong username.
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Enter password" required />
                          <Form.Control.Feedback type="invalid">
                              Wrong password.
                          </Form.Control.Feedback>
                      </Form.Group>
                  </div>
                  <div className="formButton">
                      <Button variant="primary" type="submit">Log In</Button>
                  </div>
              </Form>
          </div>
      </>
  )
}

export default LogIn