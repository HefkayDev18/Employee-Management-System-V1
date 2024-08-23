import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFaculties, deleteFaculty } from '../../services/ApiService';
import { toast } from 'react-hot-toast';
import Loader from '../../common/Loader';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import Pagination from '../../components/Pagination';
import { FaTrash } from 'react-icons/fa';

type Faculty = {
    facultyId: number;
    facultyName: string;
};

const ViewFaculties = () => {
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const [selectedFacultyId, setSelectedFacultyId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const facultiesPerPage = 5;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFaculties();
    }, []);

    const fetchFaculties = async () => {
        try {
            const data = await getFaculties();
            setFaculties(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching faculties:', error);
            setLoading(false);
        }
    };

    const handleViewMore = (facultyId: number) => {
        setSelectedFacultyId(facultyId);
    };

    const handleCloseModal = () => {
        setSelectedFacultyId(null);
    };

    const handleDelete = async (facultyId: number) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            html: '<span style="color: red">You will not be able to recover this faculty once deleted!</span>',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
        });

        if (result.isConfirmed) {
            try {
                await deleteFaculty(facultyId);
                fetchFaculties();
                toast.success('Faculty deleted successfully!', {
                    duration: 5000,
                });
                navigate('/faculties/view-faculties');
            } catch (error) {
                toast.error('Failed to delete faculty. Please try again.');
            }
        }
    };

    const selectedFaculty = faculties.find(faculty => faculty.facultyId === selectedFacultyId);

    const indexOfLastFaculty = currentPage * facultiesPerPage;
    const indexOfFirstFaculty = indexOfLastFaculty - facultiesPerPage;
    const currentFaculties = faculties.slice(indexOfFirstFaculty, indexOfLastFaculty);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Breadcrumb pageName="Faculties List" />

            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center text-black mb-6 dark:text-white">List of Faculties</h1>
                <div className="rounded-lg shadow-md px-8 bg-white dark:bg-boxdark p-4">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                        {currentFaculties.map((faculty) => (
                            <li key={faculty.facultyId} className="py-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-md font-medium text-gray-800 dark:text-white"><b>FACULTY OF {faculty.facultyName.toUpperCase()}</b></div>
                                        {/* <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Description: {faculty.description}</p> */}
                                        {/* Add more fields as necessary */}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button className="text-sm font-medium text-primary dark:text-white mr-2" onClick={() => handleViewMore(faculty.facultyId)}>View More</button>
                                        <span className="mx-auto">
                                            <button className="text-sm font-medium text-danger dark:text-white" title="Delete" onClick={() => handleDelete(faculty.facultyId)}>
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
                    totalPages={Math.ceil(faculties.length / facultiesPerPage)}
                    onPageChange={handlePageChange}
                />
            </div>

            {selectedFaculty && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
                    <div className="bg-white dark:bg-boxdark rounded-lg shadow-lg p-8 max-w-md transform transition-all duration-300">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4"><b>FACULTY OF {selectedFaculty.facultyName.toUpperCase()}</b></h2>
                        {/* <p className="text-gray-600 dark:text-gray-400 mb-4">Description: {selectedFaculty.description}</p> */}
                        <button className="mt-6 bg-primary hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded" onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewFaculties;
