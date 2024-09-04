import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { getMedicalRecords } from '../../../services/ApiService';
import Loader from '../../../common/Loader';
import Breadcrumb from '../../../components/Breadcrumb';
import { formatDate } from '../../../services/UtilityFunctions';
import Pagination from '../../../components/Pagination';


interface Employee {
    fullName: string;
    position: string;
    department: string;
}

interface MedicalRecord {
  recordId: number;
  employee?: Employee;
  patientName: string;
  dateOfRecord: Date;
  diagnosis: string;
  prescription: string;
  comments: string;
}

const MedicalRecordsView = () => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage] = useState<number>(7);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const data = await getMedicalRecords();
        setMedicalRecords(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching medical records:', error);
        setLoading(false);
      }
    };

    fetchMedicalRecords();
  }, []);

  const filteredMedicalRecords = medicalRecords.filter((record) =>
    record.employee?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.prescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredMedicalRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(filteredMedicalRecords.length / recordsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const exportToExcel = () => {
    const fileName = 'MedicalRecords.xlsx';
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const data = filteredMedicalRecords.map((record) => ({
      'Patient Name': record.employee?.fullName,
      'Record Date': formatDate(new Date(record.dateOfRecord)),
      Diagnosis: record.diagnosis,
      Treatment: record.prescription,
      Notes: record.comments
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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
    <Breadcrumb pageName="View Employee Medical Records" />

      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search by patient name, diagnosis, or treatment"
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
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">S/N</th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">Patient Name</th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">Record Date</th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">Diagnosis</th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">Treatment</th>
                <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-center text-md border-b border-gray-200 dark:border-strokedark">Notes</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record, index) => (
                <tr
                  key={record.recordId}
                  className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-boxdark'}`}
                >
                  <td className="px-4 py-6 border border-gray-200 text-center text-sm border-b border-gray-200 dark:border-strokedark">
                    {indexOfFirstRecord + index + 1}
                  </td>
                  <td className="px-4 py-6 border border-gray-200 text-center text-sm border-b border-gray-200 dark:border-strokedark">
                    {record.employee?.fullName}
                  </td>
                  <td className="px-4 py-6 border border-gray-200 text-center text-sm border-b border-gray-200 dark:border-strokedark">
                    {formatDate(new Date(record.dateOfRecord))}
                  </td>
                  <td className="px-4 py-6 border border-gray-200 text-center text-sm border-b border-gray-200 dark:border-strokedark">
                    {record.diagnosis}
                  </td>
                  <td className="px-4 py-6 border border-gray-200 text-center text-sm border-b border-gray-200 dark:border-strokedark">
                    {record.prescription}
                  </td>
                  <td className="px-4 py-6 border border-gray-200 text-center text-sm border-b border-gray-200 dark:border-strokedark">
                    {record.comments}
                  </td>
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

export default MedicalRecordsView;
