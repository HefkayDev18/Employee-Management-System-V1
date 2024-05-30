import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const DepartmentList = () => {
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);

    const handleViewMore = (departmentId: number) => {
        setSelectedDepartmentId(departmentId);
    };

    const handleCloseModal = () => {
        setSelectedDepartmentId(null);
    };

    const departments = [
        {
            id: 1,
            name: "Department of Computer Science",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum felis non libero ullamcorper, sed venenatis nunc sagittis.",
            head: "Dr. Ayilara Johnson"
        },
        {
            id: 2,
            name: "Department of Mathematics",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum felis non libero ullamcorper, sed venenatis nunc sagittis.",
            head: "Prof. Samson Nwenne"
        },
        {
            id: 3,
            name: "Department of Physics",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum felis non libero ullamcorper, sed venenatis nunc sagittis.",
            head: "Dr. Michael Ayobami"
        },
        {
            id: 4,
            name: "Department of Electrical Engineering",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum felis non libero ullamcorper, sed venenatis nunc sagittis.",
            head: "Dr. Adeleke James"
        },
        {
            id: 5,
            name: "Department of Applied Science",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum felis non libero ullamcorper, sed venenatis nunc sagittis.",
            head: "Dr. Peters Edozie"
        },
        {
            id: 6,
            name: "Department of Fishery",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum felis non libero ullamcorper, sed venenatis nunc sagittis.",
            head: "Dr. Elias Kayode"
        },
    ];

    const selectedDepartment = departments.find(department => department.id === selectedDepartmentId);

    return (
        <>
            <Breadcrumb pageName="Departments" />

            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center text-black mb-6 dark:text-white">List of Departments</h1>
                <div className="rounded-lg shadow-md px-8 bg-white dark:bg-boxdark p-4">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                        {departments.map((department) => (
                            <li key={department.id} className="py-4">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-medium text-gray-800 dark:text-white">{department.name}</div>
                                    <button className="text-sm font-medium text-blue-600 dark:text-white" onClick={() => handleViewMore(department.id)}>View More</button>
                                </div>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{department.description}</p>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Head of Department: <span className="font-semibold text-gray-800 dark:text-white">{department.head}</span></p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Department Modal */}
            {selectedDepartment && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
                    <div className="bg-white dark:bg-boxdark rounded-lg shadow-lg p-8 max-w-md transform transition-all duration-300">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{selectedDepartment.name}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedDepartment.description}</p>
                        <p className="text-gray-600 dark:text-gray-400">Head of Department: <span className="font-semibold text-gray-800 dark:text-white">{selectedDepartment.head}</span></p>
                        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DepartmentList;
