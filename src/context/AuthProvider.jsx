import React, { useState, useContext } from "react";
import characters from "../data/character.json";

const AuthContext = React.createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem("user")) || null;
  const [user, setUser] = useState(savedUser);

  const login = (data, callback) => {
    const { login } = data;
    const userImg =
      characters[Math.floor(Math.random() * characters.length)].image;
    const newUser = { name: login, image: userImg };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
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
