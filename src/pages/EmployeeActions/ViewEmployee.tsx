// import { useState } from 'react';
// import Breadcrumb from '../../components/Breadcrumb';
// import * as XLSX from 'xlsx';
// import { Link } from 'react-router-dom';

// interface EmployeeRecord {
//   id: number;
//   fullName: string;
//   email: string,
//   age: number;
//   gender: string;
//   position: string;
//   department: string;
//   salary: number;
// }

// const EmployeeRecordsView = () => {
//   const [employeeRecords, setEmployeeRecords] = useState<EmployeeRecord[]>([
//     {
//       id: 1,
//       fullName: 'Mr Darasimi Agbabiaka',
//       email: 'Daragbabiaka77@gmail.com',
//       age: 34,
//       gender: 'Male',
//       position: 'Assistant Lecturer',
//       department: 'Civil Engineering',
//       salary: 60000,
//     },
//     {
//       id: 2,
//       fullName: 'Dr Folashade Oshinaike ',
//       email: 'Foshi342@outlook.com',
//       age: 41,
//       gender: 'Female',
//       position: 'Professor',
//       department: 'Biomedical Engineering',
//       salary: 600000,
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState<string>('');

//   const filteredEmployeeRecords = employeeRecords.filter(
//     (record) =>
//       record.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       record.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       record.department.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const exportToExcel = () => {
//     const fileName = 'EmployeeRecords.xlsx';
//     const fileType =
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//     const data = filteredEmployeeRecords.map((record) => ({
//       'Full Name': record.fullName,
//       'Age': record.age,
//       'Gender': record.gender,
//       'Position': record.position,
//       'Department': record.department,
//     }));
//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = { Sheets: { 'Employee Records': ws }, SheetNames: ['Employee Records'] };
//     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//     const excelData = new Blob([excelBuffer], { type: fileType });
//     const excelUrl = URL.createObjectURL(excelData);
//     const link = document.createElement('a');
//     link.href = excelUrl;
//     link.download = fileName;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <>
//       <Breadcrumb pageName="View Employees" />

//       <div className="container mx-auto py-8">
//         <div className="flex items-center justify-between mb-4">
//           <input
//             type="text"
//             placeholder="Search by full name, position, or department"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border w-1/2 border-gray-200 dark:border-strokedark rounded px-3 py-2 w-full mr-4 focus:outline-none focus:border-primary dark:bg-boxdark"
//           />
//           <button
//             onClick={exportToExcel}
//             className="bg-primary text-white text-sm font-bold py-1 px-2 rounded focus:outline-none hover:bg-primary-dark"
//           >
//             Export to Excel
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="table-auto mt-6 w-full border-collapse border border-gray-200 dark:border-strokedark dark:text-white">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
//                   Full Name
//                 </th>
//                 <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
//                   Email
//                 </th>
//                 <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
//                   Age
//                 </th>
//                 <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
//                   Gender
//                 </th>
//                 <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
//                   Position
//                 </th>
//                 <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
//                   Department
//                 </th>
//                 <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
//                   Salary
//                 </th>
//                 <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center border-b border-gray-200 dark:border-strokedark">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredEmployeeRecords.map((record, index) => (
//                 <tr
//                   key={record.id}
//                   className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-boxdark'}`}
//                 >
//                   <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.fullName}</td>
//                   <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.email}</td>
//                   <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.age}</td>
//                   <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.gender}</td>
//                   <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.position}</td>
//                   <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.department}</td>
//                   <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.salary}</td>
//                   <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">
//                     <Link
//                       // to={`/employee/update-employee/${record.id}`}
//                       to={`/employee/update-employee/`}
//                       className="bg-primary text-white py-2 px-3 rounded-md font-sm transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark"
//                     >
//                       Update
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EmployeeRecordsView;

import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import { getEmployees } from '../../services/apiService';
import { useAuth } from '../Authentication/AuthContext';

interface EmployeeRecord {
  id: number;
  fullName: string;
  email: string;
  age: number;
  gender: string;
  position: string;
  department: string;
  salary: number;
}

const EmployeeRecordsView = () => {
  const { isLoggedIn } = useAuth();
  const [employeeRecords, setEmployeeRecords] = useState<EmployeeRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployeeRecords(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    if (isLoggedIn) {
      fetchEmployees();
    }
  }, [isLoggedIn]);

  const filteredEmployeeRecords = employeeRecords.filter(
    (record) =>
      record.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToExcel = () => {
    const fileName = 'EmployeeRecords.xlsx';
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data = filteredEmployeeRecords.map((record) => ({
      'Full Name': record.fullName,
      'Age': record.age,
      'Gender': record.gender,
      'Position': record.position,
      'Department': record.department,
    }));
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

  return (
    <>
      <Breadcrumb pageName="View Employees" />

      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search by full name, position, or department"
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
          <table className="table-auto mt-6 w-full border-collapse border border-gray-200 dark:border-strokedark dark:text-white">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
                  Full Name
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
                  Email
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
                  Age
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
                  Gender
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
                  Position
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
                  Department
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
                  Salary
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center border-b border-gray-200 dark:border-strokedark">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployeeRecords.map((record, index) => (
                <tr
                  key={record.id}
                  className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-boxdark'}`}
                >
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.fullName}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.email}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.age}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.gender}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.position}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.department}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.salary}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">
                    <Link
                      to={`/employee/update-employee/${record.id}`}
                      className="bg-primary text-white py-2 px-3 rounded-md font-sm transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeRecordsView;


