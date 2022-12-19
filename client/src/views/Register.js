import React, { useContext, useEffect, useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Register() {

    const { checkIfUserIsLoggedIn, server } = useContext(AuthContext);
    const [errors, setErrors] = useState(null);
    const [filteredErrors, setFilteredErrors] = useState(null);
    const redirectTo = useNavigate();
    const username = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const confirmationPassword = useRef();

    const filterErrors = () => {
        if (errors) {
            for (let i = 0; i < errors.length; i++) {
                if (errors[i].msg === "Email is required") {
                    for (let j = 0; j < errors.length; j++) {
                        if (errors[j].msg === "Invalid email format") {
                            errors.splice(j, 1);
                            setFilteredErrors(errors);
                        }
                    }
                } else {
                    setFilteredErrors(errors);
                }
            }
        }
    };
    
    
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     if (imgDataURL) {
    //         uploadPicture();
    //     } else {
    //         register();
    //     };
    // };

    const register = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        const urlencoded = new URLSearchParams();
        urlencoded.append("username", username.current.value);
        urlencoded.append("firstName", firstName.current.value);
        urlencoded.append("lastName", lastName.current.value);
        urlencoded.append("email", email.current.value);
        urlencoded.append("password", password.current.value);
        urlencoded.append("password_confirmation", confirmationPassword.current.value);
        
        const requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
        try {
            const response = await fetch(`${server}/api/users/register`, requestOptions);
            const result = await response.json();
            if (result.errors) {
                setErrors(result.errors);
            } else {
                alert("Registration successful!")
                redirectTo("/login");
            };            
        } catch (error) {
            console.log("error :>> ", error);
        };
    };

    // const uploadPicture = async () => {
    //     var formdata = new FormData();
    //     formdata.append("image", previewFile);

    //     const requestOptions = { method: "POST", body: formdata, redirect: "follow" };
    //     try {
    //         const response = await fetch(`${server}/api/users/imageupload`, requestOptions);
    //         const result = await response.json();
    //         register(result.image, result.img_id);
    //     } catch (error) {
    //         console.log("error :>> ", error);
    //     };
    // };

    useEffect(() => {
        filterErrors();
    }, [errors]);

    useEffect(() => {
        checkIfUserIsLoggedIn();
    }, []);
    
    // useEffect(() => {
    //     let fileReader, isCancel = false;
    //     if (previewFile) {
    //         fileReader = new FileReader();
    //         fileReader.onload = (event) => {
    //             const { result } = event.target;
    //             if (result && !isCancel) {
    //                 setImgDataURL(result)
    //             }
    //         }
    //         fileReader.readAsDataURL(previewFile);
    //     }
    //     return () => {
    //         isCancel = true;
    //         if (fileReader && fileReader.readyState === 1) {
    //             fileReader.abort();
    //         }
    //     }
    // }, [previewFile]);

  return (
      <>
          <NavBar />
          <br />
          <div className="containerDiv">
              <br />
              <h1 style={{ textAlign: "center" }}>Register</h1>
              
              <Form noValidate onSubmit={(event) => { event.preventDefault(); register() }} style={{padding: "20px"}}>
                  <div className="formFlex">
                      <Form.Group className="mb-3" controlId="formBasicUsername">
                          <Form.Label>Username</Form.Label>
                          <Form.Control type="text" placeholder="Enter username" name="username" ref={username} />
                          {errors && errors.map((error, key) => {
                              if (error.msg === "Username is required") {
                                  return <p key={key} className="errorMessage">{error.msg}</p>
                              } else if (error.msg === "Username already in use") {
                                  return <p key={key} className="errorMessage">{error.msg}</p>
                              };
                          })}
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicFirstName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter first name" name="firstName" ref={firstName} />
                          {errors && errors.map((error, key) => {
                              if (error.msg === "First name is required") {
                                  return <p key={key} className="errorMessage">{error.msg}</p>
                              };
                          })}
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicLastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter last name" name="lastName" ref={lastName} />
                          {errors && errors.map((error, key) => {
                              if (error.msg === "Last name is required") {
                                  return <p key={key} className="errorMessage">{error.msg}</p>
                              };
                          })}
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" name="email" ref={email} />
                          {filteredErrors && filteredErrors.map((error, key) => {
                              if (error.msg === "Email is required") {
                                  return <p key={key} className="errorMessage">{error.msg}</p>
                              } if (error.msg === "Invalid email format") {
                                  return <p key={key} className="errorMessage">{error.msg}</p>
                              } else if (error.msg === "Email already in use") {
                                  return <p key={key} className="errorMessage">{error.msg}</p>
                              };
                          })}
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword" >
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Enter password" name="password" ref={password} />
                          {errors && errors.map((error, key) => {
                              if (error.msg === "Invalid password") {
                                  return <div key={key}><p className="errorMessage">{error.msg}</p><p className="passwordTips">Passwords should be between 6 and 12 characters.</p></div>
                              } else if (error.msg === "Passwords don't match") {
                                  return <p key={key} className="errorMessage">{error.msg}</p>
                              };
                          })}
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                          <Form.Label>Password confirmation</Form.Label>
                          <Form.Control type="password" placeholder="Confirm password" ref={confirmationPassword} />
                      </Form.Group>
                  </div>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Check me out" required />
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