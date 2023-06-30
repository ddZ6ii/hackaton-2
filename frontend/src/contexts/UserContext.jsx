import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (bool) => {
    // write the new value to local storage
    localStorage.setItem('isUserCurrentlyLoggedIn', JSON.stringify(bool));
    // update the context state
    setIsLoggedIn(bool);
  };

  return (
    <UserContext.Provider
      value={{ isLoggedIn, isAdmin, setIsLoggedIn, handleLogin, setIsAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
};
