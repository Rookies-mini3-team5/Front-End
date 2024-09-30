import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  // 새로고침 시 localStorage에서 사용자 정보와 토큰을 가져오는 로직 추가
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser)); 
      setToken(storedToken);
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};