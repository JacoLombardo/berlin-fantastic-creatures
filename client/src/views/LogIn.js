import React, { useContext, useState } from 'react';
import NavBar from '../components/NavBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../context/AuthContext';

function LogIn() {

    const [validated, setValidated] = useState(false);
    const { login, email, password } = useContext(AuthContext);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        login();
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
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" name="email" ref={email} required />
                          <Form.Control.Feedback type="invalid">
                              Wrong email.
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Enter password" name="password" ref={password} required />
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