import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Loader from '../../common/Loader';
import { getDepartmentById, updateDepartment } from '../../services/ApiService';
import { toast } from 'react-hot-toast';

const UpdateDepartment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { department } = location.state || {};

  const [formData, setFormData] = useState({
    departmentName: '',
    description: '',
    facultyName: '',
    headOfDepartment: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartment = async () => {
      if (!department?.departmentId) {
        setLoading(false);
        return;
      }

      try {

        const departmentData = await getDepartmentById(department.departmentId);

        setFormData({
          departmentName: departmentData.departmentName,
          description: departmentData.description,
          facultyName: departmentData.facultyName,
          headOfDepartment: departmentData.headOfDepartment
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching department:', error);
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [department?.departmentId]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setLoading(true);

    try {
      await updateDepartment(department.departmentId, formData);
      setLoading(false);
      toast.success('Department record updated successfully!', {
        duration: 5000,
        onClose: () => {
          navigate('/departments/view-departments');
        }
      } as any);
      navigate('/departments/view-departments');
    } catch (error) {
      console.error('Error updating department:', error);
      setLoading(false);
      toast.error('Failed to update department record. Please try again.');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Update Department" />

      <div className="container py-8 px-6 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
          Update {department.departmentName} department's data
        </h1>
        <form onSubmit={handleSubmit} className="max-w-full">
          <div className="flex justify-around gap-5">
            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">
                Department Name
              </label>
              <input
                type="text"
                id="departmentName"
                name="departmentName"
                value={formData.departmentName}
                placeholder="Enter Department Name"
                onChange={handleChange}
                required
                readOnly
                className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
              />
            </div>
            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="facultyName" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">
                Faculty Name
              </label>
              <input
                type="text"
                id="facultyName"
                name="facultyName"
                value={formData.facultyName}
                placeholder="Enter Faculty Name"
                onChange={handleChange}
                required
                readOnly
                className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-around gap-5">
            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">
                Head of Department
              </label>
              <input
                type="text"
                id="headOfDepartment"
                name="headOfDepartment"
                value={formData.headOfDepartment}
                placeholder="Enter Head of Department"
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
              />
            </div>

            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                placeholder="Enter Description"
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6 gap-4">
            <button
              type="submit"
              className="bg-primary text-white py-3 px-6 rounded-lg font-medium transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark"
            >
              {loading ? 'Updating...' : 'Update Department'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateDepartment;

