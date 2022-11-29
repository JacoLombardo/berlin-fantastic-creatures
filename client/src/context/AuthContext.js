// 1. Import hook
import { React, createContext } from "react";

// 2. Create Context / Store

export const AuthContext = createContext();

// 3. Create provider
export const AuthContextProvider = (props) => {

  

  // 4. Move state and function

  return (
    <AuthContext.Provider value={{ }}>{props.children}</AuthContext.Provider>
  );
};
