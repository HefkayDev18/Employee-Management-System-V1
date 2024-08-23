import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getEmployees } from '../../../services/ApiService';
import Loader from '../../../common/Loader';
import Breadcrumb from '../../../components/Breadcrumb';
import Pagination from '../../../components/Pagination';
import * as XLSX from 'xlsx';
import { formatDate, calculateAge, formatCurrency } from '../../../services/UtilityFunctions';

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            toast.error('Error fetching employees.');
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredEmployees = employees.filter((employee) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            employee.fullName.toLowerCase().includes(searchTermLower) ||
            employee.email.toLowerCase().includes(searchTermLower) ||
            employee.phoneNumber.toLowerCase().includes(searchTermLower) ||
            employee.position.toLowerCase().includes(searchTermLower) ||
            employee.department.toLowerCase().includes(searchTermLower)
        );
    });

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleAddMedicalRecords = (employeeId: number) => {
        navigate('/medicals/add-medical-records', { state: { employeeId } });
    };

    const exportToExcel = () => {
        const fileName = 'EmployeeList.xlsx';
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

        const data = filteredEmployees.map((employee) => ({
            'Full Name': employee.fullName,
            Email: employee.email,
            'Phone Number': employee.phoneNumber,
            Position: employee.position,
            Department: employee.department,
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = { Sheets: { 'Employee List': ws }, SheetNames: ['Employee List'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const excelData = new Blob([excelBuffer], { type: fileType });
        const excelUrl = URL.createObjectURL(excelData);
        const link = document.createElement('a');
        link.href = excelUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Breadcrumb pageName="Employee Medical Records" />
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center text-black mb-6 dark:text-white">Employees List</h1>
                    <div className="flex items-center justify-between mb-4">
                        <input
                            type="text"
                            placeholder="Search by full name, email, phone number, position, or department"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border w-1/2 border-gray-200 dark:border-strokedark rounded px-3 py-2 w-full mr-4 focus:outline-none focus:border-primary dark:bg-boxdark"
                        />
                        <button
                            onClick={exportToExcel}
                            className="bg-primary text-white text-sm font-bold py-1 px-2 rounded focus:outline-none hover:bg-primary-dark"
                        >
                            Export to Excel
                        </button>
                    </div>
                <div className="rounded-lg shadow-md px-8 bg-white dark:bg-boxdark p-4 mb-4">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                        {currentEmployees.map((employee, index) => (
                            <li key={employee.employeeId} className="py-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-md font-medium text-gray-800 dark:text-white">
                                            <b>{indexOfFirstEmployee + index + 1}. {employee.fullName}</b>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                            Email: {employee.email}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                            Phone Number: {employee.phoneNumber}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                            Position: {employee.position}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                            Department: {employee.department}
                                        </p>
                                    </div>
                                    <button
                                        className="bg-primary text-white text-xs py-2 px-3 rounded-md font-sm transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark"
                                        onClick={() => handleAddMedicalRecords(employee.employeeId)}
                                    >
                                        Add Medical Records
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredEmployees.length / employeesPerPage)}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    );
};

export default EmployeeList;

