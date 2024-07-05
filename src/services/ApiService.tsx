import { useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7267/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};


export const useAuthToken = () => {
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setAuthToken(token);
  }, []);
};


export const getEmployees = async () => {
  try {
    const response = await api.get('/EmployeeActions/GetAllEmployees');
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getEmployeeById = async (id: number) => {
    try {
      const response = await api.get(`/EmployeeActions/GetEmployeeById/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error;
    }
  };
  
  export const createEmployee = async (employee: any) => {
    try {
      const response = await api.post('/EmployeeActions/CreateEmployee', employee);
      return response.data;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  };
  
  export const updateEmployee = async (id: number, employee: any) => {
    try {
      const response = await api.put(`/EmployeeActions/UpdateEmployee/${id}`, employee);
      return response.data;
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  };
  
  export const updateEmployeeRole = async (id: number, employee: any) => {
    try {
      const response = await api.put(`/EmployeeActions/UpdateEmployeeRole/${id}`, employee);
      return response.data;
    } catch (error) {
      console.error('Error updating employee role:', error);
      throw error;
    }
  };
  
  export const deleteEmployee = async (id: number) => {
    try {
      const response = await api.delete(`/EmployeeActions/DeleteEmployee/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  };


