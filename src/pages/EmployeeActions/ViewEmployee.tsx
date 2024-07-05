import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import * as XLSX from 'xlsx';
import { useAuthToken, getEmployees } from '../../services/ApiService';
import { useAuth } from '../Authentication/AuthContext';
import { formatDate, calculateAge, formatCurrency } from '../../services/UtilityFunctions';
import Pagination from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';

interface EmployeeRecord {
  employeeId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  age: number;
  gender: string;
  position: string;
  department: string;
  salary: number;
  roleId: number;
  dateCreated: Date;
  dateOfBirth: Date;
}

const EmployeeRecordsView = () => {
  const { isLoggedIn, user } = useAuth();
  const [employeeRecords, setEmployeeRecords] = useState<EmployeeRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage] = useState<number>(7);
  const [loading, setLoading] = useState(true);
  useAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployeeRecords(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchEmployees();
    }
  }, [isLoggedIn]);

  const filteredEmployeeRecords = employeeRecords.filter((record) => {
    const searchTermLower = searchTerm.toLowerCase();
    const statusString = record.isActive ? 'active' : 'not active';
    const roleString = record.roleId === 1 ? 'admin' : 'user';

    return (
      record.fullName.toLowerCase().includes(searchTermLower) ||
      record.email.toLowerCase().includes(searchTermLower) ||
      record.phoneNumber.toLowerCase().includes(searchTermLower) ||
      record.position.toLowerCase().includes(searchTermLower) ||
      record.department.toLowerCase().includes(searchTermLower) ||
      statusString.includes(searchTermLower) ||
      roleString.includes(searchTermLower)
    );
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredEmployeeRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(filteredEmployeeRecords.length / recordsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUpdateClick = (employee: any) => {
    navigate(`/employee/update-employee`, { state: { employee } });
  };

  const exportToExcel = () => {
    const fileName = 'EmployeeRecords.xlsx';
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    type EmployeeRecordData = {
      'Full Name': string;
      Email: string;
      'Phone Number': string;
      Gender: string;
      Position: string;
      Department: string;
    };

    const data = filteredEmployeeRecords.map((record) => {
      const recordData: EmployeeRecordData = {
        'Full Name': record.fullName,
        'Email': record.email,
        'Phone Number': record.phoneNumber,
        'Gender': record.gender,
        'Position': record.position,
        'Department': record.department
      };
      
      if (user?.role === 'Admin') {
        (recordData as EmployeeRecordData & { 'Salary (₦)': number })['Salary (₦)'] = record.salary;
        (recordData as EmployeeRecordData & { Status : string })['Status'] = record.isActive ? 'Active' : 'Not Active';
        (recordData as EmployeeRecordData & { Role : string })['Role'] = record.roleId === 1 ? 'Admin' : 'User';
      }
  
      return recordData;
    });
   
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { 'Employee Records': ws }, SheetNames: ['Employee Records'] };
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
      <Breadcrumb pageName="View Employees" />

      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search by full name, email, role, status, phone number, position, or department"
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
        <div className="overflow-x-auto">
          <table className="table-auto rounded-lg mt-6 w-full border-collapse border border-gray-200 dark:border-strokedark dark:text-white">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">
                  S/N
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">
                  Full&nbsp;Name
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">
                  Email
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">
                  Phone Number
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">
                  Gender
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">
                  Position
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">
                  Department
                </th>
                {user?.role === 'Admin' && (
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">
                  Salary (₦)
                </th>
                )}

                {user?.role === 'Admin' && (
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">
                  Status
                </th>
                )}

                {user?.role === 'Admin' && (
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">
                  Date Created
                </th>
                )}

                {user?.role === 'Admin' && (
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">
                  Age
                </th>
                )}

                {user?.role === 'Admin' && (
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">
                  Date Of Birth
                </th>
                )}

                {user?.role === 'Admin' && (
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">
                  Role
                </th>
                )}

                {user?.role === 'Admin' && (
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">
                  Actions
                </th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record, index) => (
                <tr
                  key={record.employeeId}
                  className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-boxdark'}`}
                >
                  <td className="px-4 py-6 text-center text-sm border-b border-gray-200 dark:border-strokedark">{index + 1}</td>
                  <td className="px-4 py-6 text-center text-sm border-b border-gray-200 dark:border-strokedark">{record.fullName}</td>
                  <td className="px-4 py-6 text-center text-sm border-b border-gray-200 dark:border-strokedark">{record.email}</td>
                  <td className="px-4 py-6 text-center text-sm border-b border-gray-200 dark:border-strokedark">{record.phoneNumber}</td>
                  <td className="px-4 py-6 text-center text-sm border-b border-gray-200 dark:border-strokedark">{record.gender}</td>
                  <td className="px-4 py-6 text-center text-sm border-b border-gray-200 dark:border-strokedark">{record.position}</td>
                  <td className="px-4 py-6 text-center text-sm border-b border-gray-200 dark:border-strokedark">{record.department}</td>
                  {user?.role === 'Admin' && (
                    <td className="px-4 py-6 text-center text-sm border-b border-gray-200 dark:border-strokedark">{formatCurrency(record.salary)}</td>
                  )}
                  {user?.role === 'Admin' && (
                  <td className="px-4 py-6 text-center text-sm border-b border-gray-200 dark:border-strokedark">
                    {record.isActive ? 'Active' : 'Not Active'}
                  </td>
                  )}
                  {user?.role === 'Admin' && (
                  <td className="px-4 py-6 text-center text-sm border-b border-gray-200 dark:border-strokedark">{formatDate(new Date(record.dateCreated))}</td>
                  )}

                  {user?.role === 'Admin' && (
                   <td className="px-4 py-6 text-center text-sm border-b border-gray-200 dark:border-strokedark">{calculateAge(record.dateOfBirth)}</td>
                  )}

                  {user?.role === 'Admin' && (
                  <td className="px-4 py-6 text-center text-sm border-b border-gray-200 dark:border-strokedark">{formatDate(new Date(record.dateOfBirth))}</td>
                  )}

                  {user?.role === 'Admin' && (
                  <td className="px-4 py-6 text-center text-sm border-b border-gray-200 dark:border-strokedark">
                    {record.roleId === 1 ? 'Admin' : 'User'}
                  </td>
                  )}

                  {user?.role === 'Admin' && (
                  <td className="px-4 py-6 text-center text-sm border-b border-gray-200 dark:border-strokedark">
                    <button
                      onClick={() => handleUpdateClick(record)}
                      className="bg-primary text-white py-2 px-3 rounded-md font-sm transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark"
                    >
                      Update
                    </button>
                  </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default EmployeeRecordsView;
