// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import Loader from '../../../common/Loader';
// import Breadcrumb from '../../../components/Breadcrumb';
// import { addMedicalRecord } from '../../../services/ApiService';

// const AddMedRecords: React.FC = () => {
//     const [formData, setFormData] = useState({
//         employeeId: '',
//         employeeName: '',
//         diagnosis: '',
//         prescription: '',
//         appointmentDate: '',
//         doctorName: '',
//         comments: ''
//     });
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         const state = location.state as { employeeId?: number };
//         if (state?.employeeId) {
//             setFormData(prevState => ({
//                 ...prevState,
//                 employeeId: state.employeeId
//             }));
//         }
//     }, [location.state]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             await addMedicalRecord(formData.employeeId, formData);
//             toast.success('Medical record added successfully!', {
//                 duration: 8000,
//                 onClose: () => {
//                     navigate('/medical/view-records');
//                 }
//             }as any);
//         } catch (error) {
//             toast.error('Failed to add medical record. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return <Loader />;
//     }

//     return (
//         <>
//             <Breadcrumb pageName="Medical Records" />

//             <div className="container py-8 px-6 bg-gray-900 rounded-lg shadow-lg">
//                 <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Add Medical Record</h1>
//                 <form onSubmit={handleSubmit} className="max-w-full">
//                     <div className='flex justify-around gap-5'>
//                         <div className="hidden">
//                             <label htmlFor="employeeId">Employee ID</label>
//                             <input type="text" id="employeeId" name="employeeId" value={formData.employeeId} readOnly />
//                         </div>
//                         <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
//                             <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Employee Name</label>
//                             <input type="text" id="employeeName" name="employeeName" value={formData.employeeName} placeholder="Enter Employee Name" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
//                         </div>
//                         <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
//                             <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Diagnosis</label>
//                             <input type="text" id="diagnosis" name="diagnosis" value={formData.diagnosis} placeholder="Enter Diagnosis" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
//                         </div>
//                     </div>
//                     <div className='flex justify-around gap-5'>
//                         <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
//                             <label htmlFor="prescription" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Prescription</label>
//                             <input type="text" id="prescription" name="prescription" value={formData.prescription} placeholder="Enter Prescription" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
//                         </div>
//                         <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
//                             <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Appointment Date</label>
//                             <input type="date" id="appointmentDate" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
//                         </div>
//                     </div>
//                     <div className='flex justify-around gap-5'>
//                         <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
//                             <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Doctor Name</label>
//                             <input type="text" id="doctorName" name="doctorName" value={formData.doctorName} placeholder="Enter Doctor Name" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
//                         </div>
//                         <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
//                             <label htmlFor="comments" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Comments</label>
//                             <textarea id="comments" name="comments" value={formData.comments} placeholder="Enter Comments" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm h-32" />
//                         </div>
//                     </div>
//                     <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-colors focus:outline-none">
//                         Add Medical Record
//                     </button>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default AddMedRecords;



import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { addMedicalRecord, useAuthToken } from '../../../services/ApiService';
import Loader from '../../../common/Loader';
import Breadcrumb from '../../../components/Breadcrumb';

const AddMedRecords = () => {
    // const { employeeId } = useParams<{ employeeId: string }>();
    const location = useLocation();
    const employeeId = location.state?.employeeId;
    const [formData, setFormData] = useState({
        diagnosis: '',
        prescription: '',
        appointmentDate: '',
        doctorName: '',
        comments: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useAuthToken();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'appointmentDate') {
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
        if (!employeeId) {
            toast.error('Employee ID is missing.');
            return;
        }

        setLoading(true);

        try {
            await addMedicalRecord(parseInt(employeeId), formData);
            toast.success('Medical record added successfully!', {
                duration: 8000,
                onClose: () => navigate('/medicals/view-adm_medical-records')
            }as any);
            navigate('/medicals/view-adm_medical-records');
        } catch (error) {
            toast.error('Failed to add medical record. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Breadcrumb pageName="Employee Medical Records" />

            <div className="container py-8 px-6 bg-gray-900 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Add Medical Record</h1>
                <form onSubmit={handleSubmit} className="max-w-full">
                    <div className='flex justify-around gap-5'>
                        <div className="mb-4 w-full bg-white shadow-md rounded-md p-4">
                            <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Diagnosis</label>
                            <input type="text" id="diagnosis" name="diagnosis" value={formData.diagnosis} placeholder="Enter Diagnosis" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
                        </div>
                    </div>
                    <div className='flex justify-around gap-5'>
                        <div className="mb-4 w-full bg-white shadow-md rounded-md p-4">
                            <label htmlFor="prescription" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Prescription</label>
                            <input type="text" id="prescription" name="prescription" value={formData.prescription} placeholder="Enter Prescription" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
                        </div>
                    </div>
                    <div className='flex justify-around gap-5'>
                        <div className="mb-4 w-full bg-white shadow-md rounded-md p-4">
                            <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Appointment Date</label>
                            <input type="date" id="appointmentDate" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
                        </div>
                    </div>
                    <div className='flex justify-around gap-5'>
                        <div className="mb-4 w-full bg-white shadow-md rounded-md p-4">
                            <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Doctor's Name</label>
                            <input type="text" id="doctorName" name="doctorName" value={formData.doctorName} placeholder="Enter Doctor's Name" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
                        </div>
                    </div>
                    <div className='flex justify-around gap-5'>
                        <div className="mb-4 w-full bg-white shadow-md rounded-md p-4">
                            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Comments</label>
                            <textarea id="comments" name="comments" value={formData.comments} placeholder="Enter Comments" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="bg-primary text-white py-3 px-6 rounded-lg font-medium transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Medical Record'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddMedRecords;
