import React, { useState, useEffect } from 'react';
import { getEmployees, getEmploymentHistory } from '../../../services/ApiService';
import Breadcrumb from '../../../components/Breadcrumb';
import Pagination from '../../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../common/Loader';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../Authentication/AuthContext';

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<any[]>([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
    const [selectedEmployeeHistory, setSelectedEmployeeHistory] = useState<any>(null);
    const [selectedEmployeeName, setSelectedEmployeeName] = useState<string | null>(null);
    const [selectedCurrentPosition, setSelectedCurrentPosition] = useState<string | null>(null);
    const [selectedCurrentDept, setSelectedCurrentDept] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewMore = async (employeeId: number) => {
        setSelectedEmployeeId(employeeId);
        try {
            const history = await getEmploymentHistory(employeeId);
            const employee = employees.find(emp => emp.employeeId === employeeId);
            if (employee) {
                setSelectedEmployeeName(employee.fullName);
                setSelectedCurrentPosition(employee.position);
                setSelectedCurrentDept(employee.department);
            }
            setSelectedEmployeeHistory(history);
        } catch (error) {
            toast.error('No history available for this employee, click add history');
            console.error('Error fetching employee history:', error);
        }
    };

    const handleCloseModal = () => {
        setSelectedEmployeeId(null);
        setSelectedEmployeeHistory(null);
    };

    const handleUpdate = (employeeId: number) => {
        navigate('/core-features/update-history', { state: { employeeId } });
    };
    
    const handleAddHistory = (employeeId: number) => {
        navigate('/core-features/add-history', { state: { employeeId } });
    };

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Breadcrumb pageName="Employment Histories" />
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center text-black mb-6 dark:text-white">List of Employees</h1>
                <div className="rounded-lg shadow-md px-8 bg-white dark:bg-boxdark p-4">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                        {currentEmployees.map((employee, index) => (
                            <li key={employee.employeeId} className="py-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-md font-medium text-gray-800 dark:text-white">
                                            <b>{indexOfFirstEmployee + index + 1}. {employee.fullName}</b>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Current Position: {employee.position}</p>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Department: {employee.department}</p>
                                    </div>
                                    {user?.role === 'HR_Admin' && (
                                        <div className="flex flex-col gap-2">
                                        <button className="text-sm font-medium text-primary dark:text-white mr-2" onClick={() => handleViewMore(employee.employeeId)}>View More</button>
                                        {employee.hasEmploymentHistory ? (
                                            <button className="text-sm font-medium text-warning dark:text-white mr-2" onClick={() => handleUpdate(employee.employeeId)}>Update History</button>
                                        ) : (
                                            <button className="text-sm font-medium text-success dark:text-white mr-2" onClick={() => handleAddHistory(employee.employeeId)}>Add History</button>
                                        )}
                                    </div>
                                    )}

                                    {user?.role !== 'HR_Admin' && (
                                        <button className="text-sm font-medium text-primary dark:text-white mr-2" onClick={() => handleViewMore(employee.employeeId)}>View More</button>
                                    )}                          
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(employees.length / employeesPerPage)}
                    onPageChange={handlePageChange}
                />
            </div>

            {selectedEmployeeHistory && (
                <div className="fixed mt-15 inset-0 flex items-center justify-center z-60">
                    <div className="absolute inset-0 bg-black opacity-80" onClick={handleCloseModal}></div>
                        <div className="relative bg-gradient-to-br w-full from-white via-gray-50 to-gray-100 dark:from-boxdark-2 dark:to-boxdark rounded-lg shadow-2xl p-8 max-w-lg mx-auto max-h-[90vh] overflow-auto transform transition-transform duration-300 scale-95 hover:scale-100">
                            <button 
                                className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-strokedark rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none"
                                onClick={handleCloseModal}
                            >
                                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <h2 className="text-xl mt-6 lg:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                <span className="text-primary dark:text-primary">{selectedEmployeeName}</span>'s History Card
                            </h2>
                            <p className="text-gray-700 dark:text-gray-600 mb-4 text-md dark:text-white">
                                <b><span className="font-semibold">Current Position:</span> {selectedCurrentPosition}</b><br></br>
                                <b><span className="font-semibold">Current Department:</span> {selectedCurrentDept}</b>
                            </p>
                            <div className="bg-gradient-to-r from-primary to-secondary dark:from-primary dark:to-secondary rounded-lg p-6 mb-4 border border-stroke dark:border-strokedark shadow-md">
                                <h3 className="text-xl font-semibold text-white">Employment History</h3>
                                <ul className="space-y-4 mt-4">
                                    {selectedEmployeeHistory.employmentHistories.map((history: any) => (
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
                            <div className="flex justify-end gap-4 mt-6">
                                <button 
                                    className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                                {selectedEmployeeHistory.employmentHistories.length > 0 && (
                                    <button 
                                        className="bg-warning hover:bg-warning-dark text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-warning focus:ring-opacity-50"
                                        onClick={() => handleUpdate(selectedEmployeeId || 0)}
                                    >
                                        Update History
                                    </button>
                                )}
                            </div>
                        </div>
                </div>
            )}

        </>
    );
};

export default EmployeeList;