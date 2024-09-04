import React, { useState, useEffect } from 'react';
import { getEmploymentHistory } from '../../../services/ApiService';
import Loader from '../../../common/Loader';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../Authentication/AuthContext';
import Breadcrumb from '../../../components/Breadcrumb';

const UserEmploymentHistory: React.FC = () => {
    const [employmentHistory, setEmploymentHistory] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth(); 
    console.log('user', user?.employeeObj.employeeId);
    useEffect(() => {
        if (user?.employeeObj.employeeId) {
            fetchEmploymentHistory(user?.employeeObj.employeeId);
        }
    }, [user]);

    const fetchEmploymentHistory = async (empId: number) => {
        setLoading(true);
        try {
            const history = await getEmploymentHistory(empId);
            setEmploymentHistory(history);
        } catch (error) {
            toast.error('Error fetching employment history');
            console.error('Error fetching employment history:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (!employmentHistory) {
        return (
            <div className="container mx-auto py-8">
                <h2 className="text-xl text-center font-bold text-black dark:text-white">No employment history available.</h2>
            </div>
        );
    }

    return (
        <>
        <Breadcrumb pageName="View Employment History" />
        <div className="container mx-auto py-8">
            <div className="rounded-lg shadow-md px-8 bg-white dark:bg-boxdark p-4">
                <div className="bg-gradient-to-r from-primary to-secondary dark:from-primary dark:to-secondary rounded-lg p-6 mb-4 border border-stroke dark:border-strokedark shadow-md">
                    <h3 className="text-xl font-semibold text-white">My Employment History</h3>
                    <ul className="space-y-4 mt-4">
                        {employmentHistory.employmentHistories.map((history: any) => (
                            <li key={history.id} className="bg-white dark:bg-boxdark rounded-lg p-4 border border-stroke dark:border-strokedark shadow-sm">
                                <p className="text-gray-800 text-sm dark:text-gray-300 my-1.5"><b>Date Employed:</b> {new Date(history.dateEmployed).toLocaleDateString()}</p><hr></hr>
                                <p className="text-gray-800 text-sm dark:text-gray-300 my-1.5"><b>Date Relieved:</b> {history.dateRelieved ? new Date(history.dateRelieved).toLocaleDateString() : 'N/A'}</p><hr></hr>
                                <p className="text-gray-800 text-sm dark:text-gray-300 my-1.5"><b>Duration:</b> {history.duration}</p><hr></hr>
                                <p className="text-gray-800 text-sm dark:text-gray-300 my-1.5">
                                    <b>Employment Status:</b> 
                                    <span className={`inline-block px-2 py-1 rounded-full text-sm ${history.currentlyEmployed ? 'text-success dark:text-gray' : 'text-danger dark:text-danger'}`}>
                                        <b>{history.currentlyEmployed ? 'Currently Employed' : 'Not Employed'}</b>
                                    </span>
                                </p>
                                <hr />
                                <p className="text-gray-800 text-sm dark:text-gray-300 my-1.5"><b>Description:</b> {history.description}</p><hr></hr>
                                <div className="mt-1">
                                    <b className="text-gray-800 text-sm dark:text-gray-300">Positions Held:</b>
                                    <ul className="list-disc pl-5 mt-2 text-gray-800 dark:text-gray-300">
                                        {history.positionsHeld && history.positionsHeld.length > 0 ? (
                                            history.positionsHeld.map((position: any, index: number) => (
                                                <li key={index} className="flex items-center my-1">
                                                    <svg className="w-4 h-4 text-primary dark:text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                    <span className="text-xs">{position.position} 
                                                    ( {position.dateStarted ? new Date(position.dateStarted).toLocaleDateString() + " " : 'Start Date N/A '}
                                                        - 
                                                    {position.dateEnded ? new Date(position.dateEnded).toLocaleDateString() : ' End Date N/A '})
                                                    </span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-xs">No positions held</li>
                                        )}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
};

export default UserEmploymentHistory;
