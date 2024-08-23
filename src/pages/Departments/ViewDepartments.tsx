import React, { useState, useEffect } from 'react';
import { getDepartments, deleteDepartment } from '../../services/ApiService';
import Breadcrumb from '../../components/Breadcrumb';
import Pagination from '../../components/Pagination';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';


const DepartmentList: React.FC = () => {
    const [departments, setDepartments] = useState<any[]>([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const departmentsPerPage = 2;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const data = await getDepartments();
            setDepartments(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching departments:', error);
            setLoading(false);
        }
    };

    const handleViewMore = (departmentId: number) => {
        setSelectedDepartmentId(departmentId);
    };

    const handleCloseModal = () => {
        setSelectedDepartmentId(null);
    };

    const handleDelete = async (departmentId: number) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            html: '<span style="color: red">You will not be able to recover this department once deleted!</span>',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
          });
        
          if (result.isConfirmed) {
            try {
              await deleteDepartment(departmentId);
              fetchDepartments();
              
              toast.success('Department deleted successfully!', {
                duration: 5000,
              });
              navigate('/departments/view-departments');
            } catch (error) {
              toast.error('Failed to delete department. Please try again.',);
            }
          }
    };


    const handleUpdate = async (departmentId: number) => {
        const department = departments.find(dep => dep.departmentId === departmentId);
        if (department) {
          const result = await Swal.fire({
            title: 'Department Update',
            html: '<span style="color: orange">Are you sure you want to update this department\'s info?</span>',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, confirmed!'
          });
      
          if (result.isConfirmed) {
            navigate('/departments/update-department', { state: { department } });
          }
        }
      };
      
      

    const selectedDepartment = departments.find(department => department.departmentId === selectedDepartmentId);

    const indexOfLastDepartment = currentPage * departmentsPerPage;
    const indexOfFirstDepartment = indexOfLastDepartment - departmentsPerPage;
    const currentDepartments = departments.slice(indexOfFirstDepartment, indexOfLastDepartment);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
      return <Loader />;
    }

    return (
        <>
            <Breadcrumb pageName="Departments List" />

            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center text-black mb-6 dark:text-white">List of Departments</h1>
                <div className="rounded-lg shadow-md px-8 bg-white dark:bg-boxdark p-4">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                        {currentDepartments.map((department) => (
                            <li key={department.departmentId} className="py-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-md font-medium text-gray-800 dark:text-white"><b>{department.departmentName.toUpperCase()} DEPARTMENT</b></div>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Description : {department.description}</p>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Faculty Name : Faculty of {department.facultyName}</p>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Head of Department : <span className="font-semibold text-gray-800 dark:text-white">{department.headOfDepartment}</span></p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button className="text-sm font-medium text-primary dark:text-white mr-2" onClick={() => handleViewMore(department.departmentId)}>View More</button>
                                        <button className="text-sm font-medium text-warning dark:text-white mr-2" onClick={() => handleUpdate(department.departmentId)}>Update</button>
                                        <span className="mx-auto">
                                            <button className="text-sm font-medium text-danger dark:text-white" title="Delete" onClick={() => handleDelete(department.departmentId)}>
                                                Delete
                                                <FaTrash className="inline-block text-xs ml-1 mb-1" /> 
                                            </button>
                                        </span>
                                    </div>
                                </div>                          
                            </li>
                        ))}
                    </ul>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(departments.length / departmentsPerPage)}
                    onPageChange={handlePageChange}
                />
            </div>

            {selectedDepartment && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
                    <div className="bg-white dark:bg-boxdark rounded-lg shadow-lg p-8 max-w-md transform transition-all duration-300">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4"><b>{selectedDepartment.departmentName.toUpperCase()} DEPARTMENT</b></h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Description : {selectedDepartment.description}</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Faculty Name : Faculty of {selectedDepartment.facultyName}</p>
                        <p className="text-gray-600 dark:text-gray-400">Head of Department: <span className="font-semibold text-gray-800 dark:text-white">{selectedDepartment.headOfDepartment}</span></p>
                        <button className="mt-6 bg-primary hover:bg-dark text-white font-semibold py-1 px-2 rounded" onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DepartmentList;
