import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import * as XLSX from 'xlsx';

interface MedicalRecord {
  id: number;
  patientName: string;
  age: number;
  gender: string;
  diagnosis: string;
  date: string;
  doctor: string;
  prescription: string;
  department: string;
}

const MedicalRecordsView = () => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([
    {
      id: 1,
      patientName: 'Adeyemi Salako',
      age: 45,
      gender: 'Male',
      diagnosis: 'Fever',
      date: '2024-05-01',
      doctor: 'Dr. Kayode',
      prescription: 'Paracetamol',
      department: 'Microbiology',
    },
    {
      id: 2,
      patientName: 'Munirat Kashope',
      age: 41,
      gender: 'Female',
      diagnosis: 'Headache',
      date: '2024-04-28',
      doctor: 'Dr. Ismail',
      prescription: 'Aspirin',
      department: 'Cell genetics',
    },
    {
      id: 3,
      patientName: 'Charles Badiru',
      age: 41,
      gender: 'Male',
      diagnosis: 'Covid',
      date: '2024-04-24',
      doctor: 'Dr. Ismail',
      prescription: 'Aspirin',
      department: 'Mathematics',
    },
    {
      id: 4,
      patientName: 'Charles Badiru',
      age: 41,
      gender: 'Male',
      diagnosis: 'Covid',
      date: '2024-04-24',
      doctor: 'Dr. Ismail',
      prescription: 'Aspirin',
      department: 'Mathematics',
    },
    {
      id: 5,
      patientName: 'Charles Badiru',
      age: 41,
      gender: 'Male',
      diagnosis: 'Covid',
      date: '2024-04-24',
      doctor: 'Dr. Ismail',
      prescription: 'Aspirin',
      department: 'Mathematics',
    },
    
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredMedicalRecords = medicalRecords.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToExcel = () => {
    const fileName = 'MedicalRecords.xlsx';
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data = filteredMedicalRecords.map((record) => ({
      'Patient Name': record.patientName,
      'Age': record.age,
      'Gender': record.gender,
      'Diagnosis': record.diagnosis,
      'Doctor': record.doctor,
      'Prescription': record.prescription,
      'Department': record.department,
      'Date': record.date,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { 'Medical Records': ws }, SheetNames: ['Medical Records'] };
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
      <Breadcrumb pageName="Medical Records" />
      
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search by patient name, diagnosis, doctor, or department"
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
                  Patient Name
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
                  Age
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
                  Gender
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
                  Diagnosis
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
                  Doctor
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
                  Prescription
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
                  Department
                </th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-200 dark:border-strokedark">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicalRecords.map((record, index) => (
                <tr
                  key={record.id}
                  className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-boxdark'}`}
                >
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.patientName}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.age}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.gender}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.diagnosis}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.doctor}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.prescription}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.department}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-strokedark">{record.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MedicalRecordsView;

