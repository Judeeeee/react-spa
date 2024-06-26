import { useState, createContext, useContext } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginStatus, setloginStatus] = useState(false);
  const login = () => {
    setloginStatus(!loginStatus);
  };

  return (
    <LoginContext.Provider value={{ loginStatus, login }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
