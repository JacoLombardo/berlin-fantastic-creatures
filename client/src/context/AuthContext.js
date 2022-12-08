// 1. Import hook
import React, { createContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getToken from '../tools/getToken';

// 2. Create Context / Store

export const AuthContext = createContext();

// 3. Create provider
export const AuthContextProvider = (props) => {

  const [userLogin, setUserLogin] = useState({});
  const [isUser, setIsUser] = useState(false);
  const [user, setUser] = useState({});
  const email = useRef();
  const password = useRef();
  const redirectTo = useNavigate();

  const login = async () => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email.current.value);
    urlencoded.append("password", password.current.value);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:5000/users/login",
        requestOptions
      );
      const result = await response.json();
      console.log("result :>> ", result);
      const { token, user } = result;
      if (token) {
        localStorage.setItem("token", token);
        setIsUser(true);
        setUser(user);
        redirectTo("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsUser(false);
    setUser(null);
    redirectTo("/");
  };

  const getPersonalProfile = async () => {

    const token = getToken();
    if (!token) {
      alert("You need to log in")
    }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {method: "GET", headers: myHeaders, redirect: "follow"};
    try {
      const response = await fetch("http://localhost:5000/users/profile", requestOptions);
      const result = await response.json();
      setUser(result.user);
    } catch (error) {
      console.log("error getting profile", error);
    }
  };

  const checkIfUserIsLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("User is logged in");
      setIsUser(true);
    } else {
      console.log("User is NOT logged in");
      setIsUser(false);
    }
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);


  // 4. Move state and function

  return (
    <AuthContext.Provider value={{ login, userLogin, setUserLogin, logout, isUser, user, setUser, getPersonalProfile, email, password }}>{props.children}</AuthContext.Provider>
  );
};
