// 1. Import hook
import React, { createContext, useEffect, useState } from 'react';

// 2. Create Context / Store

export const AuthContext = createContext();

// 3. Create provider
export const AuthContextProvider = (props) => {

  const [userLogin, setUserLogin] = useState({});
  const [isUser, setIsUser] = useState(false);
  const [user, setUser] = useState({});

  const login = async () => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", userLogin.email);
    urlencoded.append("password", userLogin.password);

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
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsUser(false);
    setUser(null);
  };

  const checkIfUserIsLoggedIn = () => {

  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);


  // 4. Move state and function

  return (
    <AuthContext.Provider value={{ login, userLogin, setUserLogin, logout, isUser, user }}>{props.children}</AuthContext.Provider>
  );
};
