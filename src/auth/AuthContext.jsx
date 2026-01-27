import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../apis/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { username, role }
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Restore session + role
  useEffect(() => {
    getMe()
      .then(res => {
        const role = res.data[0]; // ROLE_USER / ROLE_ADMIN
        const storedUser = JSON.parse(localStorage.getItem("user"));

        setUser({
          ...storedUser,
          role
        });
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = (userData) => {
    // userData can be { username }
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthProvider missing");
  return ctx;
};
