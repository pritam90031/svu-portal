import React, { createContext, useContext, useState } from "react";
import users from "../data/users";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create the Auth Context
const AuthContext = createContext(null);

// AuthProvider wraps the whole app and provides login state
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Login function: checks credentials against hardcoded users array
  // const login = (username, password) => {
  //   const found = users.find(
  //     (u) => u.username === username && u.password === password
  //   );
  //   if (found) {
  //     console.log("found", found)
  //     setCurrentUser(found);
  //     return { success: true, user: found };
  //   }
  //   return { success: false };
  // };

  const login = async (username, password) => {
    const response  = await fetch(`${apiUrl}/login`, 
            {
                method: "POST", 
                headers:  { "Content-Type": "application/json"}, 
                body: JSON.stringify({username, password})

            })
    const result = await response.json()
    console.log("result.doc", result)
    if (!result.success) {return { success: false }}
    setCurrentUser(result.doc);
    return { success: true, user: result.doc };
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth anywhere in the app
export function useAuth() {
  return useContext(AuthContext);
}