// import { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';
// import Breadcrumb from '../../../components/Breadcrumb';
// import { fetchEmpUploads } from '../../../services/ApiService';
// import { useAuth } from '../../Authentication/AuthContext';
// import { formatDate } from '../../../services/UtilityFunctions';

// const UploadedFilesView = () => {
//   const [uploads, setUploads] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredUploads, setFilteredUploads] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchUploadedFiles = async () => {
//       setLoading(true);
//       try {
//         const empId = user?.employeeObj?.employeeId;
//         if (empId) {
//           const response = await fetchEmpUploads(empId);
//           if (Array.isArray(response)) {
//             setUploads(response);
//             setFilteredUploads(response);
//           } else {
//             console.error('Unexpected response format:', response);
//           }
//         } else {
//           console.error('Employee ID is missing.');
//         }
//       } catch (error) {
//         toast.error('Failed to fetch uploaded files.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUploadedFiles();
//   }, [user]);

//   useEffect(() => {
//     setFilteredUploads(
//       uploads.filter((file) =>
//         file.documentType.toLowerCase().includes(searchTerm.toLowerCase()) 
//       )
//     );
//   }, [searchTerm, uploads]);

//   return (
//     <>
//       <Breadcrumb pageName="Uploaded Files" />
//       <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
//         <div className="p-6.5">
//           <div className="mb-4 flex justify-between items-center">
//             <input
//               type="text"
//               placeholder="Search by document type..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-1/2 p-2 border border-stroke rounded-lg outline-none dark:border-strokedark"
//             />
//           </div>
//           {loading ? (
//             <div className="text-center text-lg text-gray-500 dark:text-white">Loading...</div>
//           ) : (
//             <table className="min-w-full bg-white dark:bg-boxdark">
//               <thead>
//                 <tr className="border-b border-stroke dark:border-strokedark">
//                   <th className="py-2 px-4 text-center text-sm font-semibold text-gray-700 dark:text-white">Document Type</th>
//                   <th className="py-2 px-4 text-center text-sm font-semibold text-gray-700 dark:text-white">Employee</th>
//                   <th className="py-2 px-4 text-center text-sm font-semibold text-gray-700 dark:text-white">Uploaded Date</th>
//                   <th className="py-2 px-4 text-center text-sm font-semibold text-gray-700 dark:text-white">Description</th>
//                   {/* <th className="py-2 px-4 text-center text-xs font-semibold text-gray-700 dark:text-white">File</th> */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredUploads.length > 0 ? (
//                   filteredUploads.map((file) => (
//                     <tr key={file.uploadId} className="border-b border-stroke dark:border-strokedark">
//                       <td className="py-2 px-4 text-center text-sm text-gray-800 dark:text-white">{file.documentType}</td>
//                       <td className="py-2 px-4 text-center text-sm text-gray-800 dark:text-white">{file.employeeCred?.fullName}</td>
//                       <td className="py-2 px-4 text-center text-sm text-gray-800 dark:text-white">{formatDate(file.uploadedDate)}</td>
//                       <td className="py-2 px-4 text-center text-xs text-gray-800 dark:text-white">{file.description || 'N/A'}</td>
//                       {/* <td className="py-2 px-4 text-center text-xs text-gray-800 dark:text-white">{file.description || 'N/A'}</td> */}
//                       <td className="py-2 px-4 text-center text-xs text-gray-800 dark:text-white">
//                         <a href={file.filePath} className="text-primary hover:text-boxdark" target="_blank" rel="noopener noreferrer">
//                           <b>View</b>
//                         </a>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="py-2 px-4 text-center text-sm text-gray-500 dark:text-white">No files available</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default UploadedFilesView;



import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Breadcrumb from '../../../components/Breadcrumb';
import { fetchEmpUploads } from '../../../services/ApiService';
import { useAuth } from '../../Authentication/AuthContext';
import { formatDate } from '../../../services/UtilityFunctions';
import Pagination from '../../../components/Pagination'; 

const UploadedFilesView = () => {
  const [uploads, setUploads] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUploads, setFilteredUploads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  const { user } = useAuth();

  useEffect(() => {
    const fetchUploadedFiles = async () => {
      setLoading(true);
      try {
        const empId = user?.employeeObj?.employeeId;
        if (empId) {
          const response = await fetchEmpUploads(empId);
          if (Array.isArray(response)) {
            setUploads(response);
            setFilteredUploads(response);
          } else {
            console.error('Unexpected response format:', response);
          }
        } else {
          console.error('Employee ID is missing.');
        }
      } catch (error) {
        toast.error('Failed to fetch uploaded files.');
      } finally {
        setLoading(false);
      }
    };

    fetchUploadedFiles();
  }, [user]);

  useEffect(() => {
    setFilteredUploads(
      uploads.filter((file) =>
        file.documentType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, uploads]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUploads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUploads.length / itemsPerPage);

  return (
    <>
      <Breadcrumb pageName="Uploaded Files" />
      <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
        <div className="p-6.5">
          <div className="mb-4 flex justify-between items-center">
            <input
              type="text"
              placeholder="Search by document type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/2 p-2 border border-stroke rounded-lg outline-none dark:border-strokedark"
            />
          </div>
          {loading ? (
            <div className="text-center text-lg text-gray-500 dark:text-white">Loading...</div>
          ) : (
            <>
              <table className="min-w-full bg-white dark:bg-boxdark">
                <thead>
                  <tr className="border-b border-stroke dark:border-strokedark">
                    <th className="py-2 px-4 text-center text-sm font-semibold text-gray-700 dark:text-white">Document Type</th>
                    <th className="py-2 px-4 text-center text-sm font-semibold text-gray-700 dark:text-white">Employee</th>
                    <th className="py-2 px-4 text-center text-sm font-semibold text-gray-700 dark:text-white">Uploaded Date</th>
                    <th className="py-2 px-4 text-center text-sm font-semibold text-gray-700 dark:text-white">Description</th>
                    <th className="py-2 px-4 text-center text-xs font-semibold text-gray-700 dark:text-white">File</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((file) => (
                      <tr key={file.uploadId} className="border-b border-stroke dark:border-strokedark">
                        <td className="py-2 px-4 text-center text-sm text-gray-800 dark:text-white">{file.documentType}</td>
                        <td className="py-2 px-4 text-center text-sm text-gray-800 dark:text-white">{file.employeeCred?.fullName}</td>
                        <td className="py-2 px-4 text-center text-sm text-gray-800 dark:text-white">{formatDate(file.uploadedDate)}</td>
                        <td className="py-2 px-4 text-center text-xs text-gray-800 dark:text-white">{file.description || 'N/A'}</td>
                        <td className="py-2 px-4 text-center text-xs text-gray-800 dark:text-white">
                          <a href={file.filePath} className="text-primary hover:text-boxdark" target="_blank" rel="noopener noreferrer">
                            <b>View</b>
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-2 px-4 text-center text-sm text-gray-500 dark:text-white">No files available</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadedFilesView;

