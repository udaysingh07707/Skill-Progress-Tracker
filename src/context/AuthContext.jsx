import { createContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

export const AuthContext = createContext(null);

const STORAGE_KEY = "skill-progress-tracker:user";

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage(STORAGE_KEY, null);

  const login = ({ email, name }) => {
    const cleanName = name?.trim() || "Skill Builder";

    setUser({
      name: cleanName,
      email: email?.trim() || "",
      signedInAt: new Date().toISOString(),
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(user),
      login,
      logout,
      user,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
