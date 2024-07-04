// import axios from 'axios';
// import { setAuthToken } from './apiService';

// const API_BASE_URL = 'https://localhost:7267/api/Auth';

// export const login = async (credentials: { email: string; password: string }) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/login`, credentials);
//     const { token, user } = response.data;
//     setAuthToken(token);
//     return { token, user };
//   } catch (error) {
//     throw error;
//   }
// };

// export const signup = async (credentials: { email: string; password: string; name: string }) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/register`, credentials);
//         const { token, user } = response.data;
//         setAuthToken(token);
//         return { token, user };
//     } catch (error) {
//         throw error;
//     }
// };

// export const logout = () => {
//   setAuthToken(null);
// };
