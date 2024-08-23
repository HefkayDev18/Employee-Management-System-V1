import { useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7267/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


//#region Authentication
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
//#endregion

//#region User
export const getUsers = async () => {
  try {
    const response = await api.get('/EmployeeActions/GetAllUsers');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
//#endregion

//#region Employee Actions
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
      const response = await api.post('/EmployeeActions/AddEmployee', employee);
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

  export const deleteEmployee = async (id: number) => {
    try {
      const response = await api.delete(`/EmployeeActions/DeleteEmployee/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  };
  //#endregion

//#region Employee Roles
  export const updateEmployeeRole = async (id: number, employee: { roleId: number; roleName: string }) => {
    try {
      const response = await api.put(`/EmployeeActions/UpdateEmployeeRole/${id}`, employee);
      return response.data;
    } catch (error) {
      console.error('Error updating employee role:', error);
      throw error;
    }
};

  export const getRoles = async () => {
    const response = await api.get('/EmployeeActions/GetAllRoles');
    console.log('Response:', response);
    if (!response || response.status !== 200) {
      console.error('Failed to fetch roles');
      throw new Error('Failed to fetch roles');
    }
    const data = response.data;
    console.log('Roles data:', data);
    return data;
  }; 

  export const getUserRole = async (id: number) => {
    try {
      const response = await api.get(`/EmployeeActions/GetUserRole/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user role:', error);
      throw error;
    }
  };
//#endregion
  
//#region Departments
export const getDepartments = async () => {
  try {
    const response = await api.get('/Departments/GetDepartments');
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

export const getDepartmentById = async (id: number) => {
    try {
      const response = await api.get(`/Departments/GetDepartmentById/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching department:', error);
      throw error;
    }
  };
  
  export const createDepartment = async (department: any) => {
    try {
      const response = await api.post('/Departments/AddDepartment', department);
      return response.data;
    } catch (error) {
      console.error('Error adding department:', error);
      throw error;
    }
  };
  
  export const updateDepartment = async (id: number, department: any) => {
    try {
      const response = await api.put(`/Departments/UpdateDepartment/${id}`, department);
      return response.data;
    } catch (error) {
      console.error('Error updating department:', error);
      throw error;
    }
  };

  export const deleteDepartment = async (id: number) => {
    try {
      const response = await api.delete(`/Departments/DeleteDepartment/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting department:', error);
      throw error;
    }
  };
//#endregion

//#region Faculties
export const getFaculties = async () => {
  try {
    const response = await api.get('/Faculties/GetFaculties');
    return response.data;
  } catch (error) {
    console.error('Error fetching faculties:', error);
    throw error;
  }
};

export const getFacultyById = async (id: number) => {
    try {
      const response = await api.get(`/Faculties/GetFacultyById/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching faculties:', error);
      throw error;
    }
  };
  
  export const createFaculty = async (faculty: any) => {
    try {
      const response = await api.post('/Faculties/AddFaculty', faculty);
      return response.data;
    } catch (error) {
      console.error('Error adding faculty:', error);
      throw error;
    }
  };

  export const deleteFaculty = async (id: number) => {
    try {
      const response = await api.delete(`/Faculties/DeleteFaculty/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting faculty:', error);
      throw error;
    }
  };
//#endregion

//#region EmpHistory
export const getEmploymentHistory = async (employeeId: number) => {
  try {
      const response = await api.get(`/CoreFeatures/GetEmployeeHistory/${employeeId}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching employment history:', error);
      throw error;
  }
};

export const addEmployeeHistory = async (employeeId: number, empHistory : any) => {
  try {
      const response = await api.post(`/CoreFeatures/CreateEmploymentHistory/${employeeId}`, empHistory);
      return response.data;
  } catch (error) {
      console.error('Error fetching employment history:', error);
      throw error;
  }
};

export const updateEmployeeHistory = async (employeeId: number, empHistory : any) => {
  try {
      const response = await api.put(`/CoreFeatures/UpdateEmploymentHistory/${employeeId}`, empHistory);
      return response.data;
  } catch (error) {
      console.error('Error fetching employment history:', error);
      throw error;
  }
};
//#endregion

//#region  Appraisals
export const submitAppraisal = async (employeeId: number, appraisalData: any) => {
  try {
    const response = await api.post(`/Appraisals/SubmitAppraisal/${employeeId}`, appraisalData);
    return response.data;
  } catch (error) {
    console.error('Error submitting appraisal:', error);
    throw error;
  }
};

export const getAppraisals = async (status: string, page: number, pageSize: number) => {
    try {
        const response = await api.get(`/Appraisals/GetAppraisals`, {
            params: { status, page, pageSize }
        });
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.error('Error fetching appraisals:', error);
        throw error;
    }
};

export const fetchAppraisalsHistory = async (employeeId: number) => {
  try {
    const response = await api.get(`/Appraisals/GetAppraisalsByEmployee/${employeeId}`);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error('Error fetching appraisals:', error);
    throw error;
  }
};

// export const getAppraisals = async (status: string, page: number, pageSize: number) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/Appraisals/GetAppraisals?status=${status}&page=${page}&pageSize=${pageSize}`);
//     const data = await response.json();
//     return data; 
//   } catch (error) {
//     console.error('Error fetching appraisals:', error);
//     throw error;
//   }
// };

export const approveAppraisal = async (id: number, managerComment?: string) => {
  try {
    const reviewDto = {
      Status: 'Approved',
      ManagerComment: managerComment || '',
    };
    const response = await api.post(`/Appraisals/ReviewAppraisal/${id}`, reviewDto);
    return response.data;
  } catch (error) {
    console.error('Error approving appraisal:', error);
    throw error;
  }
};


export const rejectAppraisal = async (id: number, managerComment?: string) => {
  try {
    const reviewDto = {
      Status: 'Rejected',
      ManagerComment: managerComment || '',
    };
    const response = await api.post(`/Appraisals/ReviewAppraisal/${id}`, reviewDto);
    return response.data;
  } catch (error) {
    console.error('Error rejecting appraisal:', error);
    throw error;
  }
};

export const getAppraisalDetails = async (id: number) => {
    try {
        const response = await api.get(`/Appraisals/GetAppraisalById/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching appraisal details:', error);
        throw error;
    }
};

export const updateAppraisal = async (id: number, status: string, managerComment?: string) => {
  try {
    const response = await api.post(`/Appraisals/ReviewAppraisal/${id}`, { status, managerComment });
    return response.data;
  } catch (error) {
    console.error('Error updating appraisal status:', error);
    throw error;
  }
};


//#endregion

//#region Medical Records
export const getMedicalRecords = async () => {
  try {
    const response = await api.get('/Medicals/GetMedicalRecords');
    return response.data;
  } catch (error) {
    console.error('Error fetching medical records:', error);
    throw error;
  }
};

export const getMedicalRecordsById = async (employeeId: number) => {
  try {
    const response = await api.get(`/Medicals/GetMedicalRecordsByEmployee/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching medical records:', error);
    throw error;
  }
};

// export const getMedicalRecordById = async (id: number) => {
//   try {
//     const response = await api.get(`/medical-records/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching medical record by ID:', error);
//     throw error;
//   }
// };

export const addMedicalRecord = async (employeeId: number, record: any) => {
  try {
    const response = await api.post(`/Medicals/AddMedicalRecord/${employeeId}`, record);
    return response.data;
  } catch (error) {
    console.error('Error adding medical record:', error);
    throw error;
  }
};

// export const updateMedicalRecord = async (id: number, record: any) => {
//   try {
//     const response = await api.put(`/medical-records/${id}`, record);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating medical record:', error);
//     throw error;
//   }
// };


//#endregion

//#region File Uploads
export const uploadCredentials = async (empId: number, token: any, formData: FormData) => {
  try {
    const response =  await axios.post(`${API_BASE_URL}/Credentials/Uploads/${empId}`, formData, 
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const fetchEmpUploads = async (empId: number) => {
  try {
    const response =  await api.get(`/Credentials/GetEmpUploads/${empId}`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving uploads:', error);
    throw error;
  }
};

export const fetchAllUploads = async () => {
  try {
    const response =  await api.get('/Credentials/GetAllUploads');
    return response.data;
  } catch (error) {
    console.error('Error retrieving uploads:', error);
    throw error;
  }
};


//#endregion