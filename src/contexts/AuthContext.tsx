import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  loading: boolean;
  lastAccess: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastAccess, setLastAccess] = useState<string | null>(null);

  const setCookie = (name: string, value: string, days: number = 7) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`;
  };

  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
    return null;
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  useEffect(() => {
    let authStatus = getCookie('adminAuth');
    let lastAcc = getCookie('adminLastAccess');

    // Migração: Se não tem cookie mas tem no localStorage, migra os dados
    if (!authStatus && localStorage.getItem('adminAuth') === 'true') {
      authStatus = 'true';
      lastAcc = localStorage.getItem('adminLastAccess');
      setCookie('adminAuth', 'true');
      if (lastAcc) setCookie('adminLastAccess', lastAcc);
      localStorage.removeItem('adminAuth');
      localStorage.removeItem('adminLastAccess');
    }

    if (authStatus === 'true') {
      setIsAuthenticated(true);
      if (!lastAcc) {
        lastAcc = new Date().toISOString();
        setCookie('adminLastAccess', lastAcc);
      }
      setLastAccess(lastAcc);
    }
    setLoading(false);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    setCookie('adminAuth', 'true');
    const now = new Date().toISOString();
    setCookie('adminLastAccess', now);
    setLastAccess(now);
  };

  const logout = () => {
    setIsAuthenticated(false);
    deleteCookie('adminAuth');
    deleteCookie('adminLastAccess');
    setLastAccess(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, lastAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

