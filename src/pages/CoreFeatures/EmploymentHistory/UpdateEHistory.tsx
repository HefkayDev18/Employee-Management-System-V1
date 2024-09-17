import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Loader from '../../../common/Loader';
import { getEmployeeById, getEmploymentHistory, updateEmployeeHistory } from '../../../services/ApiService';
import Breadcrumb from '../../../components/Breadcrumb';

const UpdateEmploymentHistory: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const employeeId = location.state?.employeeId;


    const [loading, setLoading] = useState(true);
    const [employeeObj, setEmployeeObj] = useState<any>(null);
    const [formData, setFormData] = useState({
        dateEmployed: '',
        dateRelieved: '',
        duration: '',
        currentlyEmployed: false,
        description: '',
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await getEmployeeById(employeeId);
                if (response) {
                    setEmployeeObj(response);
                }
            } catch (error) {
                console.error("Error fetching employee:", error);
                toast.error("Failed to load employee data");
            }
        };

        const fetchEmployeeHistory = async () => {
            try {
                const response = await getEmploymentHistory(employeeId);

                if (response && response.employmentHistories && response.employmentHistories.length > 0) {
                    const history = response.employmentHistories[0];
                    setFormData({
                        dateEmployed: new Date(history.dateEmployed).toISOString().split('T')[0],
                        dateRelieved: formData.dateRelieved || '',
                        duration: ' ',
                        currentlyEmployed: formData.currentlyEmployed,
                        description: history.description,
                    });

                } else {
                    toast.error("No employment history found");
                }
            } catch (error) {
                console.error("Error fetching employee history:", error);
                toast.error("Failed to load employee history");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
        fetchEmployeeHistory();
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const updatedFormData = {
            ...formData,
            dateRelieved: formData.currentlyEmployed ? null : formData.dateRelieved
        }

        try {
            await updateEmployeeHistory(employeeId, updatedFormData);
            toast.success('Employment history updated successfully!', {
                duration: 5000,
                onClose: () => navigate('/core-features/history'),
            } as any);
            navigate('/core-features/history');
        } catch (error) {
            console.error('Error updating employee history:', error);
            toast.error('Failed to update employment history. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Breadcrumb pageName="Update Employment History" />
            <div className="container py-8 px-6 bg-gray-900 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Update {employeeObj?.fullName + "'s"} History Info</h1>
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
                                className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
                                required
                                // readOnly
                            />
                            <p className="mt-1 text-xs font-bold text-gray-500">Date Format: mm/dd/yyy </p>
                        </div>
                        <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
                            <label htmlFor="dateRelieved" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Date Relieved</label>
                            <input
                                type="date"
                                id="dateRelieved"
                                name="dateRelieved"
                                value= {formData.currentlyEmployed? "": formData.dateRelieved}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
                                disabled = {formData.currentlyEmployed}
                                required = {!formData.currentlyEmployed}
                            />

                            {formData.currentlyEmployed ? (
                                <p className="mt-2 text-sm text-gray-500">Leave Date Relieved empty if currently employed</p>
                            ) : (
                                <p className="mt-1 text-xs font-bold text-gray-500">Date Format: mm/dd/yyy </p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-around gap-5">
                        <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
                                rows={4}
                                required
                            />
                        </div>
                        <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
                            <label htmlFor="currentlyEmployed" className="text-sm font-medium text-gray-700 dark:text-white dark:font-bold">Currently Employed?</label>
                            <input
                                type="checkbox"
                                id="currentlyEmployed"
                                name="currentlyEmployed"
                                checked={formData.currentlyEmployed}
                                onChange={handleChange}
                                className="mx-2 leading-tight text-xl"
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-primary text-white py-3 px-6 rounded-lg font-medium transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark"
                        >
                            {loading ? 'Updating...' : 'Update History'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateEmploymentHistory;

