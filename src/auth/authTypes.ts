export type AuthMethod = 'wallet' | 'email';

export type AuthUser = {
  authMethod: AuthMethod;
  walletAddress: string;
  email?: string;
  createdAt: string;
};
