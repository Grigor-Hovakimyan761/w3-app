import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthUser } from './authTypes';

const AUTH_STORAGE_KEY = 'uniboard.auth.user';

const createDemoWalletAddress = () => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return `0x${Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')}`;
};

const readStoredUser = (): AuthUser | null => {
  const rawUser = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    const parsedUser = JSON.parse(rawUser) as Partial<AuthUser>;

    if (
      typeof parsedUser.walletAddress === 'string' &&
      (parsedUser.authMethod === 'wallet' || parsedUser.authMethod === 'email') &&
      typeof parsedUser.createdAt === 'string'
    ) {
      return parsedUser as AuthUser;
    }
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return null;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());

  const persistUser = useCallback((nextUser: AuthUser) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return nextUser;
  }, []);

  const loginWithWallet = useCallback(() => {
    return persistUser({
      authMethod: 'wallet',
      walletAddress: createDemoWalletAddress(),
      createdAt: new Date().toISOString(),
    });
  }, [persistUser]);

  const loginWithEmail = useCallback(
    (email: string) => {
      return persistUser({
        authMethod: 'email',
        email,
        walletAddress: createDemoWalletAddress(),
        createdAt: new Date().toISOString(),
      });
    },
    [persistUser],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loginWithWallet,
      loginWithEmail,
      logout,
    }),
    [loginWithEmail, loginWithWallet, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
