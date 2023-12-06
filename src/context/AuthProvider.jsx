import React, { useState, useContext } from "react";

const AuthContext = React.createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem("user") || null);

  const login = (data, callback) => {
    const { login } = data;
    const newUser = login;
    setUser(newUser);
    localStorage.setItem("user", newUser);
    if (callback) {
      callback();
    }
  };

  const logout = (callback) => {
    setUser(null);
    localStorage.removeItem("user");
    if (callback) {
      callback();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
