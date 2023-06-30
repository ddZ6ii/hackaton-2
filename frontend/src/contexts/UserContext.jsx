import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // const handleLogin = (bool) => {
  //   // write new value to local storage
  //   //   localStorage.setItem('isDarkTheme', JSON.stringify(!isDarkTheme));
  //   setIsLoggedIn(bool);
  // };

  // const handleAdmin = (bool) => {
  //   // write new value to local storage
  //   //   localStorage.setItem('isDarkTheme', JSON.stringify(!isDarkTheme));
  //   setIsLoggedIn(bool);
  // };

  return (
    <UserContext.Provider
      value={{ isLoggedIn, isAdmin, setIsLoggedIn, setIsAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
};
