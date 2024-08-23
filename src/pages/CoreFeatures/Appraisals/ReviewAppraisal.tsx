import React, { useState, useEffect } from 'react';
import { approveAppraisal, getAppraisalDetails, getAppraisals, rejectAppraisal, updateAppraisal } from '../../../services/ApiService';
import Pagination from '../../../components/Pagination';
import Loader from '../../../common/Loader';
import Breadcrumb from '../../../components/Breadcrumb';
import toast from 'react-hot-toast';
import { formatDate } from '../../../services/UtilityFunctions';
import Swal from 'sweetalert2';

interface Employee {
  fullName: string;
  position: string;
  department: string;
}

interface Appraisal {
  appraisalId: number;
  employee?: Employee;
  publicationProgress: string;
  teaching: string;
  patentConferencing: string;
  communityService: string;
  administrationExperience: string;
  communication: string;
  teamwork: string;
  leadership: string;
  problemSolving: string;
  punctuality: string;
  adaptability: string;
  overallSatisfaction: string;
  comments: string;
  managerComment: string;
  status: string;
  appDateCreated: string;
}

const ReviewAppraisal: React.FC = () => {
  const [appraisals, setAppraisals] = useState<Appraisal[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [status, setStatus] = useState<string>('Pending');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAppraisal, setSelectedAppraisal] = useState<Appraisal | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchAppraisals = async () => {
      setLoading(true);
      try {
        const response = await getAppraisals(status, currentPage, pageSize);
        if (response && Array.isArray(response.items)) {
          setAppraisals(response.items);
          setTotalCount(response.totalCount || 0);
        } else {
          setAppraisals([]);
          setTotalCount(0);
        }
      } catch (error) {
        toast.error('Failed to fetch appraisals');
        console.error('Failed to fetch appraisals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppraisals();
  }, [status, currentPage, pageSize]);

  const handleTabChange = (newStatus: string) => {
    setStatus(newStatus);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewAppraisal = async (appraisalId: number) => {
    try {
      const response = await getAppraisalDetails(appraisalId);
      if (response) {
        setSelectedAppraisal(response);
        setIsEditing(false);
      } else {
        toast.error('Appraisal not found');
      }
    } catch (error) {
      toast.error('Failed to fetch appraisal details');
      console.error('Failed to fetch appraisal details:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedAppraisal(null);
  };

  const handleApproveAppraisal = async (appraisalId: number) => {
    const result = await Swal.fire({
      title: 'Appraisal Approval!',
      html: '<div style="color: green"><small>Are you sure you want to approve this appraisal? <p>Cannot be overwritten till 6 months, if approved!!</p></small></div>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve!'
    });

    if (result.isConfirmed) {
      if (selectedAppraisal) {
        try {
          await approveAppraisal(appraisalId, selectedAppraisal.managerComment);
          toast.success('Appraisal approved successfully');
          setSelectedAppraisal(null);
          // await fetchAppraisals();
        } catch (error) {
          toast.error('Failed to approve appraisal');
          console.error('Failed to approve appraisal:', error);
        }
      }
    }
  };

  const handleRejectAppraisal = async (appraisalId: number) => {
    const result = await Swal.fire({
      title: 'Appraisal Rejection!',
      html: '<div style="color: red"><small>Are you sure you want to reject this appraisal? <p>Cannot be overwritten till 6 months, if rejected!!</p></small></div>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject!'
    });

    if (result.isConfirmed) {
      if (selectedAppraisal) {
        try {
          await rejectAppraisal(appraisalId, selectedAppraisal.managerComment);
          toast.success('Appraisal rejected successfully');
          setSelectedAppraisal(null);
          // await fetchAppraisals();
        } catch (error) {
          toast.error('Failed to reject appraisal');
          console.error('Failed to reject appraisal:', error);
        }
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    if (selectedAppraisal) {
      try {
        await updateAppraisal(selectedAppraisal.appraisalId, selectedAppraisal.status, selectedAppraisal.managerComment);
        toast.success('Appraisal updated successfully');
        setIsEditing(false);
      } catch (error) {
        toast.error('Failed to update appraisal');
        console.error('Failed to update appraisal:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedAppraisal) {
      setSelectedAppraisal({
        ...selectedAppraisal,
        managerComment: e.target.value,
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Appraisals review" />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center text-black mb-6 dark:text-white">List of Current Appraisals</h1>
        <div className="flex justify-center mb-6">
          <div className="inline-flex shadow-md rounded-lg bg-white dark:bg-boxdark">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${status === 'Pending' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}
              onClick={() => handleTabChange('Pending')}
            >
              Pending
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${status === 'Approved' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}
              onClick={() => handleTabChange('Approved')}
            >
              Approved
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${status === 'Rejected' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}
              onClick={() => handleTabChange('Rejected')}
            >
              Rejected
            </button>
          </div>
        </div>
        <div className="rounded-lg shadow-md px-8 bg-white dark:bg-boxdark p-4">
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {appraisals.length > 0 ? (
              appraisals.map(appraisal => (
                <li key={appraisal.appraisalId} className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-md font-medium text-gray-800 dark:text-white">
                        <b>Employee Name: {appraisal.employee?.fullName || 'Unknown'}</b>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Position: {appraisal.employee?.position || 'N/A'}</p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Department: {appraisal.employee?.department || 'N/A'}</p>
                    </div>
                    <button 
                      className="text-sm font-medium text-primary dark:text-white"
                      onClick={() => handleViewAppraisal(appraisal.appraisalId)}
                    >
                      View Appraisal
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="py-4 text-center text-3xl text-gray-600 dark:text-gray-400"><b>No appraisals found.</b></li>
            )}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / pageSize)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      
      {selectedAppraisal && (
        <div className="fixed inset-0 flex items-center mt-15 justify-center z-80 overflow-auto">
          <div className="absolute inset-0 bg-white bg-opacity-100" onClick={handleCloseModal}></div>
            <div className="relative bg-gradient-to-br from-gray-100 via-white to-boxdark dark:bg-black dark:from-gray-900 dark:to-gray-700 rounded-xl shadow-2xl w-full max-w-3xl p-6 z-10 overflow-auto md:ml-20">
              <button
                className="absolute top-3 right-3 p-2 text-gray-500 dark:text-gray-300"
                onClick={handleCloseModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white"><b>Appraisal Details</b></h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Publication Progress:', value: selectedAppraisal.publicationProgress + '%' },
                  { label: 'Teaching:', value: selectedAppraisal.teaching + '%' },
                  { label: 'Patent Conferencing:', value: selectedAppraisal.patentConferencing + '%' },
                  { label: 'Community Service:', value: selectedAppraisal.communityService + '%' },
                  { label: 'Administration Experience:', value: selectedAppraisal.administrationExperience + '%' },
                  { label: 'Communication:', value: selectedAppraisal.communication + '%' },
                  { label: 'Teamwork:', value: selectedAppraisal.teamwork + '%' },
                  { label: 'Leadership:', value: selectedAppraisal.leadership + '%' },
                  { label: 'Problem Solving:', value: selectedAppraisal.problemSolving + '%' },
                  { label: 'Punctuality:', value: selectedAppraisal.punctuality + '%' },
                  { label: 'Adaptability:', value: selectedAppraisal.adaptability + '%' },
                  { label: 'Overall Satisfaction:', value: selectedAppraisal.overallSatisfaction + '%' },
                  { label: 'Comments:', value: selectedAppraisal.comments },
                  { label: 'Manager Comment:', value: isEditing ? (
                      <textarea
                        className="mt-1 w-full border rounded-lg p-2 dark:bg-gray-800 dark:text-gray-300"
                        value={selectedAppraisal.managerComment}
                        onChange={handleInputChange}
                      />
                    ) : (
                      selectedAppraisal.managerComment
                    )
                  },
                  { label: 'Status:', value: (
                      <p className={`font-semibold ${selectedAppraisal.status === 'Pending' ? 'text-warning dark:text-warning' : selectedAppraisal.status === 'Approved' ? 'text-success dark:text-success' : 'text-danger dark:text-danger'}`}>
                        {selectedAppraisal.status}
                      </p>
                    )
                  },
                  { label: 'Date Created:', value: formatDate(selectedAppraisal.appDateCreated) }
                ].map((item, index) => (
                  <div key={index} className="border p-2 rounded-lg">
                    <div className="flex justify-between">
                      <strong className="text-gray-800 dark:text-gray-200 text-xs dark:text-white">{item.label}</strong>
                      <div className="text-gray-700 text-xs dark:text-white"><b>{item.value}</b></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                {!isEditing && selectedAppraisal.status !== 'Approved' && selectedAppraisal.status !== 'Rejected' && (
                  <>
                    <button
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary"
                      onClick={handleEditClick}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-success text-white rounded-lg hover:bg-success"
                      onClick={() => handleApproveAppraisal(selectedAppraisal.appraisalId)}
                    >
                      Approve
                    </button>
                    <button
                      className="px-4 py-2 bg-danger text-white rounded-lg hover:bg-danger"
                      onClick={() => handleRejectAppraisal(selectedAppraisal.appraisalId)}
                    >
                      Reject
                    </button>
                  </>
                )}
                {isEditing && (
                  <>
                    <button
                      className="px-4 py-2 bg-success text-white rounded-lg hover:bg-success"
                      onClick={handleSaveChanges}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-2 bg-boxdark text-white rounded-lg hover:bg-boxdark"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
        </div>
      )}
    </>
  );
};

export default ReviewAppraisal;
