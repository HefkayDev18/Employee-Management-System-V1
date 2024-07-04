// import axios from 'axios';

// const API_BASE_URL = 'https://localhost:7267/api/EmployeeActions';

// const api = axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
  
//   export const setAuthToken = (token: string | null) => {
//     if (token) {
//       api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     } else {
//       delete api.defaults.headers.common['Authorization'];
//     }
//   };

//   export const getEmployees = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/GetAllEmployees`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//       throw error;
//     }
//   };
  

// // export const getEmployees = () => api.get(`${API_BASE_URL}/EmployeeActions/GetAllEmployees`);
// export const getEmployeeById = (id: number) => api.get(`/EmployeeActions/GetEmployeeById/${id}`);
// export const createEmployee = (employee: any) => api.post('/EmployeeActions/CreateEmployee', employee);
// export const updateEmployee = (id: number, employee: any) => api.put(`/EmployeeActions/UpdateEmployee/${id}`, employee);
// export const updateEmployeeRole = (id: number, employee: any) => api.put(`/EmployeeActions/UpdateEmployeeRole/${id}`, employee);
// export const deleteEmployee = (id: number) => api.delete(`/EmployeeActions/DeleteEmployee/${id}`);




import axios from 'axios';

const API_BASE_URL = 'https://localhost:7267/api/EmployeeActions';

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


const token = sessionStorage.getItem('token');
setAuthToken(token);

export const getEmployees = async () => {
  try {
    const response = await api.get('/GetAllEmployees');
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getEmployeeById = (id: number) => api.get(`/GetEmployeeById/${id}`);
export const createEmployee = (employee: any) => api.post('/CreateEmployee', employee);
export const updateEmployee = (id: number, employee: any) => api.put(`/UpdateEmployee/${id}`, employee);
export const updateEmployeeRole = (id: number, employee: any) => api.put(`/UpdateEmployeeRole/${id}`, employee);
export const deleteEmployee = (id: number) => api.delete(`/DeleteEmployee/${id}`);
