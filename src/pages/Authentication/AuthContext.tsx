import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

type User = {
  employeeObj: {
    userId: number;
    employeeId: number;
    position: string;
    department: string;
  };
  email: string;
  name: string;
  password: string;
  role: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ token: string, user: User }>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  token: string | null;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_BASE_URL = 'https://localhost:7267/api/Auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('token'));

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (token && storedUser) {
      setAuthToken(token);
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, [token]);

  const setAuthToken = (token: string | null) => {
    if (token) {
      sessionStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      sessionStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
    setToken(token);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      const { token, user: userData } = response.data;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(userData));
      setAuthToken(token);
      setUser(userData);
      setIsLoggedIn(true);
      return { token, user: userData };
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, { email, password, name });
      const { user: userData } = response.data;
      sessionStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      throw error;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setAuthToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout, token, setToken: setAuthToken }}>
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
