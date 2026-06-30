import { createContext, useContext, useState } from "react";
import type { AuthContextType, LoginData, User } from "../types/loginDatos";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const permitido = {
  id: 1,
  name: "Harry",
  email: "harryKane@gmail.com",
  password: "1234",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function iniciar(data: LoginData): boolean {
    if (data.email === permitido.email && data.password === permitido.password) {
      const loggedUser: User = {
        id: permitido.id,
        name: permitido.name,
        email: permitido.email,
      };

      setUser(loggedUser);
      return true;
    }

    return false;
  }

  function salir() {
    setUser(null);
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    iniciar,
    salir,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  return context;
}
