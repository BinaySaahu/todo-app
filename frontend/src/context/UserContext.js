import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext([]);

export const UserContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState([]);


  return (
      <UserContext.Provider value={{ userDetails,setUserDetails }}>
        {children}
      </UserContext.Provider>
  );
};
