import React, { useContext, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../context/AuthContext';

function LogIn() {

    const { login, email, password, errors, setErrors } = useContext(AuthContext);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        login();
    };

    useEffect(() => {
        setErrors(null);
    }, []);

  return (
      <>
          <NavBar />
          <br />
          <div className="containerDiv">
              <br />
              <h1 style={{textAlign: "center"}}>Log In</h1>
              <Form noValidate onSubmit={handleSubmit} style={{ padding: "20px" }}>
                  <div className="formFlex">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" name="email" ref={email} required />
                          {errors && errors.map((error, key) => {
                              if (error.msg === "Invalid email") {
                                  return <p key={key} className="errorMessage">{error.msg}</p>
                              }
                          })}
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Enter password" name="password" ref={password} required />
                          {errors && errors.map((error, key) => {
                              if (error.msg === "Wrong password") {
                                  return <p key={key} className="errorMessage">{error.msg}</p>
                              }
                          })}
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