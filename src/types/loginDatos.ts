export type User = {
  id: number;
  name: string;
  email: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  iniciar: (data: LoginData) => boolean;
  salir: () => void;
};