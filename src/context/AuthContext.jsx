import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Authentication is intentionally kept only for the current app session.
  // Skills remain saved separately by email, but reopening the app requires a new login.
  const [user, setUser] = useState(null);

  const login = ({ email, name }) => {
    const cleanName = name?.trim() || "Skill Builder";
    const cleanEmail = email?.trim().toLowerCase() || "";

    setUser({
      name: cleanName,
      email: cleanEmail,
      signedInAt: new Date().toISOString(),
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(user?.email?.trim()),
      login,
      logout,
      user,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
