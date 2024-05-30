import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

type AuthContextType = {
  isLoggedIn: boolean;
  user: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  }, []);

  const login = (email: string, password: string) => {
    if (email === 'hefkay.lawal2019@gmail.com' && password === 'p@33word1') {
      Cookies.set('user', email, { expires: 1 });
      setIsLoggedIn(true);
      setUser(email);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const logout = () => {
    Cookies.remove('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
