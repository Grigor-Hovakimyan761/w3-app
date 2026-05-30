import { createContext } from 'react';
import type { AuthUser } from './authTypes';

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginWithWallet: () => AuthUser;
  loginWithEmail: (email: string) => AuthUser;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
