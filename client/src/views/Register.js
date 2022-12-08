import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [previewFile, setPreviewFile] = useState(null);
    const [imgDataURL, setImgDataURL] = useState(null);
    const redirectTo = useNavigate();
    const username = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const confirmationPassword = useRef();
    
    const [validated, setValidated] = useState(false);
    
    const handleSubmit = (event) => {

        event.preventDefault();
        if (password.current.value !== confirmationPassword.current.value) {
            console.log("nein");
        }
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        if (imgDataURL) {
            uploadPicture();
        } else {
            register();
        }
    };

    const register = async (profileImg) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        const urlencoded = new URLSearchParams();
        urlencoded.append("username", username.current.value);
        urlencoded.append("firstName", firstName.current.value);
        urlencoded.append("lastName", lastName.current.value);
        urlencoded.append("email", email.current.value);
        urlencoded.append("password", password.current.value);
        urlencoded.append("profilePic", profileImg ? profileImg : "");
        
        const requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
        try {
            const response = await fetch("http://localhost:5000/register", requestOptions);
            const result = await response.json();
            console.log("result:", result);
            redirectTo("/login");
        } catch (error) {
            console.log("error :>> ", error);
        };
    };

    const uploadPicture = async () => {
        var formdata = new FormData();
        formdata.append("image", previewFile);

        const requestOptions = { method: "POST", body: formdata, redirect: "follow" };
        try {
            const response = await fetch("http://localhost:5000/users/imageupload", requestOptions);
            const result = await response.json();
            register(result.image);
        } catch (error) {
            console.log("error :>> ", error);
        };
    };
    
    useEffect(() => {
        let fileReader, isCancel = false;
        if (previewFile) {
            fileReader = new FileReader();
            fileReader.onload = (event) => {
                const { result } = event.target;
                if (result && !isCancel) {
                    setImgDataURL(result)
                }
            }
            fileReader.readAsDataURL(previewFile);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }
    }, [previewFile]);

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
                          <Form.Control type="text" placeholder="Enter username" name="username" ref={username} required />
                          <Form.Control.Feedback type="invalid">
                              Username already in use.
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicFirstName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter first name" name="firstName" ref={firstName} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicLastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter last name" name="lastName" ref={lastName} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" name="email" ref={email} required />
                          <Form.Control.Feedback type="invalid">
                              Email already in use.
                          </Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                              Invalid email format.
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword" >
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Enter password" name="password" ref={password} required />
                          <Form.Control.Feedback type="invalid">
                              Invalid password format.
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                          <Form.Label>Password confirmation</Form.Label>
                          <Form.Control type="password" placeholder="Confirm password" ref={confirmationPassword} required />
                          <Form.Control.Feedback type="invalid">
                              The passwords don't match.
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicFile">
                          <Form.Label>Profile picture (optional)</Form.Label>
                          <Form.Control type="file" accept="image/*" name="profilePic" onChange={(event) => {setPreviewFile(event.target.files[0])}} />
                      </Form.Group>
                      {imgDataURL && <img src={imgDataURL} alt="img-preview" className="imgRegisterPreview" />}
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