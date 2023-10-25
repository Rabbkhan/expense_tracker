import  { useState, createContext } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext({
  token: '',
  email: '',
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
});

export const AuthContextProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");
  const [token, setToken] = useState(initialToken || '');
  const [email, setEmail] = useState(initialEmail || '');

  const loginHandler = (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setToken(token);
    setEmail(email);
  };

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken('');
    setEmail('');
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const contextValue = {
    token: token,
    email: email,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
