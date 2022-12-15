// 1. Import hook
import React, { createContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getToken from '../tools/getToken';

// 2. Create Context / Store

export const AuthContext = createContext();

// 3. Create provider
export const AuthContextProvider = (props) => {

  const [isUser, setIsUser] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const email = useRef();
  const password = useRef();
  const redirectTo = useNavigate();
  // const server = "http://localhost:5000";
  const server = "http://berlin-fantastic-creatures.vercel.app";

  const login = async () => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email.current.value);
    urlencoded.append("password", password.current.value);

    var requestOptions = { method: "POST", headers: myHeaders, body: urlencoded, redirect: "follow" };
    try {
      const response = await fetch(
        `${server}/api/users/login`,
        requestOptions
      );
      const result = await response.json();
      if (result.errors) {
        setErrors(result.errors);
      };
      const { token, user } = result;
      if (token) {
        localStorage.setItem("token", token);
        setIsUser(true);
        setErrors(null);
        setUser(user);
        redirectTo("/profile");
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
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {method: "GET", headers: myHeaders, redirect: "follow"};
    try {
      const response = await fetch(`${server}/api/users/profile`, requestOptions);
      const result = await response.json();
      setUser(result.user);
    } catch (error) {
      console.log("Error getting profile", error);
    }
  };

  const checkIfUserIsLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("User is logged in");
      getPersonalProfile();
      setIsUser(true);
      setLoading(false);
    } else {
      console.log("User is NOT logged in");
      setIsUser(false);
      setLoading(false);
    }
  };

  // 4. Move state and function

  return (
    <AuthContext.Provider value={{ login, logout, isUser, user, setUser, getPersonalProfile, email, password, loading, errors, setErrors, checkIfUserIsLoggedIn, server }}>{props.children}</AuthContext.Provider>
  );
};
