// import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import axios from 'axios';

// type User = {
//   employeeObj: {
//     userId: number;
//     employeeId: number;
//     position: string;
//   };
//   email: string;
//   name: string;
//   password: string;
//   role: string;
// };

// type AuthContextType = {
//   isLoggedIn: boolean;
//   user: User | null;
//   login: (email: string, password: string) => Promise<{ user: User }>;
//   signup: (email: string, password: string, name: string) => Promise<void>;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const API_BASE_URL = 'https://localhost:7267/api/Auth';

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const token = sessionStorage.getItem('token');
//     const storedUser = sessionStorage.getItem('user');
//     if (token && storedUser) {
//       setAuthToken(token);
//       setUser(JSON.parse(storedUser));
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
//       const { token, user: userData } = response.data;
//       sessionStorage.setItem('token', token);
//       sessionStorage.setItem('user', JSON.stringify(userData));
//       setAuthToken(token);
//       console.log("token:", token);
//       setUser(userData);
//       setIsLoggedIn(true);
//       return {token, user: userData };
//     } catch (error) {
//       setIsLoggedIn(false);
//       setUser(null);
//       throw error;
//     }
//   };
  
//   const signup = async (email: string, password: string, name: string) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/register`, { email, password, name });
//       const { user: userData } = response.data;
//       sessionStorage.setItem('user', JSON.stringify(userData));
//       setUser(userData);
//     } catch (error) {
//       setIsLoggedIn(false);
//       setUser(null);
//       throw error;
//     }
//   };

//   const logout = () => {
//     sessionStorage.removeItem('token');
//     sessionStorage.removeItem('user');
//     setAuthToken(null);
//     setUser(null);
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// const setAuthToken = (token: string | null) => {
//   if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete axios.defaults.headers.common['Authorization'];
//   }
// };



import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
// import decode from 'jwt-decode';

type User = {
  employeeObj: {
    userId: number;
    employeeId: number;
    position: string;
  };
  email: string;
  name: string;
  password: string;
  role: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ user: User }>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_BASE_URL = 'https://localhost:7267/api/Auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('user');
    if (token && storedUser) {
      setAuthToken(token);
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      const { token, user: userData } = response.data;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(userData));
      setAuthToken(token);
      console.log("token:", token);

      
      // const decodedToken: any = decode(token.result); 
      // console.log('Decoded Token:', decodedToken);

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
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout }}>
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

const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
