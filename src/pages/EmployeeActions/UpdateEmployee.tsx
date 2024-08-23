import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
// import Swal from 'sweetalert2';
import Loader from '../../common/Loader';
import { getEmployeeById, updateEmployee } from '../../services/ApiService';
import { parseCurrency, formatCurrency } from '../../services/UtilityFunctions';
import { toast } from 'react-hot-toast';

const UpdateEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employee } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    department: '',
    position: '',
    salary: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!employee?.employeeId) {
        setLoading(false);
        return;
      }

      try {
        const employeeData = await getEmployeeById(employee.employeeId);
        const formattedString = formatCurrency(employeeData.salary).toString();
        
        setFormData({
          fullName: employeeData.fullName,
          phoneNumber: employeeData.phoneNumber,
          email: employeeData.email,
          department: employeeData.department,
          position: employeeData.position,
          salary: formattedString
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee:', error);
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [employee?.employeeId]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'salary' ? value.replace(/[^0-9.]/g, '') : value
    }));
  };
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (formData.salary.trim() === '') {
      toast.error('Editing salary field is required.');
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        salary: parseCurrency(formData.salary)
        // salary: formData.salary ? parseFloat(formData.salary) : 0 
      };

      await updateEmployee(employee?.employeeId, dataToSend);
      setLoading(false);
      toast.success('Employee record updated successfully!',
      {
          duration: 5000,
          onClose: () => {
          navigate('/employee/view-employees');
      }} as any);
      // Swal.fire('Success', 'Employee record updated successfully!', 'success');
      navigate('/employee/view-employees');
    } catch (error) {
      console.error('Error updating employee:', error);
      setLoading(false);
      toast.error('Failed to update employee record. Please try again.',);
      // Swal.fire('Error', 'Failed to update employee record', 'error');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Update Employee" />

      <div className="container py-8 px-6 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Update {employee?.fullName}'s data</h1>
        <form onSubmit={handleSubmit} className="max-w-full">
          <div className="flex justify-around gap-5">
            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} placeholder="Enter Full Name" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
            </div>
            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Phone Number</label>
              <input type="phone" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} placeholder="Enter Phone Number" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
            </div>
          </div>
          <div className="flex justify-around gap-5">
            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} readOnly className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
            </div>
            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Department</label>
              <input type="text" id="department" name="department" placeholder="Enter Department" value={formData.department} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
            </div>
          </div>
          <div className="flex justify-around gap-5">
            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Position</label>
              <input type="text" id="position" name="position" placeholder="Enter Position" value={formData.position} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
            </div>
            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Salary (₦)</label>
              <input type="text" id="salary" name="salary" placeholder="Enter Salary" value={formData.salary} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <button type="submit" className="bg-primary text-white py-3 px-6 rounded-lg font-medium transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark">
              {loading ? 'Updating...' : 'Update Employee'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateEmployee;
