import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { createEmployee, useAuthToken } from '../../services/ApiService';
import { toast } from 'react-hot-toast';
import Loader from '../../common/Loader';

const CreateEmployee = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        department: '',
        position: '',
        salary: '',
        gender: 'Male',
        dateOfBirth: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useAuthToken();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // setFormData(prevState => ({
        //     ...prevState,
        //     [name]: value
        // }));

        if (name === 'dateOfBirth') {
            const formattedDate = new Date(value).toISOString().split('T')[0];
            setFormData(prevState => ({
                ...prevState,
                [name]: formattedDate
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createEmployee(formData);
            toast.success('Employee created successfully!',
            {
                duration: 8000,
                onClose: () => {
                navigate('/employee/view-employees');
            }} as any);
            navigate('/employee/view-employees');
        } catch (error) {
            toast.error('Failed to create employee. Please try again.',);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Breadcrumb pageName="Create Employee" />

            <div className="container py-8 px-6 bg-gray-900 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Add A New Employee</h1>
                <form onSubmit={handleSubmit} className="max-w-full">
                    <div className='flex justify-around gap-5'>
                        <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Full Name</label>
                            <input type="text" id="fullName" name="fullName" value={formData.fullName} placeholder="Enter Full Name" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
                            <small className="text-xs text-gray-500 dark:text-black font-bold">Format: Title Firstname Lastname</small>
                        </div>
                        <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Phone Number</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} placeholder="Enter Phone Number" onChange={handleChange} pattern="[0-9]{11}" required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
                            <small className="text-xs text-gray-500 dark:text-black font-bold">Format: 09044344256</small>
                        </div>
                    </div>
                    <div className='flex justify-around gap-5'>
                        <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Email Address</label>
                            <input type="email" id="email" name="email" value={formData.email} placeholder="Enter Email Address" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
                        </div>
                        <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Department</label>
                            <input type="text" id="department" name="department" placeholder="Enter Department" value={formData.department} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
                        </div>
                    </div>
                    <div className='flex justify-around gap-5'>
                        <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
                            <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Position</label>
                            <input type="text" id="position" name="position" placeholder="Enter Position" value={formData.position} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
                        </div>
                        <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
                            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Salary</label>
                            <input type="text" id="salary" name="salary" placeholder="Enter Salary" value={formData.salary} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
                        </div>
                    </div>
                    <div className='flex justify-around gap-5'>
                        <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Gender</label>
                            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
                            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Date of Birth</label>
                            <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="bg-primary text-white py-3 px-6 rounded-lg font-medium transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Employee'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateEmployee;
