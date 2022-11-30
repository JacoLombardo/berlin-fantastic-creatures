import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {

    // const id = useRef()

    const [newUser, setNewUser] = useState({});
    const [confirmationPassword, setConfirmationPassword] = useState(null);
    const [profileImg, setProfileImg] = useState("");
    
    const [validated, setValidated] = useState(false);

    const handleConfirmationPassword = (event) => {
        setConfirmationPassword(event.target.value);
    }
    
    const handleSubmit = (event) => {

        event.preventDefault();

        if (newUser.password !== confirmationPassword) {
            console.log(event.currentTarget)
        }
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        console.log(newUser);

        setTimeout(() => {
            register();
        }, 4000);
    };

    const register = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        const urlencoded = new URLSearchParams();
        urlencoded.append("username", newUser.username);
        urlencoded.append("firstName", newUser.firstName);
        urlencoded.append("lastName", newUser.lastName);
        urlencoded.append("email", newUser.email);
        urlencoded.append("password", newUser.password);
        urlencoded.append("profilePic", profileImg ? profileImg : "");
        
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
        };
        
        const response = await fetch("http://localhost:5000/register", requestOptions);
        const result = await response.json();
        console.log("result:", result);
    }

    const uploadPicture = async (event) => {
        event.preventDefault();
        var formdata = new FormData();
        formdata.append("image", event.target.files[0]);

        const requestOptions = { method: "POST", body: formdata, redirect: "follow" };
        try {
            const response = await fetch("http://localhost:5000/users/imageupload", requestOptions);
            const result = await response.json();
            console.log("result", result);
            setProfileImg(result.image);
        } catch (error) {
            console.log("error :>> ", error);
        };
    };

    const handleChangeHandler = (event) => {
        setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  return (
      <>
          <NavBar />
          <br />
          <div className="containerDiv">
              <br />
              <h1 style={{ textAlign: "center" }}>Register</h1>
              
              <Form noValidate validated={validated} onSubmit={handleSubmit} style={{padding: "20px"}}>
                  <div className="formFlex">
                      <Form.Group className="mb-3" controlId="formBasicUsername">
                          <Form.Label>Username</Form.Label>
                          <Form.Control type="text" placeholder="Enter username" name="username" value={newUser.username ? newUser.username : ""} onChange={handleChangeHandler} required />
                          <Form.Control.Feedback type="invalid">
                              Username already in use.
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicFirstName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter first name" name="firstName" value={newUser.firstName ? newUser.firstName : ""} onChange={handleChangeHandler} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicLastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter last name" name="lastName" value={newUser.lastName ? newUser.lastName : ""} onChange={handleChangeHandler} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" name="email" value={newUser.email ? newUser.email : ""} onChange={handleChangeHandler} required />
                          <Form.Control.Feedback type="invalid">
                              Email already in use.
                          </Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                              Invalid email format.
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword" >
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Enter password" name="password" value={newUser.password ? newUser.password : ""} onChange={handleChangeHandler} required />
                          <Form.Control.Feedback type="invalid">
                              Invalid password format.
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                          <Form.Label>Password confirmation</Form.Label>
                          <Form.Control type="password" placeholder="Confirm password" value={confirmationPassword ? confirmationPassword : ""} onChange={handleConfirmationPassword} required />
                          <Form.Control.Feedback type="invalid">
                              The passwords don't match.
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicFile">
                          <Form.Label>Profile picture (optional)</Form.Label>
                          <Form.Control type="file" name="profilePic" onChange={uploadPicture} />
                      </Form.Group>
                  </div>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  <div className="formButton">
                    <Button variant="primary" type="submit">Register</Button>
                  </div>
              </Form>
          </div>
      </>
  )
};

export default Register