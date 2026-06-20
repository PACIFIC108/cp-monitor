import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [codeforcesUser, setCodeforcesUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    const [appResult, codeforcesResult] = await Promise.allSettled([
      apiFetch('/auth/checkAuth'),
      apiFetch('/auth/me'),
    ]);
    setUser(appResult.status === 'fulfilled' ? appResult.value.user : null);
    setCodeforcesUser(codeforcesResult.status === 'fulfilled' ? codeforcesResult.value : null);
    setLoading(false);
  }, []);

  useEffect(() => { refreshAuth(); }, [refreshAuth]);

  const value = {
    user,
    setUser,
    codeforcesUser,
    setCodeforcesUser,
    isAuthenticated: Boolean(user),
    isAuthorized: Boolean(codeforcesUser),
    userHandle: codeforcesUser?.handle || '',
    loading,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
