import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { createFaculty, useAuthToken } from '../../services/ApiService';
import { toast } from 'react-hot-toast';
import Loader from '../../common/Loader';


const AddFaculty = () => {
    const [formData, setFormData] = useState({
        facultyName: '',
        // description: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useAuthToken();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createFaculty(formData);
            toast.success('Faculty created successfully!', {
                duration: 8000,
                onClose: () => {
                    navigate('/faculties/view-faculties');
                }
            }as any);
            navigate('/faculties/view-faculties');
        } catch (error) {
            toast.error('Failed to create faculty. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Breadcrumb pageName="Add Faculty" />

            <div className="container py-8 px-6 bg-gray-900 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Add A New Faculty</h1>
                <form onSubmit={handleSubmit} className="max-w-full">
                    <div className='flex justify-around gap-5'>
                        <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
                            <label htmlFor="facultyName" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Faculty Name</label>
                            <input type="text" id="facultyName" name="facultyName" value={formData.facultyName} placeholder="Enter Faculty Name" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
                        </div>
                        {/* <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Description</label>
                            <textarea id="description" name="description" value={formData.description} placeholder="Enter Description" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm h-24" />
                        </div> */}
                    </div>
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="bg-primary text-white py-3 px-6 rounded-lg font-medium transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark" disabled={loading}>
                            {loading ? 'Creating...' : 'Add Faculty'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddFaculty;
