import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Loader from '../../common/Loader';
import { addEmployeeHistory, getEmployeeById } from '../../services/ApiService';
import { toast } from 'react-hot-toast';

const AddEmployeeHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const employeeId = location.state?.employeeId;
  const [employeeObj, setEmployeeObj] = useState<any>(null);

  const [formData, setFormData] = useState({
    dateEmployed: '',
    currentlyEmployed: false,
    description: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!employeeId) {
      toast.error('Employee ID is missing.');
      return;
    }

    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeById(employeeId);
        setEmployeeObj(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setLoading(false);
        toast.error('Failed to load employee data.');
      }
    };

    fetchEmployee();
  }, [employeeId]);
 
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target as HTMLInputElement | HTMLTextAreaElement;

    if (type === 'checkbox') {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeId) {
      toast.error('Employee ID is missing.');
      return;
    }

    setLoading(true);

    try {
      await addEmployeeHistory(employeeId, formData);

      setLoading(false);
      toast.success('Employment history added successfully!', {
        duration: 5000,
        onClose: () => navigate('/core-features/history'),
      }as any);

      navigate('/core-features/history');
    } catch (error) {
      console.error('Error adding employee history:', error);
      setLoading(false);
      toast.error('Failed to add employment history. Please try again.');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Add Employee History" />

      <div className="container py-8 px-6 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Add {employeeObj?.fullName + "\'s"} History Info</h1>
        <form onSubmit={handleSubmit} className="max-w-full">
          <div className="flex justify-around gap-5">
            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="dateEmployed" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Date Employed</label>
              <input
                type="date"
                id="dateEmployed"
                name="dateEmployed"
                value={formData.dateEmployed}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
              />
            </div>
            <div className="mb-4 w-1/2 flex items-center bg-white shadow-md rounded-md p-4">
              <label htmlFor="currentlyEmployed" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Currently Employed?</label>
              <input
                type="checkbox"
                id="currentlyEmployed"
                name="currentlyEmployed"
                checked={formData.currentlyEmployed}
                onChange={handleChange}
                className="mx-2 leading-tight block h-4 w-4 border-gray-300 rounded focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex justify-around gap-5">
            <div className="mb-4 w-full bg-white shadow-md rounded-md p-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-primary text-white py-3 px-6 rounded-lg font-medium transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark"
            >
              {loading ? 'Adding...' : 'Add History'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEmployeeHistory;
