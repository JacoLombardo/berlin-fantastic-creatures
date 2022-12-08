// 1. Import hook
import React, { createContext } from 'react';


// 2. Create Context / Store

export const ContentContext = createContext();

// 3. Create provider
export const ContentContextProvider = (props) => {


  // 4. Move state and function

  return (
    <ContentContext.Provider value={{ }}>{props.children}</ContentContext.Provider>
  );
};
